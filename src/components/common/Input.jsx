import { forwardRef } from 'react';
import { cn } from '@/utils/helpers';

const Input = forwardRef(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  type = 'text',
  className = '',
  containerClass = '',
  required = false,
  ...props
}, ref) => {
  return (
    <div className={cn('form-group', containerClass)}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-[var(--text-muted)] flex items-center pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'input-field',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error && 'border-red-400 focus:border-red-500',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-[var(--text-muted)] flex items-center">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <p className="form-error">{error}</p>}
      {hint && !error && <p className="text-xs text-[var(--text-muted)] mt-1">{hint}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
