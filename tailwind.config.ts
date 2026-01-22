
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				bjj: {
					blue: 'hsl(var(--bjj-blue))',
					purple: 'hsl(var(--bjj-purple))',
					brown: 'hsl(var(--bjj-brown))',
					black: 'hsl(var(--bjj-black))',
					white: 'hsl(var(--bjj-white))',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Luxury theme colors
				luxury: {
					gold: '#a08c6b',
					bronze: '#8b7355',
					cream: '#f5f2ed',
					charcoal: '#1a1a1a',
					black: '#0a0a0a',
					white: '#fafafa',
				},
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Cormorant Garamond', 'Georgia', 'serif'],
				display: ['Cormorant Garamond', 'Georgia', 'serif'],
			},
			fontSize: {
				'display-xl': ['5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
				'display-lg': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
				'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
				'display-sm': ['2rem', { lineHeight: '1.2', letterSpacing: '0' }],
			},
			letterSpacing: {
				'ultra-wide': '0.25em',
				'extra-wide': '0.15em',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-down': {
					from: { opacity: '0', transform: 'translateY(-20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					from: { transform: 'translateX(100%)' },
					to: { transform: 'translateX(0)' }
				},
				'slide-in-left': {
					from: { transform: 'translateX(-100%)' },
					to: { transform: 'translateX(0)' }
				},
				'scale-in': {
					from: { opacity: '0', transform: 'scale(0.98)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				'reveal-up': {
					from: { opacity: '0', transform: 'translateY(60px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'line-expand': {
					from: { transform: 'scaleX(0)' },
					to: { transform: 'scaleX(1)' }
				},
				'text-reveal': {
					from: {
						opacity: '0',
						transform: 'translateY(100%)',
						clipPath: 'inset(100% 0 0 0)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)',
						clipPath: 'inset(0 0 0 0)'
					}
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
				'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
				'fade-down': 'fade-down 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
				'slide-in-right': 'slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
				'slide-in-left': 'slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
				'scale-in': 'scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
				'reveal-up': 'reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1)',
				'line-expand': 'line-expand 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
				'text-reveal': 'text-reveal 1s cubic-bezier(0.16, 1, 0.3, 1)',
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
				'30': '7.5rem',
				'34': '8.5rem',
			},
			transitionDuration: {
				'400': '400ms',
				'600': '600ms',
				'800': '800ms',
			},
			transitionTimingFunction: {
				'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
