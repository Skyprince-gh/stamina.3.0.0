import React, { useState, ChangeEvent, useEffect } from "react";
import FormContainer from "../formContainer";
import Textbox from "../Inputs/textbox";
import Link from "next/link";
import { Button as BtnYellow } from "../Inputs/button";
import regex from "../../util/regex";
import { InputFieldInvalidPrompt as Prompt } from "../UI/prompt";
import { Button_Disabled as BtnDisabled } from "../../components/Inputs/button";

interface _credentials {
  firstName: string;
  lastName: string;
  email: string;
}

export const Form_Basic_Information: React.FC<{
  animation:string;
  credentials: _credentials;
  goToNext: () => void;
  handleFormData: (data: any) => void;
}> = ({ credentials, goToNext, animation }) => {
  const [firstName, setFirstName] = useState(credentials.firstName);
  const [lastName, setLastName] = useState(credentials.lastName);
  const [email, setEmail] = useState(credentials.email);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [formAnimation, setFormAnimation] = useState(animation)

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateFields = () => {
    if (!regex.firstName.test(firstName)) {
      setFirstNameError("First name must be between 2 and 29 characters.");
      setFormIsValid(false);
    } else {
      setFirstNameError("");
      setFormIsValid(true);
    }

    if (!regex.lastName.test(lastName)) {
      setLastNameError(
        "Last name must be between 2 and 29 characters, and must consist of one or two names separated by a space."
      );
      setFormIsValid(false);
    } else {
      setLastNameError("");
      setFormIsValid(true);
    }

    if (!regex.email.test(email)) {
      setEmailError("Invalid email address");
      setFormIsValid(false);
    } else {
      setEmailError("");
      setFormIsValid(true);
    }
  };

  const handleClickToNextForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (formIsValid) {
      // Change animation class to fade-out to the left
      setFormAnimation("animate-fade-out-left")
  
      //after fade out initiate go to next
      setTimeout(()=> {
        goToNext()
      },500)
    }
  };

  return (
    <FormContainer className={`w-1/2 p-4 h-min flex flex-col box-border rounded-lg shadow-2xl bg-primary-black ${formAnimation}`}>
      <h2 className="w-full text-white font-bold">Signup</h2>
      <div className="h-8 mt-12 mb-12 ">
        <Textbox
          label="First Name"
          type="text"
          theme="yellow"
          value={firstName}
          onChange={handleFirstNameChange}
          onBlur={validateFields}
        />
      </div>
      {firstNameError && <Prompt>{firstNameError}</Prompt>}
      <div className="h-8 mb-12 ">
        <Textbox
          label="Last Name"
          type="text"
          theme="yellow"
          value={lastName}
          onChange={handleLastNameChange}
          onBlur={validateFields}
        />
      </div>
      {lastNameError && <Prompt>{lastNameError}</Prompt>}
      <div className="h-8 mb-12 ">
        <Textbox
          label="Email"
          type="email"
          theme="yellow"
          value={email}
          onChange={handleEmailChange}
          onBlur={validateFields}
        />
      </div>
      {emailError && <Prompt>{emailError}</Prompt>}
      <div className="flex h-8 mb-12 justify-between">
        <Link href={"/auth/signin"} legacyBehavior>
          <a className="font-bold text-primary-yellow">
            Already have an account?
          </a>
        </Link>

        {!formIsValid && <BtnDisabled>Next</BtnDisabled>}

        {formIsValid && <BtnYellow type="submit" onClick={handleClickToNextForm}>
          Next
        </BtnYellow>}
      </div>
    </FormContainer>
  );
};

export default Form_Basic_Information;
