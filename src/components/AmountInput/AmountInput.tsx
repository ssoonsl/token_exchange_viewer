import { useState, useEffect } from 'react';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
}

export function AmountInput({ value, onChange, placeholder = "0.00", label = "USD Amount", error }: AmountInputProps) {
  const [focused, setFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty input
    if (inputValue === '') {
      onChange('');
      return;
    }

    // Only allow numbers and one decimal point
    const regex = /^\d*\.?\d*$/;
    if (regex.test(inputValue)) {
      // Prevent multiple leading zeros
      if (inputValue.startsWith('00')) {
        return;
      }
      
      // Limit to 2 decimal places
      const parts = inputValue.split('.');
      if (parts[1] && parts[1].length > 2) {
        return;
      }
      
      onChange(inputValue);
    }
  };

  const formatDisplayValue = (val: string) => {
    if (!val || focused) return val;
    
    const num = parseFloat(val);
    if (isNaN(num)) return val;
    
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 text-lg">$</span>
        </div>
        <input
          type="text"
          value={focused ? value : formatDisplayValue(value)}
          onChange={handleInputChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`block w-full pl-8 pr-3 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          data-testid="usd-amount-input"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600" data-testid="amount-error">
          {error}
        </p>
      )}
    </div>
  );
}