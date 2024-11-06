import { ReactNode } from 'react';

interface IconButtonProps {
  icon: string;
  onClick: () => void;
  className?: string;
  badge?: string;
}

export function IconButton({ icon, onClick, className = '', badge }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative p-2 rounded-lg transition-colors ${className}`}
    >
      <span className="text-xl">{icon}</span>
      {badge && (
        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}