import React, { useState, ChangeEvent } from "react";
import FormContainer from "../formContainer";
import Textbox from "../Inputs/textbox";
import { Button as BtnYellow } from "../Inputs/button";
import { InputFieldInvalidPrompt as Prompt } from "../UI/prompt";
import { Button_Disabled as BtnDisabled } from "../Inputs/button";
import { useRouter } from "next/router";

interface UserCredentials {
  username: string;
}

export const Form_Username_Password: React.FC<{
  userCredentials: UserCredentials;
  goToNext: () => void;
  goToPrevious: () => void;
  handleFormData: (data: any) => void;
}> = ({ userCredentials, goToNext, goToPrevious, handleFormData }) => {
  const [username, setUsername] = useState(userCredentials.username);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

  const route = useRouter()

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameValid(!!e.target.value.trim());
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordValid(!!e.target.value.trim());
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordValid(!!e.target.value.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    // const isUsernameValid = !!username.trim();
    // const isPasswordValid = !!password.trim();
    // const isConfirmPasswordValid = !!confirmPassword.trim();

    // setUsernameValid(isUsernameValid);
    // setPasswordValid(isPasswordValid);
    // setConfirmPasswordValid(isConfirmPasswordValid);

    // if (isUsernameValid && isPasswordValid && isConfirmPasswordValid) {
    //   const formData = {
    //     username,
    //     password,
    //     confirmPassword,
    //   };

    //   handleFormData(formData);
    //   goToNext();
    // }
    route.push("/auth/user1234490rjfdfjf3ojlkdsf/dashboard/")
  };

  const handleClickToPreviousForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const formData = {
      username,
    };

    handleFormData(formData);

    goToPrevious();
  };

  const formIsValid = usernameValid && passwordValid && confirmPasswordValid;

  return (
    <FormContainer className="w-1/2 p-4 h-min flex flex-col box-border rounded-lg shadow-2xl bg-primary-black">
      <h2 className="w-full text-white font-bold">User Information</h2>
      
        <div className="h-8 mt-12 mb-12">
          <Textbox
            label="Username"
            type="text"
            theme="yellow"
            value={username}
            onChange={handleUsernameChange}
            onBlur={() => setUsernameValid(!!username.trim())}
          />
        </div>
          {!usernameValid && <Prompt>Username is required.</Prompt>}
        <div className="h-8 mb-12">
          <Textbox
            label="Password"
            type="password"
            theme="yellow"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => setPasswordValid(!!password.trim())}
          />
        </div>
          {!passwordValid && <Prompt>Password is required.</Prompt>}
        <div className="h-8 mb-12">
          <Textbox
            label="Confirm Password"
            type="password"
            theme="yellow"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={() => setConfirmPasswordValid(!!confirmPassword.trim())}
          />
        </div>
          {!confirmPasswordValid && (
            <Prompt>Confirm Password is required.</Prompt>
          )}

      <div className="flex h-8 mb-4 justify-between">
        <BtnYellow type="submit" onClick={handleClickToPreviousForm}>
          Previous
        </BtnYellow>
        {formIsValid ? (
          <BtnYellow type="submit" onClick={handleSubmit}>
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

export default Form_Username_Password;
