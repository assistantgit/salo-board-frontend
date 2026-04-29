import type React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const LinkIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 512 512'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`icon ${className}`}
      {...props}
    >
      <path
        d='M208 352h-64a96 96 0 010-192h64m96 0h64a96 96 0 010 192h-64m-144-96h160'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='36'
      />
    </svg>
  );
};
