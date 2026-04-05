import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const SearchIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`icon ${className}`}
      {...props}
    >
      <circle cx="17.27" cy="17.27" r="12.27" stroke="currentColor" strokeWidth="3" />
      <path d="M26.43 26.43L35 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};
