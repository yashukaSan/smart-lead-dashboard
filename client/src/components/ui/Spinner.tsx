import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  variant?: 'inline' | 'centered' | 'overlay';
  size?: 'sm' | 'md' | 'lg';
}

export default function Spinner({ variant = 'centered', size = 'md' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const spinner = <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />;

  if (variant === 'inline') {
    return <span className="inline-block">{spinner}</span>;
  }

  if (variant === 'overlay') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-12">{spinner}</div>;
}
