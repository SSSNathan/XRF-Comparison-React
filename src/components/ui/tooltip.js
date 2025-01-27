import React from 'react';

export const TooltipProvider = ({ children }) => {
  return <div className="relative group">{children}</div>;
};

export const Tooltip = ({ content, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {content}
      </div>
    </div>
  );
};
