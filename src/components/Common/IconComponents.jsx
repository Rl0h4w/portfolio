import React from 'react';
import {
  Mail,
  Github,
  Linkedin,
  MessageCircle,
  MapPin,
  Clock,
  Flame,
  Code,
  Share2,
  MonitorSmartphone,
  FileCode2,
  ScrollText,
  UserCheck,
  Book,
  GraduationCap,
  Award,
  Trophy,
  BarChart2,
  Camera,
  Cpu,
  Database,
  GitBranch,
  Network,
  Briefcase,
  Brain,
  Star
} from 'lucide-react';

// Themed icon wrapper with consistent styling
const ThemedIcon = ({ icon: IconComponent, size = 24, className = "" }) => {
  return (
    <IconComponent 
      size={size}
      className={`transition-all duration-300 ${className}`}
    />
  );
};

// Social and contact icons with specific styling
export const SocialIcons = {
  Gmail: (props) => (
    <ThemedIcon
      icon={Mail}
      {...props}
      className="text-red-400 hover:text-red-500"
    />
  ),
  GitHub: (props) => (
    <ThemedIcon
      icon={Github}
      {...props}
      className="text-gray-200 hover:text-white"
    />
  ),
  LinkedIn: (props) => (
    <ThemedIcon
      icon={Linkedin}
      {...props}
      className="text-blue-500 hover:text-blue-400"
    />
  ),
  Telegram: (props) => (
    <ThemedIcon
      icon={MessageCircle}
      {...props}
      className="text-cyan-400 hover:text-cyan-300"
    />
  ),
};

// Skill category icons
export const SkillIcons = {
  ComputerVision: (props) => (
    <ThemedIcon
      icon={Camera}
      {...props}
      className="text-purple-400 hover:text-purple-300"
    />
  ),
  MachineLearning: (props) => (
    <ThemedIcon
      icon={Brain}
      {...props}
      className="text-emerald-400 hover:text-emerald-300"
    />
  ),
  DeepLearning: (props) => (
    <ThemedIcon
      icon={Network}
      {...props}
      className="text-blue-400 hover:text-blue-300"
    />
  ),
  MLOps: (props) => (
    <ThemedIcon
      icon={Database}
      {...props}
      className="text-orange-400 hover:text-orange-300"
    />
  ),
};

// Project type icons
export const ProjectIcons = {
  Research: (props) => (
    <ThemedIcon
      icon={Brain}
      {...props}
      className="text-indigo-400 hover:text-indigo-300"
    />
  ),
  Development: (props) => (
    <ThemedIcon
      icon={Code}
      {...props}
      className="text-green-400 hover:text-green-300"
    />
  ),
  Deployment: (props) => (
    <ThemedIcon
      icon={GitBranch}
      {...props}
      className="text-yellow-400 hover:text-yellow-300"
    />
  ),
};

// Status and info icons
export const StatusIcons = {
  Location: (props) => (
    <ThemedIcon
      icon={MapPin}
      {...props}
      className="text-red-400 hover:text-red-300"
    />
  ),
  Time: (props) => (
    <ThemedIcon
      icon={Clock}
      {...props}
      className="text-cyan-400 hover:text-cyan-300"
    />
  ),
  Available: (props) => (
    <ThemedIcon
      icon={Flame}
      {...props}
      className="text-green-400 hover:text-green-300"
    />
  ),
  Document: (props) => (
    <ThemedIcon
      icon={ScrollText}
      {...props}
      className="text-gray-400 hover:text-white"
    />
  ),
  Mail: (props) => (
    <ThemedIcon
      icon={Mail}
      {...props}
      className="text-cyan-400 hover:text-cyan-300"
    />
  ),
  Code: (props) => (
    <ThemedIcon
      icon={Code}
      {...props}
      className="text-cyan-400 hover:text-cyan-300"
    />
  ),
  UserCheck: (props) => (
    <ThemedIcon
      icon={UserCheck}
      {...props}
      className="text-cyan-400 hover:text-cyan-300"
    />
  ),
};

// Achievement and education icons
export const AchievementIcons = {
  Award: (props) => (
    <ThemedIcon
      icon={Award}
      {...props}
      className="text-yellow-400 hover:text-yellow-300"
    />
  ),
  Trophy: (props) => (
    <ThemedIcon
      icon={Trophy}
      {...props}
      className="text-amber-400 hover:text-amber-300"
    />
  ),
  Education: (props) => (
    <ThemedIcon
      icon={GraduationCap}
      {...props}
      className="text-blue-400 hover:text-blue-300"
    />
  ),
  Certificate: (props) => (
    <ThemedIcon
      icon={ScrollText}
      {...props}
      className="text-purple-400 hover:text-purple-300"
    />
  ),
  Clock: (props) => (
    <ThemedIcon
      icon={Clock}
      {...props}
      className="text-cyan-400 hover:text-cyan-300"
    />
  ),
  Document: (props) => (
    <ThemedIcon
      icon={ScrollText}
      {...props}
      className="text-cyan-400 hover:text-cyan-300"
    />
  ),
  Briefcase: (props) => (
    <ThemedIcon
      icon={Briefcase}
      {...props}
      className="text-cyan-400 hover:text-cyan-300"
    />
  ),
  Star: (props) => (
    <ThemedIcon
      icon={Star}
      {...props}
      className="text-yellow-400 hover:text-yellow-300"
    />
  ),
};

export default {
  SocialIcons,
  SkillIcons,
  ProjectIcons,
  StatusIcons,
  AchievementIcons,
};