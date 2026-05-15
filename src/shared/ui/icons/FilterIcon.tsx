import type React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Filter/Options icon based on Ionicons (options-outline)
 */
export const FilterIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => {
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
      <title>Фільтр</title>
      <path
        d='M368 128h80M64 128h240M368 384h80M64 384h240M208 256h240M64 256h80'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      />
      <circle
        cx='336'
        cy='128'
        r='32'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      />
      <circle
        cx='176'
        cy='256'
        r='32'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      />
      <circle
        cx='336'
        cy='384'
        r='32'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='32'
      />
    </svg>
  );
};
