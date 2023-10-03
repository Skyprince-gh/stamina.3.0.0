export const Prompt: React.FC<{ children: React.ReactNode; className:string }> = ({
  children, className
}) => {
  return <div className={` bg-white flex w-[20rem] shadow-2xl h-10 rounded-lg border border-gray-500  items-center justify-center ${className}`}>{children}</div>;
};

export const ErrorPrompt: React.FC<{ children: React.ReactNode; className:string }> = ({
  children, className
}) => {
  return <div className={` bg-white flex w-[20rem] shadow-2xl h-10 rounded-lg border border-gray-500  items-center justify-center ${className}`}>{children}</div>;
};

export default Prompt;
