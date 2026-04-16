import type { ReactNode } from 'react';
import './SectionHeader.css';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  aside?: ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  aside,
  className = '',
}: SectionHeaderProps) {
  const rootClassName = ['section-header', className].filter(Boolean).join(' ');

  return (
    <div className={rootClassName}>
      <div className="section-header__copy">
        <h2 className="section-header__title">{title}</h2>
        {subtitle ? <p className="section-header__subtitle">{subtitle}</p> : null}
      </div>

      {(badge || aside) ? (
        <div className="section-header__meta">
          {badge ? <span className="section-header__badge">{badge}</span> : null}
          {aside}
        </div>
      ) : null}
    </div>
  );
}
