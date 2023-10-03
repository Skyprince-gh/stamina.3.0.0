import React from "react";
import { isTemplateMiddleOrTemplateTail } from "typescript";

interface TextboxProps {
  theme: string;
  label: string;
  options: any[];
  width?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
}

export const SelectList: React.FC<TextboxProps> = ({
  theme,
  label,
  value,
  onChange,
  onBlur,
  options,
  width,
}) => {
  const containerClasses = width ? width : "w-full";
  const isBlackTheme = theme === "black";
  const labelColorClass = isBlackTheme ? "text-primary-black" : "text-white";
  const labelBgClass = isBlackTheme ? "bg-white" : "bg-primary-black";
  const inputTextColorClass = isBlackTheme
    ? "text-primary-black"
    : "text-white";
  const inputBgClass = isBlackTheme ? "border-primary-black" : "border-white";

  return (
    <div
      className={`h-10 ${containerClasses} relative rounded-2xl border-2 ${inputBgClass} relative`}
    >
      <label
        className={`text-xs absolute -top-3 left-2 rounded-full pl-2 pr-2 ${labelColorClass} ${labelBgClass}`}
        htmlFor={label}
      >
        {label}
      </label>
      <select
        id={label}
        className={`h-full w-full focus:ring-0 border-none bg-transparent rounded-2xl ${inputTextColorClass} appearance-none text-primary-black border-none rounded p-2 pr-8`}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      >

        {options.map((opt, index) => {
          return (
            <option
              className="bg-primary-black text-white"
              key={index}
              value={opt.value}
              // selected={opt.option === value}
            >
              {opt.option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectList;
