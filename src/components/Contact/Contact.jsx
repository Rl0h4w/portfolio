import React from 'react';
import { Mail, Github, Linkedin, MessagesSquare, MapPin, Clock, Flame } from 'lucide-react';

const ContactSection = () => {
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'rl0h4w@gmail.com',
      href: 'mailto:rl0h4w@gmail.com',
      description: 'Professional inquiries and collaboration opportunities',
      baseColor: 'text-red-400',
      glowColor: 'hover:shadow-[0_0_15px_rgba(248,113,113,0.5)]',
      bgHover: 'hover:bg-red-400/10',
      borderHover: 'hover:border-red-400/50'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/rl0h4w',
      href: 'https://github.com/rl0h4w',
      description: 'View my open-source projects and contributions',
      baseColor: 'text-white',
      glowColor: 'hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]',
      bgHover: 'hover:bg-white/10',
      borderHover: 'hover:border-white/50'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/username',
      href: 'https://linkedin.com/in/rl0h4w',
      description: 'Professional network and work history',
      baseColor: 'text-blue-400',
      glowColor: 'hover:shadow-[0_0_15px_rgba(96,165,250,0.5)]',
      bgHover: 'hover:bg-blue-400/10',
      borderHover: 'hover:border-blue-400/50'
    },
    {
      icon: MessagesSquare,
      label: 'Telegram',
      value: 't.me/rlohaw',
      href: 'https://t.me/rlohaw',
      description: 'Quick responses and instant messaging',
      baseColor: 'text-cyan-400',
      glowColor: 'hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]',
      bgHover: 'hover:bg-cyan-400/10',
      borderHover: 'hover:border-cyan-400/50'
    }
  ];

  const availabilityInfo = [
    {
      icon: Clock,
      label: 'Working Hours',
      value: '9:00 AM - 6:00 PM UTC+3',
      baseColor: 'text-cyan-400',
      glowColor: 'shadow-[0_0_10px_rgba(34,211,238,0.3)]'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Remote / Moscow, Russia',
      baseColor: 'text-red-400',
      glowColor: 'shadow-[0_0_10px_rgba(248,113,113,0.3)]'
    }
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text">
            Let's Connect
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <div className="space-y-4">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={index}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl 
                    border border-gray-800 transition-all duration-300
                    ${method.bgHover} ${method.borderHover} ${method.glowColor}`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`p-3 rounded-lg bg-gray-800/50 ${method.baseColor} transition-colors duration-300`}>
                      <Icon size={24} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{method.label}</h3>
                      <p className="text-gray-400">{method.value}</p>
                      <p className="text-sm text-gray-500 mt-1">{method.description}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Availability Info */}
          <div className="lg:pl-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Availability</h3>
              <div className="space-y-6">
                {availabilityInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-gray-800/50 ${info.baseColor} ${info.glowColor}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h4 className="text-gray-300 font-medium">{info.label}</h4>
                        <p className="text-gray-400">{info.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 p-4 bg-emerald-400/10 rounded-lg border border-emerald-400/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                    <Flame size={20} />
                  </div>
                  <h4 className="text-emerald-400 font-medium">Currently Available</h4>
                </div>
                <p className="text-gray-300">
                  Open to freelance projects and full-time opportunities in Computer Vision and ML
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
