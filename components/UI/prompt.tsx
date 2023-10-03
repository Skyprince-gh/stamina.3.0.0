import React from "react"

export const InputFieldInvalidPrompt:React.FC<{children:React.ReactNode; className?:string}> = (props) => {
  return (
    <div className={`expanded -translate-y-8 text-white border-2 border-primary-red rounded-lg ${props.className}`}>
      {props.children}
    </div>
  );
};

export default InputFieldInvalidPrompt;
