"use client";

interface FieldProps {
  label: string;
  name: string;
  placeholder?: string;
  errors?: string[];
}

interface SelectFieldProps extends FieldProps {
  options: { value: string; label: string }[];
}

export function TextField({ label, name, placeholder, errors }: FieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        placeholder={placeholder}
        className="peer block w-full rounded-md border border-border py-2 pl-3 text-sm outline-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        aria-describedby={`${name}-error`}
      />
      {errors && (
        <div
          id={`${name}-error`}
          aria-live="polite"
          className="mt-2 text-sm text-destructive"
        >
          {errors.map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export function EmailField({ label, name, placeholder, errors }: FieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="email"
        placeholder={placeholder}
        className="peer block w-full rounded-md border border-border py-2 pl-3 text-sm outline-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        aria-describedby={`${name}-error`}
      />
      {errors && (
        <div
          id={`${name}-error`}
          aria-live="polite"
          className="mt-2 text-sm text-destructive"
        >
          {errors.map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export function SelectField({
  label,
  name,
  options,
  errors,
}: SelectFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="peer block w-full rounded-md border border-border py-2 pl-3 text-sm outline-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        aria-describedby={`${name}-error`}
        defaultValue=""
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && (
        <div
          id={`${name}-error`}
          aria-live="polite"
          className="mt-2 text-sm text-destructive"
        >
          {errors.map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}
