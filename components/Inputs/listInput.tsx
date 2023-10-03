import React, { useState, useRef } from "react";
import { AddCircleOutlineRounded, Add, Remove } from "@mui/icons-material";

interface InputBProps {
  label: string;
  onUpdate: (value: string[]) => void;
  width?: string;
  theme?: string;
  value: string[];
}

export const listInput: React.FC<InputBProps> = ({
  label = "Label",
  width,
  theme,
  value,
  onUpdate,
}) => {
  const containerClasses = width ? width : "w-full";
  const isBlackTheme = theme === "black";
  const labelColorClass = isBlackTheme ? "text-primary-black" : "text-white";
  const labelBgClass = isBlackTheme ? "bg-white" : "bg-primary-black";
  const inputTextColorClass = isBlackTheme
    ? "text-primary-black"
    : "text-white";
  const inputBgClass = isBlackTheme ? "border-primary-black" : "border-white";
  const [listIsActive, setListIsActive] = useState(false);
  const [strings, setStrings] = useState<string[]>(value);
  const [currentString, setCurrentString] = useState<string>("");

  const toggleList = () => {
    setListIsActive(!listIsActive);
    onUpdate(strings); // Call the onUpdate prop here
  };

  const addString = () => {
    if (currentString && currentString.trim().length > 0) {
      setStrings([...strings, currentString]);
    }
    setCurrentString("");
  };

  const handleCurrentStringChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentString(event.target.value);
  };

  const removeString = (value: string) => {
    setStrings(strings.filter((s) => s !== value));
  };

  return (
    <div
      className={`h-10 ${containerClasses} relative rounded-2xl border-2 ${inputBgClass} w-full`}
    >
      <label
        className={`text-xs absolute -top-3 left-2 rounded-full pl-2 pr-2 ${labelColorClass} ${labelBgClass}`}
        htmlFor={label}
      >
        {label}
      </label>

      <div className="flex items-center justify-between h-full">
        <div
          className={`pl-1 flex gap-2 h-full  cursor-pointer overflow-hidden ${
            listIsActive ? "hidden" : ""
          }`}
        >
          {strings.map((string, index) => (
            <span
              className="font-bold flex items-center"
              key={string + index}
            >{`${string.trim()},`}</span>
          ))}
        </div>
        {listIsActive && (
          <ul
            className="p-2 rounded-md overflow-y-scroll bg-primary-black text-white absolute top-full left-0 z-10"
            onMouseLeave={toggleList}
          >
            {strings.map((string, index) => (
              <li
                key={string + index}
                className="flex justify-between border-b-2 border-white p-2"
              >
                {string}
                <Remove onClick={() => removeString(string)} />
              </li>
            ))}
            <div className="flex justify-between items-center p-1">
              <input
                type="text"
                onChange={handleCurrentStringChange}
                value={currentString}
                className="w-4/5 h-10 flex-grow border-2 text-primary-black border-gray-300 p-1 rounded-md"
              />
              <Add onClick={addString} />
            </div>
          </ul>
        )}
        <AddCircleOutlineRounded
          className={`button transition-transform transform ${
            listIsActive ? "rotate-45" : ""
          }`}
          onClick={toggleList}
        />
      </div>
    </div>
  );
};

export default listInput;
