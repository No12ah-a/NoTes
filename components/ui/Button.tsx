import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  onClick,
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-gradient-primary text-white hover:opacity-90 hover:scale-105 focus:ring-primary-start shadow-lg',
    secondary: 'bg-gradient-secondary text-white hover:opacity-90 hover:scale-105 focus:ring-secondary-start shadow-lg',
    accent: 'bg-gradient-accent text-white hover:opacity-90 hover:scale-105 focus:ring-accent-start shadow-lg',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-foreground',
    outline: 'border-2 border-primary-start text-primary-start hover:bg-primary-start hover:text-white',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button 
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
