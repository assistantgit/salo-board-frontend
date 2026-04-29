import { LogoSvg } from '@shared/assets';
import type React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
  to?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', to = '/' }) => {
  return (
    <Link to={to} className={`${styles.logoWrapper} ${className}`}>
      <img src={LogoSvg} alt='Salo Board Logo' className={styles.image} />
    </Link>
  );
};
