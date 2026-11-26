// Four surfaces share the same ribbon topology so every blade can travel continuously
// between exhibits. Positions and bevel normals are sampled once, not in the frame loop.
export function createOptic(stage, getPoster, initialMode, staticLabel) {
  const interactiveLabel = stage.getAttribute('aria-label');
  const canvas = stage.querySelector('canvas');
  const poster = stage.querySelector('.poster');
  const TAU = Math.PI * 2;
  let gl, program, triangles, sparks, observer;
  let requested = 0, previousTime = 0, clock = .55;
  let mode = initialMode, progress = 1, paused = false, available = false;
  let target = [0, 1, 2, 3].map(i=>Number(i===initialMode));
  let source = target.slice();
  let pointer = null, dragYaw = 0, dragPitch = 0, yaw = 0, pitch = 0, pressure = 0;
  let hoverX = 0, hoverY = 0, cssWidth = 0, cssHeight = 0, density = 1;
  let indexBuffer, sparkBuffer;
  const uniform = {};
  const poses = [[.50,-.43,-.42],[.53,-.30,-.13],[.64,-.42,.07],[.22,.18,-.24]];
  const slices = 94, steps = 92, sides = 8;
  const offsets = [
    [-.82,1,-.22,.98],[.82,1,.22,.98],[1,.72,.96,.28],[1,-.72,.96,-.28],
    [.82,-1,.22,-.98],[-.82,-1,-.22,-.98],[-1,-.72,-.96,-.28],[-1,.72,-.96,.28]
  ];
  const vertex = `#version 300 es
    precision highp float;
    in vec3 p0,n0,p1,n1,p2,n2,p3,n3,params;
    uniform vec4 uSource,uTarget;
    uniform float uProgress,uTime,uPressure,uCloud,uDpr;
    uniform vec2 uScale;
    uniform mat3 uRotation;
    out vec3 vNormal,vEye,vLocal;
    out vec3 vParams;
    out float vBurst;
    mat2 turn(float a){float c=cos(a),s=sin(a);return mat2(c,s,-s,c);}
    void main(){
      float id=params.x;
      float stagger=.14*(.5+.5*sin(6.283185*id-.6));
      float t=smoothstep(stagger,.84+stagger,uProgress);
      vec4 w=mix(uSource,uTarget,t);
      vec3 p=p0*w.x+p1*w.y+p2*w.z+p3*w.w;
      vec3 n=n0*w.x+n1*w.y+n2*w.z+n3*w.w;
      float burst=sin(3.14159265*t);
      float opening=uPressure*.88+burst;
      float angle=(id-.5)*opening*1.65;
      p.xy=turn(angle)*p.xy;
      n.xy=turn(angle)*n.xy;
      p+=(.32*p+.47*vec3(cos(6.283*id),sin(6.283*id),.8*sin(12.566*id)))*opening;
      p.z+=.29*opening*sin(6.283*id+uTime*.52);
      if(uCloud>.5){
        float seed=fract(sin(dot(params.xy,vec2(124.13,377.21)))*4378.213);
        float drift=(.08+seed*.65)*opening;
        vec3 ray=normalize(p+vec3(.24,.1,.02));
        p+=ray*drift+vec3(.07*sin(uTime+6.28*seed),.15*seed,0.)*opening;
        gl_PointSize=max(1.,(.55+1.55*seed)*uDpr);
      }
      vec3 world=uRotation*p;
      vec3 eye=vec3(0.,0.,7.)-world;
      gl_Position=vec4(world.xy*uScale*7.,-world.z*.52,eye.z);
      vNormal=uRotation*n;vEye=eye;vLocal=p;vParams=params;vBurst=opening;
    }`;
  const fragment = `#version 300 es
    precision highp float;
    in vec3 vNormal,vEye,vLocal,vParams;
    in float vBurst;
    uniform float uCloud,uTime;
    uniform vec4 uMaterial;
    out vec4 outColor;
    float band(float value,float a,float b,float soft){
      return smoothstep(a-soft,a+soft,value)*(1.-smoothstep(b-soft,b+soft,value));
    }
    // Reflections of large white softboxes and dark studio flags.
    vec3 studio(vec3 r){
      float h=r.y+.16*r.x;
      vec3 e=mix(vec3(.075,.087,.12),vec3(.79,.82,.85),smoothstep(-.84,.34,h));
      e=mix(e,vec3(.12,.14,.18),band(h,-.32,.19,.035)*(.50+.46*smoothstep(-.7,.5,r.z)));
      e=mix(e,vec3(.97,.98,.99),band(r.x+.23*r.y,-.69,-.19,.045)*smoothstep(-.8,.12,r.z));
      e=mix(e,vec3(.045,.055,.082),band(r.x-.19*r.y,.04,.40,.023)*smoothstep(-.63,.38,r.z));
      e+=vec3(.33,.35,.40)*band(r.z+.31*r.y,-.20,-.145,.018);
      e+=vec3(.27,.27,.28)*band(h,.52,.83,.08);
      return min(e,vec3(1.16));
    }
    vec3 film(float p){
      vec3 indigo=vec3(.25,.29,.91), blue=vec3(.31,.64,.97), lilac=vec3(.76,.66,.94);
      vec3 warm=vec3(.98,.67,.36), coral=vec3(.98,.47,.25);
      return mix(mix(mix(indigo,blue,smoothstep(0.,.22,p)),lilac,smoothstep(.18,.52,p)),
                 mix(warm,coral,smoothstep(.80,.99,p)),smoothstep(.52,.88,p));
    }
    void main(){
      if(uCloud>.5){
        float d=length(gl_PointCoord-.5)*2.;
        if(d>1.)discard;
        vec3 c=mix(vec3(.32,.31,.50),vec3(.70,.80,.81),uMaterial.z);
        outColor=vec4(c,(1.-smoothstep(.25,1.,d))*.75*min(vBurst,1.));return;
      }
      vec3 V=normalize(vEye),N=normalize(vNormal);
      if(dot(N,V)<0.)N=-N;
      float face=max(0.,dot(N,V));
      vec3 R=reflect(-V,N);
      vec3 env=studio(R);
      float shell=.5+.5*cos(6.283185*vParams.y);
      float edge=1.-face;
      float foil=.5+.5*cos(vParams.x*6.283185-.63);
      float phase=.52+.40*sin(vParams.x*6.283185+1.86+R.y*.97+edge*1.8);
      vec3 spectrum=film(phase);
      vec3 context=mix(vec3(.35,.28,.67),vec3(.87,.88,.99),.5+.5*R.y);
      vec3 tide=mix(vec3(.20,.53,.54),vec3(.65,.96,.86),.5+.5*R.y);
      vec3 copper=mix(vec3(.72,.35,.24),vec3(.99,.83,.58),.5+.5*R.y);
      vec3 glaze=spectrum*uMaterial.x+context*uMaterial.y+tide*uMaterial.z+copper*uMaterial.w;
      float coat=.21+.57*foil+.11*edge;
      coat=mix(coat,.76,.65*(1.-uMaterial.x));
      vec3 chrome=env*mix(vec3(.96,.975,.99),glaze,coat);
      float lambert=.5+.5*dot(N,normalize(vec3(-.5,.85,.56)));
      vec3 body=mix(vec3(.25,.27,.30),glaze,.39)*(.38+.62*lambert);
      vec3 col=mix(body,chrome,.83+.14*edge);
      col*=.78+.17*shell+.05*vParams.z;
      col+=glaze*(.085+.075*uMaterial.z)*pow(edge,2.);
      float glint=pow(max(dot(R,normalize(vec3(-.56,.59,.55))),0.),54.);
      col+=vec3(.47,.46,.44)*glint;
      outColor=vec4(clamp(col,0.,1.),1.);
    }`;
  function applyPose(p, rotation) {
    const [a,b,c]=rotation;
    const x=p[0], y=p[1]*Math.cos(a)-p[2]*Math.sin(a), z=p[1]*Math.sin(a)+p[2]*Math.cos(a);
    const x2=x*Math.cos(b)+z*Math.sin(b);
    return [x2*Math.cos(c)-y*Math.sin(c),x2*Math.sin(c)+y*Math.cos(c),-x*Math.sin(b)+z*Math.cos(b)];
  }
  const normalize=v=>{
    const length=Math.hypot(v[0],v[1],v[2])||1;
    return [v[0]/length,v[1]/length,v[2]/length];
  };
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
  function surface(shape,s,q) {
    const a=s*TAU, cq=Math.cos(q), sq=Math.sin(q);
    if(shape===0){
      const swept=a+.76*Math.sin(q+.25)+.10*Math.sin(q*2-a);
      const tube=.415+.075*Math.cos(a-.4)+.055*Math.sin(2*a+.34);
      const r=.94+.105*Math.cos(2*a-.35)+tube*cq;
      return [r*Math.cos(swept),r*Math.sin(swept)*1.055,
        .55*sq+.21*Math.sin(2*a+.55)+.075*Math.cos(q-a)];
    }
    if(shape===1){
      const corner=v=>Math.sign(v)*Math.pow(Math.abs(v),.40);
      const x=1.15*corner(cq),z=.90*corner(sq);
      const twist=(s-.5)*1.04-.28;
      const y=(s-.5)*1.36+.22*Math.sin(1.6*x+.9*z+.48*s)+.11*x*z;
      return [x*Math.cos(twist)+z*Math.sin(twist)+.30*(s-.5),y,-x*Math.sin(twist)+z*Math.cos(twist)];
    }
    if(shape===2){
      const x=1.47*cq,z=(s-.5)*2.22;
      const wave=.49*Math.sin(2.6*x+1.52*z+.7)+.24*Math.sin(1.18*x-1.48*z);
      return [x+.10*z,wave+.12*z+.082*sq,z+.16*Math.cos(x*2.7+z)*sq];
    }
    const cx=.423*(Math.sin(q)+2*Math.sin(2*q)),cy=.423*(Math.cos(q)-2*Math.cos(2*q)),cz=-.54*Math.sin(3*q);
    const tan=normalize([.423*(cq+4*Math.cos(2*q)),.423*(-sq+4*Math.sin(2*q)),-1.62*Math.cos(3*q)]);
    const bin=normalize(cross(tan,[0,0,1])), normal=cross(bin,tan);
    const angle=a+q*2,r=.286;
    return [cx+r*(bin[0]*Math.cos(angle)+normal[0]*Math.sin(angle)),cy+r*(bin[1]*Math.cos(angle)+normal[1]*Math.sin(angle)),cz+r*(bin[2]*Math.cos(angle)+normal[2]*Math.sin(angle))];
  }
  function compile(type,code){
    const shader=gl.createShader(type);
    gl.shaderSource(shader,code);gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(shader));
    return shader;
  }
  function buffer(targetType,data) {
    const buffer=gl.createBuffer();
    gl.bindBuffer(targetType,buffer);gl.bufferData(targetType,data,gl.STATIC_DRAW);
    return buffer;
  }
  function attribute(name,values){
    buffer(gl.ARRAY_BUFFER,values);
    const at=gl.getAttribLocation(program,name);
    gl.enableVertexAttribArray(at);gl.vertexAttribPointer(at,3,gl.FLOAT,false,0,0);
  }
  function buildGeometry(){
    const vertexCount=slices*steps*sides;
    const params=new Float32Array(vertexCount*3);
    const indices=new Uint32Array(vertexCount*6);
    const dust=[];
    for(let shape=0;shape<4;shape++){
      const pos=new Float32Array(vertexCount*3),normals=new Float32Array(vertexCount*3);
      for(let i=0;i<slices;i++){
        const s=(i+.5)/slices;
        for(let j=0;j<steps;j++){
          const q=j/steps*TAU;
          const p=surface(shape,s,q);
          const across=sub(surface(shape,s+.0005,q),surface(shape,s-.0005,q));
          const along=normalize(sub(surface(shape,s,q+.001),surface(shape,s,q-.001)));
          const n=normalize(cross(across,along)),side=normalize(cross(along,n));
          const coverage=[.69,.56,.69,.73][shape];
          const width=Math.min(.063,Math.hypot(...across)*1000*coverage/(2*slices));
          const depth=[.047,.079,.032,.021][shape];
          const base=(i*steps+j)*sides;
          for(let k=0;k<sides;k++){
            const [w,h,nw,nh]=offsets[k],v=base+k;
            const point=p.map((x,d)=>x+side[d]*w*width+n[d]*(h-1)*depth*.5);
            const normal=n.map((x,d)=>x*nh+side[d]*nw);
            pos.set(applyPose(point,poses[shape]),v*3);
            normals.set(applyPose(normal,poses[shape]),v*3);
            if(shape===0){
              params.set([s,j/steps,.5+.5*h],v*3);
              const next=(i*steps+(j+1)%steps)*sides;
              const nK=(k+1)%sides;
              indices.set([v,next+k,base+nK,base+nK,next+k,next+nK],v*6);
            }
          }
          if(shape===0 && i%3===0 && j%4===0)dust.push(base);
        }
      }
      attribute('p'+shape,pos);attribute('n'+shape,normals);
    }
    attribute('params',params);
    indexBuffer=buffer(gl.ELEMENT_ARRAY_BUFFER,indices);
    sparkBuffer=buffer(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(dust));
    triangles=indices.length;sparks=dust.length;
  }
  function size(){
    const rect=stage.getBoundingClientRect();
    cssWidth=rect.width;cssHeight=rect.height;
    density=Math.min(window.devicePixelRatio||1,1.8);
    stage.style.setProperty('--poster-scale',cssWidth<550?.595/.665:1);
    paintSoon();
  }
  function draw(now){
    requested=0;
    if(!available||document.hidden||cssWidth<=0||cssHeight<=0)return;
    // Resize the backing buffer only in the paint that immediately fills it.
    const width=Math.max(1,Math.round(cssWidth*density));
    const height=Math.max(1,Math.round(cssHeight*density));
    if(canvas.width!==width)canvas.width=width;
    if(canvas.height!==height)canvas.height=height;
    const dt=previousTime?Math.min(.055,(now-previousTime)/1000):.016;
    previousTime=now;
    if(!paused)clock+=dt;
    if(progress<1)progress=paused?1:Math.min(1,progress+dt/1.32);
    const ease=1-Math.exp(-dt*9);
    const toYaw=dragYaw+(paused?0:hoverX*.145);
    const toPitch=dragPitch+(paused?0:hoverY*.105);
    yaw+=(toYaw-yaw)*ease; pitch+=(toPitch-pitch)*ease;
    const pressGoal=pointer!==null&&!paused?1:0;
    pressure+=(pressGoal-pressure)*(1-Math.exp(-dt*(pressGoal?3.4:5.3)));
    const oscillation=Math.sin(clock*.215);
    const pose=[pitch+.08*Math.sin(clock*.29),yaw+.25*oscillation,.069*Math.sin(clock*.27+.4)];
    const rotation=[...applyPose([1,0,0],pose),...applyPose([0,1,0],pose),...applyPose([0,0,1],pose)];
    const t=progress*progress*(3-2*progress);
    const material=source.map((w,i)=>w*(1-t)+target[i]*t);
    const span=Math.min(cssWidth,cssHeight);
    const scale=(cssWidth<550?.595:.665)*(1-.24*pressure);
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniform4fv(uniform.uSource,source);gl.uniform4fv(uniform.uTarget,target);
    gl.uniform4fv(uniform.uMaterial,material);gl.uniform1f(uniform.uProgress,progress);
    gl.uniform1f(uniform.uTime,clock);gl.uniform1f(uniform.uPressure,pressure);
    gl.uniform2f(uniform.uScale,scale*span/cssWidth,scale*span/cssHeight);
    gl.uniformMatrix3fv(uniform.uRotation,false,rotation);
    gl.uniform1f(uniform.uCloud,0);gl.uniform1f(uniform.uDpr,density);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);gl.drawElements(gl.TRIANGLES,triangles,gl.UNSIGNED_INT,0);
    if((progress>.01&&progress<.99)||pressure>.025){
      gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);
      gl.uniform1f(uniform.uCloud,1);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,sparkBuffer);
      gl.drawElements(gl.POINTS,sparks,gl.UNSIGNED_INT,0);
      gl.depthMask(true);gl.disable(gl.BLEND);
    }
    if(canvas.hidden){
      canvas.hidden=false;
      poster.hidden=true;
    }
    if(!paused||progress<1||Math.abs(yaw-toYaw)+Math.abs(pitch-toPitch)+Math.abs(pressure-pressGoal)>.002)paintSoon();
  }
  function paintSoon(){
    if(available&&!requested&&!document.hidden)requested=requestAnimationFrame(draw);
  }
  function showPoster(){
    available=false;canvas.hidden=true;poster.hidden=false;stage.classList.add('is-poster');
    stage.removeAttribute('tabindex');stage.removeAttribute('aria-describedby');
    stage.setAttribute('aria-label',staticLabel);
    const src=getPoster(mode);
    if(src)poster.src=src;
    document.querySelector('.motion-toggle').hidden=true;
  }
  function init(){
    gl=canvas.getContext('webgl2',{antialias:true,alpha:true,powerPreference:'low-power',premultipliedAlpha:true});
    if(!gl){showPoster();return}
    program=gl.createProgram();
    gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    for(const key of ['uSource','uTarget','uProgress','uTime','uPressure','uCloud','uScale','uRotation','uDpr','uMaterial'])uniform[key]=gl.getUniformLocation(program,key);
    buildGeometry();
    gl.clearColor(0,0,0,0);gl.enable(gl.DEPTH_TEST);
    available=true;
    stage.classList.remove('is-poster');stage.tabIndex=0;
    stage.setAttribute('aria-describedby','interaction-help');stage.setAttribute('aria-label',interactiveLabel);
    document.querySelector('.motion-toggle').hidden=false;
    size();
  }
  poster.src=getPoster(initialMode);
  poster.hidden=false;
  try {init()} catch(error){console.warn('Optical sculpture:',error);showPoster()}
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(requested);requested=0;showPoster()});
  canvas.addEventListener('webglcontextrestored',()=>{try{init()}catch{showPoster()}});
  observer=new ResizeObserver(size);observer.observe(stage);
  document.addEventListener('visibilitychange',()=>{previousTime=0;if(document.hidden){cancelAnimationFrame(requested);requested=0}else paintSoon()});
  stage.addEventListener('pointerdown',event=>{
    if(!available||event.button!==0||pointer!==null)return;
    pointer={id:event.pointerId,x:event.clientX,y:event.clientY,yaw:dragYaw,pitch:dragPitch};
    stage.setPointerCapture(event.pointerId);stage.classList.add('dragging');paintSoon();
  });
  stage.addEventListener('pointermove',event=>{
    if(!available)return;
    const box=stage.getBoundingClientRect();
    hoverX=(event.clientX-box.left)/box.width*2-1;hoverY=(event.clientY-box.top)/box.height*2-1;
    if(pointer&&pointer.id===event.pointerId){
      dragYaw=pointer.yaw+(event.clientX-pointer.x)*.007;
      dragPitch=pointer.pitch+(event.clientY-pointer.y)*.005;
    }else if(event.pointerType==='mouse')stage.classList.add('touched');
    paintSoon();
  });
  const release=event=>{
    if(!pointer||pointer.id!==event.pointerId)return;
    pointer=null;stage.classList.remove('dragging');paintSoon();
  };
  stage.addEventListener('pointerup',release);stage.addEventListener('pointercancel',release);stage.addEventListener('lostpointercapture',release);
  stage.addEventListener('pointerleave',()=>{hoverX=hoverY=0;stage.classList.remove('touched');paintSoon()});
  stage.addEventListener('keydown',event=>{
    const moves={ArrowLeft:[-.23,0],ArrowRight:[.23,0],ArrowUp:[0,-.20],ArrowDown:[0,.20]};
    const move=moves[event.key];
    if(!move)return;
    event.preventDefault();event.stopPropagation();dragYaw+=move[0];dragPitch+=move[1];paintSoon();
  });
  return {
    select(next){
      if(mode===next)return;
      const t=progress*progress*(3-2*progress);
      source=source.map((w,i)=>w*(1-t)+target[i]*t);
      target=[0,0,0,0];target[next]=1;
      mode=next;progress=paused?1:0;dragYaw=dragPitch=0;
      if(available)paintSoon();else showPoster();
    },
    pause(value){paused=value;if(paused)progress=1;paintSoon()}
  };
}
