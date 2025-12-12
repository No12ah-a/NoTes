import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'default';
  size?: 'sm' | 'md';
}

export function Badge({ children, className = '', variant = 'default', size = 'md' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200';
  
  const variantClasses = {
    primary: 'bg-gradient-primary text-white',
    secondary: 'bg-gradient-secondary text-white',
    accent: 'bg-gradient-accent text-white',
    default: 'bg-gray-200 dark:bg-gray-700 text-foreground',
  };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  );
}
