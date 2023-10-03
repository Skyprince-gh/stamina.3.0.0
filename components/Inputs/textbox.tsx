import React, {useState} from "react";

interface TextboxProps {
  theme: string;
  label: string;
  type: string;
  value?: any;
  autoComplete?: string;
  autoSave?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  prefix?: string;
  suffix?: string;
}

const Textbox: React.FC<TextboxProps> = ({
  theme,
  label,
  type,
  value,
  onChange,
  onBlur,
  prefix,
  suffix,
}) => {
  const isBlackTheme = theme === "black";
  const labelColorClass = isBlackTheme ? "text-primary-black" : "text-white";
  const labelBgClass = isBlackTheme ? "bg-white" : "bg-primary-black";
  const inputTextColorClass = isBlackTheme
    ? "text-primary-black"
    : "text-white";
  const inputBgClass = isBlackTheme ? "border-primary-black" : "border-white";

  const [suffixPosition, setSuffixPosition] = useState<number>(24);

  // const calculateSuffixPosition = (value: number) => {
  //   const digits = value.toString().length;
  //   const positionInPixels = 24 * digits * 0.5;
  //   setSuffixPosition(positionInPixels)
  // };
  return (
    <div
      className={`h-10 w-full relative rounded-2xl border-2 ${inputBgClass}`}
    >
      <label
        className={`text-xs absolute -top-3 left-2 rounded-full pl-2 pr-2 ${labelColorClass} ${labelBgClass}`}
        htmlFor={label}
      >
        {label}
      </label>
      <div className="w-full flex items-center">
        {prefix && <span className="font-bold w-[10%] ml-2">{prefix}</span>}
        <input
          id={label}
          className={`h-full w-full focus:ring-0 border-none bg-transparent rounded-2xl ${inputTextColorClass}`}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="off"
          autoSave="off"
        />
        {suffix && (
          <span
            className={`font-bold w-[10%] mr-2`}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default Textbox;
