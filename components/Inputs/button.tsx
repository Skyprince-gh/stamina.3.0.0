interface ButtonProps {
  onClick?: (event: React.SyntheticEvent) => void;
  children?: React.ReactNode;
  className?: string;
  type?: string;
  
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  type,
 
  ...rest
}) => {
  return (
    <button
      className={`rounded-full  flex  bg-primary-yellow hover:bg-primary-red active:bg-primary-black ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export const Button_Primary: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  type,
  ...rest
}) => {
  return (
    <button
      className={`rounded-full  flex text-white bg-primary-black hover:text-primary-yellow active:bg-primary-yellow active:text-primary-black ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export const Button_Red: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
  type,

  ...rest
}) => {
  return (
    <button
      className={`rounded-full flex bg-primary-red hover:bg-primary-yellow active:bg-primary-black ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export const Button_Disabled: React.FC<ButtonProps> = ({
  children,
  className,
  type,
  ...rest
}) => {

  return (
    <button
      className={`rounded-full flex bg-gray-400 cursor-not-allowed ${className}`}
      disabled
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

