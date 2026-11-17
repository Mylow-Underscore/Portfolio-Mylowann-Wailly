interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && <label className="mb-2 block text-sm font-medium text-neutral-700">{label}</label>}
      <textarea
        className={`focus:ring-primary-700 w-full resize-none rounded-lg border border-neutral-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:outline-none ${className}`}
        rows={4}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
