export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export const AVATAR_SIZE_MAP: Record<AvatarSize, string> = {
    xs: '1.5rem',   // 24px
    sm: '2rem',     // 32px
    md: '2.5rem',   // 40px
    lg: '3rem',     // 48px
    xl: '4rem',     // 64px
    '2xl': '5rem',   // 80px
} as const;

export const AVATAR_FONT_SIZE_MAP: Record<AvatarSize, string> = {
    xs: '0.625rem',  // 10px
    sm: '0.75rem',   // 12px
    md: '0.9375rem', // 15px
    lg: '1.125rem',  // 18px
    xl: '1.5rem',    // 24px
    '2xl': '1.875rem',// 30px
} as const;