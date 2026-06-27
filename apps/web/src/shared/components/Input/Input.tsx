import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'password';
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
  variant?: 'lobby' | 'blank';
  error?: string;
}

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  setValue,
  className,
  variant = 'blank',
  error,
  ...props
}: InputProps) {
  const variants = {
    lobby:
      'bg-white/20 border-2 border-surface-light text-white focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent',
    blank:
      'bg-white text-black focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent',
  };

  const variantLabel = {
    lobby: 'text-white/50 text-center w-full text-sm',
    blank: 'text-black',
  }

  const variantClass = variants[variant];
  const variantLabelClass = variantLabel[variant];

  return (
    <div className="flex flex-col gap-2">
      {label && <label className={` ${variantLabelClass} mt-8`}>{label}</label>}
      <input
        type={type}
        className={`p-2 rounded-2xl placeholder:text-white/20 ${variantClass} ${className}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
      {error && <p className="text-red-500  text-center">{error}</p>}
    </div>
  );
}
