import type React from 'react';
import { createContext, useContext } from 'react';
import './Skeleton.css';

interface SkeletonProviderProps {
  children: React.ReactNode;
}

// Optional context for synchronized animations
const SkeletonContext = createContext(false);

export const SkeletonProvider = ({ children }: SkeletonProviderProps) => {
  return <SkeletonContext.Provider value={true}>{children}</SkeletonContext.Provider>;
};

interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

interface SkeletonProps extends BaseProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

const SkeletonBase = ({ className = '', width, height, borderRadius, style }: SkeletonProps) => {
  const isSync = useContext(SkeletonContext);
  const mergedStyle = {
    width,
    height,
    borderRadius,
    ...style,
  };

  return <div className={`skeleton ${isSync ? 'sync' : ''} ${className}`} style={mergedStyle} />;
};

interface TextProps extends BaseProps {
  lines?: number;
  lineHeight?: number | string;
  lastLineWidth?: string | number;
  gap?: number | string;
}

const SkeletonText = ({
  lines = 1,
  lineHeight = '1em',
  lastLineWidth = '60%',
  gap = 8,
  className = '',
  style,
}: TextProps) => {
  return (
    <div className={`skeleton-text-container ${className}`} style={{ gap, ...style }}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBase
          // biome-ignore lint/suspicious/noArrayIndexKey: indices are stable for skeleton lines
          key={i}
          width={i === lines - 1 && lines > 1 ? lastLineWidth : '100%'}
          height={lineHeight}
          className='skeleton-text-line'
          borderRadius={4}
        />
      ))}
    </div>
  );
};

interface CircleProps extends BaseProps {
  size: number | string;
}

const SkeletonCircle = ({ size, className = '', style }: CircleProps) => (
  <SkeletonBase
    width={size}
    height={size}
    borderRadius='50%'
    className={`skeleton-circle ${className}`}
    style={{ flexShrink: 0, ...style }}
  />
);

interface RectProps extends BaseProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
}

const SkeletonRect = ({
  width = '100%',
  height = '100%',
  borderRadius = 8,
  className = '',
  style,
}: RectProps) => (
  <SkeletonBase
    width={width}
    height={height}
    borderRadius={borderRadius}
    className={`skeleton-rect ${className}`}
    style={style}
  />
);

export const Skeleton = Object.assign(SkeletonBase, {
  Text: SkeletonText,
  Circle: SkeletonCircle,
  Rect: SkeletonRect,
  Provider: SkeletonProvider,
});
