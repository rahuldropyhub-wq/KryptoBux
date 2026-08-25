import { cn } from '@/utils/helpers';

const Select = ({
  label,
  error,
  options = [],
  placeholder = 'Select an option',
  className = '',
  containerClass = '',
  required = false,
  ...props
}) => {
  return (
    <div className={cn('form-group', containerClass)}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        className={cn(
          'input-field appearance-none cursor-pointer',
          error && 'border-red-400',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default Select;
