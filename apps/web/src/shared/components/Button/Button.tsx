import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'lobby' | 'lobby_alt' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    className?: string;
    children: React.ReactNode;
}

export default function Button({ variant = 'lobby', size = 'medium', className, children, ...props }: ButtonProps) {
    const variants = {
        lobby: 'bg-secondary-500 text-white hover:scale-105 hover:bg-secondary-400 ',
        lobby_alt: 'bg-secondary-800 text-white hover:scale-105 hover:bg-secondary-700 ',
        ghost: 'bg-transparent hover:bg-gray-50',
    };

    const sizes = {
        small: 'px-2 py-1 text-sm',
        medium: 'py-4 px-12 text-base',
        large: 'py-8 px-20 text-lg',
    };

    return (
        <button
            className={`rounded-2xl center-row font-bold cursor-pointer duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}