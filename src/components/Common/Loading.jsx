import React from 'react';

const Loading = ({ type = 'default' }) => {
  switch (type) {
    case 'spinner':
      return (
        <div className="flex justify-center items-center p-4">
          <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      );

    case 'skeleton':
      return (
        <div className="space-y-4 w-full">
          <div className="h-8 bg-gray-800 rounded-lg animate-pulse" />
          <div className="h-32 bg-gray-800 rounded-lg animate-pulse" />
          <div className="h-8 bg-gray-800 rounded-lg animate-pulse w-2/3" />
        </div>
      );

    case 'dots':
      return (
        <div className="flex justify-center items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      );

    default:
      return (
        <div className="flex justify-center items-center p-4">
          <div className="text-cyan-400">Loading...</div>
        </div>
      );
  }
};

export default Loading;