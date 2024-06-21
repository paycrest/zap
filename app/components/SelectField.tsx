import { PiCaretDown } from "react-icons/pi";
import { InputError } from "./InputError";
import { FormData } from "../page";

export const renderSelectField = (
  id: string,
  label: string,
  options: { value: string; label: string; disabled?: boolean }[],
  validation: any,
  errors: any,
  register: any,
) => {
  return (
    <div className="grid flex-1 gap-2">
      <label htmlFor={id} className="font-medium">
        {label} <span className="text-rose-500">*</span>
      </label>
      <div className="relative">
        <select
          {...register(id as keyof FormData, validation)}
          id={id}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-neutral-900 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed dark:border-white/20 dark:bg-neutral-900 dark:text-white/80 dark:focus-visible:ring-offset-neutral-900"
        >
          <option value="" hidden>
            Select {label.toLowerCase()}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="disabled:cursor-not-allowed disabled:opacity-50"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center">
          <PiCaretDown className="text-lg text-gray-400 dark:text-white/50" />
        </div>
      </div>
      {errors[id as keyof FormData] && (
        <InputError message={errors[id as keyof FormData]?.message} />
      )}
    </div>
  );
};
