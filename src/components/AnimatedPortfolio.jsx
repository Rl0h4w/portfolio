import React, { useEffect } from 'react';

const AnimatedPortfolio = () => {
  useEffect(() => {
    // Создаем анимацию для градиентов
    const gradients = document.querySelectorAll('.animate-gradient');
    gradients.forEach(gradient => {
      gradient.style.backgroundSize = '400% 400%';
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono relative overflow-hidden">
      {/* Анимированный фоновый градиент */}
      <div className="fixed inset-0 animate-gradient bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/30 pointer-events-none" 
           style={{
             animation: 'gradient 15s ease infinite',
           }}
      />
      
      {/* Декоративные элементы */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header Section */}
      <div className="flex items-center mb-12 relative">
        <div className="mr-8">
          <div className="text-4xl font-bold tracking-wider animate-gradient bg-gradient-to-r from-cyan-400 via-white to-purple-400 text-transparent bg-clip-text"
               style={{
                 animation: 'gradient 3s ease infinite',
               }}>
            RLOHAW
          </div>
          <div className="text-gray-300 mt-2">AND DREADFULLY DISTINCT AGAINST THE DARK</div>
          <div className="text-gray-300">A TALL WHITE FOUNTAIN PLAYED<span className="animate-pulse text-cyan-400">_</span></div>
        </div>
        <div className="ml-auto">
          <nav>
            <ul className="space-y-2">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">→ Home</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">→ Projects</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">→ Skills</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">→ Contact</li>
              <li>
                <button className="mt-4 relative group">
                  <div className="absolute -inset-0.5 animate-gradient bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded blur opacity-60 group-hover:opacity-100 transition duration-1000"
                       style={{
                         animation: 'gradient 3s ease infinite',
                       }}></div>
                  <div className="relative bg-black px-6 py-2 rounded">
                    HIRE ME
                  </div>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Section */}
        <div className="border border-white/20 p-6 rounded-lg relative overflow-hidden group">
          <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500"
               style={{
                 animation: 'gradient 10s ease infinite',
               }}></div>
          <div className="relative">
            <div className="text-xl mb-4 text-cyan-400">$ cat profile.txt</div>
            <div className="space-y-2 text-sm">
              <p>Name: <span className="text-purple-300">John Developer</span></p>
              <p>Role: <span className="text-purple-300">Full Stack Engineer</span></p>
              <p>Location: <span className="text-purple-300">San Francisco, CA</span></p>
              <p>Status: <span className="animate-gradient bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 text-transparent bg-clip-text"
                             style={{
                               animation: 'gradient 3s ease infinite',
                             }}>Available for hire</span></p>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="border border-white/20 p-6 rounded-lg relative overflow-hidden group">
          <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-cyan-900/20 via-black to-purple-900/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500"
               style={{
                 animation: 'gradient 10s ease infinite',
               }}></div>
          <div className="relative">
            <div className="text-xl mb-4 text-cyan-400">$ ls -la skills/</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-purple-300 mb-2">Frontend:</p>
                <ul className="space-y-1">
                  <li className="flex items-center group">
                    <span className="text-cyan-400 mr-2 group-hover:text-purple-400 transition-colors duration-300">❯</span>
                    React.js
                  </li>
                  <li className="flex items-center group">
                    <span className="text-cyan-400 mr-2 group-hover:text-purple-400 transition-colors duration-300">❯</span>
                    TypeScript
                  </li>
                  <li className="flex items-center group">
                    <span className="text-cyan-400 mr-2 group-hover:text-purple-400 transition-colors duration-300">❯</span>
                    Tailwind CSS
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-purple-300 mb-2">Backend:</p>
                <ul className="space-y-1">
                  <li className="flex items-center group">
                    <span className="text-cyan-400 mr-2 group-hover:text-purple-400 transition-colors duration-300">❯</span>
                    Node.js
                  </li>
                  <li className="flex items-center group">
                    <span className="text-cyan-400 mr-2 group-hover:text-purple-400 transition-colors duration-300">❯</span>
                    Python
                  </li>
                  <li className="flex items-center group">
                    <span className="text-cyan-400 mr-2 group-hover:text-purple-400 transition-colors duration-300">❯</span>
                    PostgreSQL
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="border border-white/20 p-6 rounded-lg relative overflow-hidden col-span-full group">
          <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500"
               style={{
                 animation: 'gradient 10s ease infinite',
               }}></div>
          <div className="relative">
            <div className="text-xl mb-4 text-cyan-400">$ git log --oneline projects/</div>
            <div className="space-y-4">
              {[
                {
                  title: "Project Alpha",
                  desc: "Full-stack application with real-time updates"
                },
                {
                  title: "Project Beta",
                  desc: "AI-powered data visualization dashboard"
                },
                {
                  title: "Project Gamma",
                  desc: "Mobile-first e-commerce platform"
                }
              ].map((project, i) => (
                <div key={i} className="group/item cursor-pointer">
                  <div className="flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-purple-600/0 via-cyan-500/0 to-purple-600/0 opacity-0 group-hover/item:opacity-20"
                         style={{
                           animation: 'gradient 3s ease infinite',
                         }}></div>
                    <span className="text-cyan-400 mr-2 group-hover/item:text-purple-400 transition-colors duration-300 relative">❯</span>
                    <div className="relative">
                      <p className="text-purple-300 group-hover/item:text-white transition-colors duration-300">{project.title}</p>
                      <p className="text-sm text-gray-400">{project.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 border-t border-white/20 pt-4 text-sm">
        <p className="flex items-center flex-wrap gap-4">
          <span className="text-cyan-400">❯ Find me on:</span>
          {["GitHub", "LinkedIn", "Twitter"].map((platform, i) => (
            <a
              key={i}
              href="#"
              className="relative group"
            >
              <span className="absolute -inset-0.5 animate-gradient bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-60 transition duration-500"
                    style={{
                      animation: 'gradient 3s ease infinite',
                    }}></span>
              <span className="relative">{platform}</span>
            </a>
          ))}
        </p>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedPortfolio;