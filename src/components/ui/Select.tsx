interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: Array<{ value: string; label: string }>
}

export function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm font-medium text-neutral-700">{label}</label>}
      <select
        className={`focus:ring-primary-700 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:outline-none ${className}`}
        {...props}
      >
        <option value="">Sélectionner une option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
