import React, { useState, ChangeEvent } from "react";
import FormContainer from "../formContainer";
import Textbox from "../Inputs/textbox";
import { Button as BtnYellow } from "../Inputs/button";
import { InputFieldInvalidPrompt as Prompt } from "../UI/prompt";
import { Button_Disabled as BtnDisabled } from "../Inputs/button";
import TextArea from "../Inputs/textArea";
import ScrollContainer from "../UI/scrollContainer";
import regex from "../../util/regex";

interface userCredentials {
  businessName: string;
  address1: string;
  address2: string;
  phoneNumber1: number;
  phoneNumber2: number;
  state: string;
  businessDescription: string;
}

export const Form_Business_Information: React.FC<{
 userCredentials: userCredentials;
  goToNext: () => void;
  goToPrevious: () => void;
  handleFormData: (data: any) => void;
}> = ({ userCredentials, goToNext, goToPrevious, handleFormData }) => {
  const [businessName, setBusinessName] = useState(
    userCredentials.businessName
  );
  const [address1, setAddress1] = useState(userCredentials.address1);
  const [address2, setAddress2] = useState(userCredentials.address2);
  const [phoneNumber1, setPhone1] = useState(userCredentials.phoneNumber1);
  const [phoneNumber2, setPhone2] = useState(userCredentials.phoneNumber2);
  const [state, setState] = useState(userCredentials.state);
  const [businessDescription, setBusinessDescription] = useState(
    userCredentials.businessDescription
  );

  // Validation state for each field
  const [businessNameValid, setBusinessNameValid] = useState(true);
  const [address1Valid, setAddress1Valid] = useState(true);
  const [address2Valid, setAddress2Valid] = useState(true);
  const [phoneNumber1Valid, setPhone1Valid] = useState(true);
  const [phoneNumber2Valid, setPhone2Valid] = useState(true);
  const [stateValid, setStateValid] = useState(true);
  const [businessDescriptionValid, setBusinessDescriptionValid] = useState(
    true
  );

  const handleBusinessNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBusinessName(e.target.value);
    setBusinessNameValid(!!e.target.value.trim());
  };

  const handleAddress1Change = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress1(e.target.value);
    setAddress1Valid(!!e.target.value.trim());
  };

  const handleAddress2Change = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress2(e.target.value);
    setAddress2Valid(true);
  };

  const handlePhone1Change = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone1(+e.target.value);
    setPhone1Valid(!!e.target.value.trim());
  };

  const handlePhone2Change = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone2(+e.target.value);
    setPhone2Valid(true);
  };

  const handleStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
    setStateValid(!!e.target.value.trim());
  };

  const handleBusinessDescriptionChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBusinessDescription(e.target.value);
    setBusinessDescriptionValid(!!e.target.value.trim());
  };

  const handleClickToNextForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Validate each field individually
    const isBusinessNameValid = !!businessName.trim();
    const isAddress1Valid = !!address1.trim();
    const isAddress2Valid = true;
    const isPhone1Valid = !!phoneNumber1.toString().trim();
    const isPhone2Valid = true;
    const isStateValid = !!state.trim();
    const isBusinessDescriptionValid = !!businessDescription.trim();

    // Update validation states for each field
    setBusinessNameValid(isBusinessNameValid);
    setAddress1Valid(isAddress1Valid);
    setAddress2Valid(isAddress2Valid);
    setPhone1Valid(isPhone1Valid);
    setPhone2Valid(isPhone2Valid);
    setStateValid(isStateValid);
    setBusinessDescriptionValid(isBusinessDescriptionValid);

    // Check if all fields are valid
    if (
      isBusinessNameValid &&
      isAddress1Valid &&
      isAddress2Valid &&
      isPhone1Valid &&
      isPhone2Valid &&
      isStateValid &&
      isBusinessDescriptionValid
    ) {
      // Save form data
      const formData = {
        businessName,
        address1,
        address2,
        phoneNumber1,
        phoneNumber2,
        state,
        businessDescription,
      };

      handleFormData(formData);

      // Go to next form
      goToNext();
    }
  };

  const handleClickToPreviousForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Save form data
    const formData = {
      businessName,
      address1,
      address2,
      phoneNumber1,
      phoneNumber2,
      state,
      businessDescription,
    };

    handleFormData(formData);

    goToPrevious();
  };

  // Calculate overall form validity
  const formIsValid =
    businessNameValid &&
    address1Valid &&
    address2Valid &&
    phoneNumber1Valid &&
    phoneNumber2Valid &&
    stateValid &&
    businessDescriptionValid;

  return (
    <FormContainer className="w-1/2 p-4 h-min flex flex-col box-border rounded-lg shadow-2xl bg-primary-black">
      <h2 className="w-full text-white font-bold">Business Information</h2>
      <ScrollContainer className="p-0 h-[25rem] overflow-y-scroll custom-scrollbar">
        <div className="h-8 mt-12 mb-12">
          <Textbox
            label="Business Name"
            type="text"
            theme="yellow"
            value={businessName}
            onChange={handleBusinessNameChange}
            onBlur={() => setBusinessNameValid(!!businessName.trim())}
          />
        </div>
          {!businessNameValid && <Prompt>Business name is required.</Prompt>}
        <div className="h-8 mb-12 flex gap-4">
          <Textbox
            label="Address 1"
            type="text"
            theme="yellow"
            value={address1}
            onChange={handleAddress1Change}
            onBlur={() => setAddress1Valid(!!address1.trim())}
          />
          <Textbox
            label="Address 2"
            type="text"
            theme="yellow"
            value={address2}
            onChange={handleAddress2Change}
            onBlur={() => setAddress2Valid(true)}
          />
        </div>
        <div className="h-8 mb-12 flex gap-4">
          <Textbox
            label="Phone 1"
            type="number"
            theme="yellow"
            value={phoneNumber1}
            onChange={handlePhone1Change}
            onBlur={() => setPhone1Valid(!!phoneNumber1.toString().trim())}
          />
          <Textbox
            label="Phone 2"
            type="number"
            theme="yellow"
            value={phoneNumber2}
            onChange={handlePhone2Change}
            onBlur={() => setPhone2Valid(true)}
          />
        </div>
        <div className="h-8 mb-12">
          <Textbox
            label="State"
            type="text"
            theme="yellow"
            value={state}
            onChange={handleStateChange}
            onBlur={() => setStateValid(!!state.trim())}
          />
        </div>
          {!stateValid && <Prompt>State is required.</Prompt>}
        <div className="h-8 mb-12">
          <TextArea
            label="Business Description"
            theme="yellow"
            value={businessDescription}
            onChange={handleBusinessDescriptionChange}
            onBlur={() =>
              setBusinessDescriptionValid(!!businessDescription.trim())
            }
          />
          {!businessDescriptionValid && (
            <Prompt className="relative top-14">
              Business description is required.
            </Prompt>
          )}
        </div>
      </ScrollContainer>
      <div className="flex h-8 mt-4 mb-12 justify-between">
        <BtnYellow type="submit" onClick={handleClickToPreviousForm}>
          Previous
        </BtnYellow>
        {formIsValid ? (
          <BtnYellow type="submit" onClick={handleClickToNextForm}>
            Next
          </BtnYellow>
        ) : (
          <BtnDisabled>
            Next
          </BtnDisabled>
        )}
      </div>
    </FormContainer>
  );
};

export default Form_Business_Information;
