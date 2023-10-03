import React from 'react';

interface FormContainerProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  children: React.ReactNode;
  ref?:React.MutableRefObject<HTMLFormElement |null>
}

const FormContainer: React.FC<FormContainerProps> = ({ onSubmit, className, children, ref }) => {
  return (
    <form  ref={ref} className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default FormContainer;
