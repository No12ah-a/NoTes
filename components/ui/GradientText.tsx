import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

export function GradientText({ children, className = '', variant = 'primary' }: GradientTextProps) {
  const variantClasses = {
    primary: 'gradient-text',
    secondary: 'gradient-text-secondary',
    accent: 'gradient-text-accent',
  };
  
  return (
    <span className={`${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
