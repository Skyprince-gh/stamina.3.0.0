import React from "react";

interface SegmentedProgressBarProps {
  segments: number;
  color: string;
  currentStep: number;
  className:string
}

export const SegmentedProgressBar: React.FC<SegmentedProgressBarProps> = ({
  segments,
  color,
  currentStep,
  className
}) => {
  const remainingSteps = segments - currentStep;

  return (
    <div className={`h-8 flex items-center justify-center bg-transparent rounded-full ${className}`} >
      {[...Array(currentStep)].map((_, index) => (
        <div
          key={index}
          className={`h-3 w-3 rounded-full bg-${color} mr-1`}
        />
      ))}

      {[...Array(remainingSteps)].map((_, index) => (
        <div
          key={index + currentStep}
          className={`h-3 w-3 rounded-full bg-primary-black mr-1`}
        />
      ))}
    </div>
  );
};

export default SegmentedProgressBar;
