import React, { useRef, useEffect } from "react";
import "animate.css"

interface CustomCheckboxProps {
  id?: string;
  checked?: boolean;
  className?:string;
  onChange: (checked: boolean) => void;
}

const CheckBox: React.FC<CustomCheckboxProps> = ({
  id,
  checked,
  className,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = checked === null;
    }
  }, [checked]);

  return (
    <label className={`${className} cursor-pointer`} htmlFor={id}>
      <input
        ref={inputRef}
        id={id}
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={() => onChange(!checked)}
      />
      {!checked && (
        <div
          className={`w-5 h-5 rounded-full border-2 bg-white border-primary-black`}
        ></div>
      )}
      {checked && (
        <div className="flex justify-center items-center w-5 h-5 bg-white rounded-full border-2 border-primary-black">
          <div className={"w-3 h-3  rounded-full bg-primary-yellow animate__animated animate__fadeIn"}></div>
        </div>
      )}
    </label>
  );
};

export default CheckBox;
