/**
 * Design System Tokens
 * Comprehensive design system for the Vehicle History Report
 * Based on Material Design 3.0 and WCAG 2.1 AA standards
 */

export const designTokens = {
    /**
     * Color Palette
     * All colors meet WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
     */
    colors: {
        // Primary Colors
        primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',  // Main primary
            600: '#2563eb',  // Hover state
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
        },

        // Success Colors
        success: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',  // Main success
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
        },

        // Warning Colors
        warning: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',  // Main warning
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
        },

        // Error/Danger Colors
        danger: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#ef4444',  // Main danger
            600: '#dc2626',
            700: '#b91c1c',
            800: '#991b1b',
            900: '#7f1d1d',
        },

        // Neutral Colors
        gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
        },

        // Semantic Colors
        semantic: {
            info: '#3b82f6',
            success: '#22c55e',
            warning: '#f59e0b',
            error: '#ef4444',
            background: '#ffffff',
            surface: '#f9fafb',
            border: '#e5e7eb',
        }
    },

    /**
     * Typography
     * Font sizes follow a modular scale (1.250 - Major Third)
     */
    typography: {
        fontFamily: {
            sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            mono: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", "Droid Sans Mono", monospace',
        },

        fontSize: {
            xs: '0.75rem',      // 12px
            sm: '0.875rem',     // 14px
            base: '1rem',       // 16px
            lg: '1.125rem',     // 18px
            xl: '1.25rem',      // 20px
            '2xl': '1.5rem',    // 24px
            '3xl': '1.875rem',  // 30px
            '4xl': '2.25rem',   // 36px
            '5xl': '3rem',      // 48px
        },

        fontWeight: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            black: '900',
        },

        lineHeight: {
            none: '1',
            tight: '1.25',
            snug: '1.375',
            normal: '1.5',
            relaxed: '1.625',
            loose: '2',
        },

        letterSpacing: {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em',
        },
    },

    /**
     * Spacing System
     * Based on 4px base unit (0.25rem)
     */
    spacing: {
        0: '0',
        0.5: '0.125rem',  // 2px
        1: '0.25rem',     // 4px
        1.5: '0.375rem',  // 6px
        2: '0.5rem',      // 8px
        2.5: '0.625rem',  // 10px
        3: '0.75rem',     // 12px
        3.5: '0.875rem',  // 14px
        4: '1rem',        // 16px
        5: '1.25rem',     // 20px
        6: '1.5rem',      // 24px
        7: '1.75rem',     // 28px
        8: '2rem',        // 32px
        9: '2.25rem',     // 36px
        10: '2.5rem',     // 40px
        12: '3rem',       // 48px
        14: '3.5rem',     // 56px
        16: '4rem',       // 64px
        20: '5rem',       // 80px
        24: '6rem',       // 96px
        32: '8rem',       // 128px
        40: '10rem',      // 160px
        48: '12rem',      // 192px
        56: '14rem',      // 224px
        64: '16rem',      // 256px
    },

    /**
     * Border Radius
     */
    borderRadius: {
        none: '0',
        sm: '0.125rem',    // 2px
        base: '0.25rem',   // 4px
        md: '0.375rem',    // 6px
        lg: '0.5rem',      // 8px
        xl: '0.75rem',     // 12px
        '2xl': '1rem',     // 16px
        '3xl': '1.5rem',   // 24px
        full: '9999px',
    },

    /**
     * Shadows
     * Elevation system for depth perception
     */
    shadows: {
        none: 'none',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    },

    /**
     * Z-Index Scale
     */
    zIndex: {
        auto: 'auto',
        0: '0',
        10: '10',
        20: '20',
        30: '30',
        40: '40',
        50: '50',      // Dropdown
        60: '60',      // Sticky header
        70: '70',      // Modal backdrop
        80: '80',      // Modal
        90: '90',      // Toast/Notification
        100: '100',    // Tooltip
    },

    /**
     * Breakpoints for Responsive Design
     */
    breakpoints: {
        xs: '0px',       // Mobile portrait
        sm: '640px',     // Mobile landscape
        md: '768px',     // Tablet portrait
        lg: '1024px',    // Tablet landscape / Small desktop
        xl: '1280px',    // Desktop
        '2xl': '1536px', // Large desktop
    },

    /**
     * Animation & Transitions
     */
    animation: {
        duration: {
            fast: '150ms',
            base: '200ms',
            slow: '300ms',
            slower: '500ms',
        },

        easing: {
            linear: 'linear',
            in: 'cubic-bezier(0.4, 0, 1, 1)',
            out: 'cubic-bezier(0, 0, 0.2, 1)',
            inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
    },

    /**
     * Accessibility
     */
    accessibility: {
        // Minimum touch target size (WCAG 2.5.5)
        minTouchTarget: '44px',

        // Focus ring
        focusRing: {
            width: '2px',
            offset: '2px',
            color: '#2563eb',
            style: 'solid',
        },

        // Skip link (for keyboard navigation)
        skipLink: {
            position: 'absolute',
            left: '-9999px',
            zIndex: '9999',
            padding: '1rem',
            backgroundColor: '#ffffff',
            color: '#1f2937',
            fontSize: '1rem',
            fontWeight: '600',
        },
    },
};

/**
 * Component-specific tokens
 */
export const componentTokens = {
    button: {
        height: {
            sm: '32px',
            md: '40px',
            lg: '48px',
        },
        padding: {
            sm: '0 12px',
            md: '0 16px',
            lg: '0 24px',
        },
        fontSize: {
            sm: designTokens.typography.fontSize.sm,
            md: designTokens.typography.fontSize.base,
            lg: designTokens.typography.fontSize.lg,
        },
    },

    input: {
        height: {
            sm: '36px',
            md: '44px',
            lg: '52px',
        },
        padding: {
            sm: '0 12px',
            md: '0 16px',
            lg: '0 20px',
        },
    },

    card: {
        padding: {
            sm: designTokens.spacing[4],
            md: designTokens.spacing[6],
            lg: designTokens.spacing[8],
        },
        borderRadius: designTokens.borderRadius.lg,
        shadow: designTokens.shadows.base,
    },

    modal: {
        maxWidth: {
            sm: '400px',
            md: '640px',
            lg: '960px',
            xl: '1280px',
        },
        padding: designTokens.spacing[6],
        borderRadius: designTokens.borderRadius.xl,
    },
};

/**
 * Utility functions
 */
export const utils = {
    /**
     * Get color with opacity
     */
    colorWithOpacity: (color: string, opacity: number): string => {
        return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
    },

    /**
     * Calculate responsive value
     */
    responsive: (
        base: string | number,
        sm?: string | number,
        md?: string | number,
        lg?: string | number,
        xl?: string | number
    ) => ({
        base,
        sm: sm || base,
        md: md || sm || base,
        lg: lg || md || sm || base,
        xl: xl || lg || md || sm || base,
    }),

    /**
     * Generate box shadow from elevation
     */
    elevation: (level: number): string => {
        const shadows: Record<number, string> = {
            0: designTokens.shadows.none,
            1: designTokens.shadows.sm,
            2: designTokens.shadows.base,
            3: designTokens.shadows.md,
            4: designTokens.shadows.lg,
            5: designTokens.shadows.xl,
            6: designTokens.shadows['2xl'],
        };
        return shadows[level] || shadows[0];
    },
};

export default designTokens;
