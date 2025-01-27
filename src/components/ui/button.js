import React from 'react';

export const Button = ({ children, onClick, className, style }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md focus:outline-none ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};
