"use client";

import { useId } from "react";

type Option = {
  value: string;
  label: string;
};

type FormFieldProps = {
  id?: string;
  label: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  as?: "input" | "textarea" | "select";
  options?: Option[];
  error?: string;
  required?: boolean;
};

const FormField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  as = "input",
  options = [],
  error,
  required = false,
}: FormFieldProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  const baseClasses =
    "w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition";

  return (
    <div className="form-field flex flex-col gap-1">
      {/* ✅ Label */}
      <label
        htmlFor={inputId}
        className="text-sm font-medium flex items-center gap-1"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {/* ✅ Input types */}
      {as === "textarea" ? (
        <textarea
          id={inputId}
          name={inputId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseClasses} min-h-[100px] resize-none`}
        />
      ) : as === "select" ? (
        <select
          id={inputId}
          name={inputId}
          value={value}
          onChange={onChange}
          className={baseClasses}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={inputId}
          name={inputId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}

      {/* ✅ Error message */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;