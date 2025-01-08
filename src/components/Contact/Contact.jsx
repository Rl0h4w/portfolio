import React, { useState } from 'react';
import { Mail, Github, Linkedin, MessageCircle, Send } from 'lucide-react';
import './Contact.css';

const ContactSection = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Form submission logic would go here
      console.log('Form submitted:', formData);
    };
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const contactMethods = [
      {
        icon: Mail,
        label: 'Email',
        value: 'rl0h4w@gmail.com',
        href: 'mailto:rl0h4w@gmail.com'
      },
      {
        icon: Github,
        label: 'GitHub',
        value: 'github.com/rl0h4w',
        href: 'https://github.com/rl0h4w'
      },
      {
        icon: Linkedin,
        label: 'LinkedIn',
        value: 'linkedin.com/in/username',
        href: 'https://linkedin.com/in/username'
      },
      {
        icon: MessageCircle,
        label: 'Telegram',
        value: 't.me/rlohaw',
        href: 'https://t.me/rlohaw'
      }
    ];
  
    return (
      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text">
              Get in Touch
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Send Message
                  <Send size={18} />
                </button>
              </form>
            </div>
  
            {/* Contact Info */}
            <div className="space-y-8">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-cyan-400/50 transition-colors"
                >
                  <div className="p-3 rounded-lg bg-cyan-400/10 text-cyan-400">
                    <method.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{method.label}</h3>
                    <p className="text-gray-400">{method.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default ContactSection;