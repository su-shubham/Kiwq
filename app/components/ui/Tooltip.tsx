import { ReactNode } from 'react';

interface TooltipProps {
  content?: string;
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  if (!content) return <>{children}</>;

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  };

  return (
    <div className="relative group">
      {children}
      <div
        className={`absolute ${positions[side]} hidden group-hover:block z-50 px-2 py-1 text-xs bg-gray-800 text-white rounded whitespace-nowrap`}
      >
        {content}
      </div>
    </div>
  );
}