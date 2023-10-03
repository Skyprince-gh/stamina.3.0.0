import React from "react";

interface TextAreaProps {
  value: string;
  theme: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.SyntheticEvent) => void;
}
export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  onBlur,
  theme,
  label,
}) => {
  const isBlackTheme = theme === "black";
  const labelColorClass = isBlackTheme ? "text-primary-black" : "text-white";
  const labelBgClass = isBlackTheme ? "bg-white" : "bg-primary-black";
  const textAreaBgClass = isBlackTheme? "bg-white" : "bg-primary-black"
  const inputTextColorClass = isBlackTheme
    ? "text-primary-black"
    : "text-white";
  const inputBgClass = isBlackTheme ? "border-primary-black" : "border-white";

  return (
    <div
      className={`h-full w-full relative rounded-2xl border-2 ${inputBgClass}`}
    >
      <label
        className={`text-xs absolute -top-3 left-2 rounded-full pl-2 pr-2 ${labelColorClass} ${labelBgClass}`}
        htmlFor={label}
      >
        {label}
      </label>
      <textarea
        className={`w-full h-full focus:ring-0 overflow-y-auto resize-none ${textAreaBgClass}  block rounded-2xl border-none border-2 p-2  ${inputTextColorClass} appearance-none`}
        placeholder="Business Description"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default TextArea;
