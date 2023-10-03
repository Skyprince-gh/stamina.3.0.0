import React from "react";
import Textbox from "../../components/Inputs/textbox";
import FormContainer from "../../components/formContainer";
import Image from "next/image";
import { useState } from "react";
import { Button as BTN } from "../../components/Inputs/button";
import { Prompt as SuccessPrompt } from "../../components/UI/Prompts/Prompts";
import { CheckCircle as Check } from "@mui/icons-material";
import Checkbox from "../../components/Inputs/checkbox";

const Test = () => {
  const freeTierFeatures = [
    "Basic Features",
    "3 Tasks Per day",
    "Accounting Settings",
    "Business Updates",
  ];

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <div>
      <h2>Textbox</h2>
      <FormContainer className="bg-primary-black p-12">
        <Textbox theme="white" type="text" label="Another input" />
      </FormContainer>
      <FormContainer className="h-min w-full flex border-2 border-red-100 pt-4 pb-4  justify-center items-center">
        <FormContainer className="bg-primary-black p-4 w-60 h-min rounded-2xl flex flex-col">
          <ul className="w-full">
            {freeTierFeatures.map((feature) => (
              <li className="flex justify-start pt-3 pb-3 w-full" key={feature}>
                <Image
                  src="/svg/check.svg"
                  alt="check mark"
                  width={24}
                  height={24}
                />
                <span className="text-white font-bold inline-block pl-4">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          <div className="w-full h-10 flex justify-center items-center font-bold">
            <BTN>$0.00</BTN>
          </div>
        </FormContainer>
      </FormContainer>
      <div className="w-full h-10 flex justify-center items-center font-bold">
        <SuccessPrompt className="animate-fade-in-down px-3 ">
          <span className="flex justify-between items-center w-full h-full">
            Item Added Successfully
          </span>
          <span className=" h-full  flex items-center text-green-600">
            <Check />
          </span>
        </SuccessPrompt>
      </div>
      <div className="w-full h-10 flex justify-center items-center font-bold">
        <Checkbox id="myCheckbox" checked={isChecked} onChange={handleCheckboxChange}/>
      </div>
    </div>
  );
};

export default Test;
