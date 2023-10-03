import React, { useState, ChangeEvent, useEffect } from "react";
import BKG from "../../components/special_components/authBackground";
import FormContainer from "../../components/formContainer";
import Textbox from "../../components/Inputs/textbox";
import Link from "next/link";
import {
  Button as BtnYellow,
  Button_Disabled as BtnDisabled,
} from "../../components/Inputs/button";
import Image from "next/image";
import regex from "../../util/regex";
import { InputFieldInvalidPrompt as Prompt } from "../../components/UI/prompt";

interface SigninProps {
  previousRoute: string;
}

const Signin: React.FC<SigninProps> = ({ previousRoute }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [animationClass, setAnimationClass] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const validateFields = () => {
    if (!regex.email.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }

    if (!regex.password.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission and post requests
  };

  useEffect(() => {
    // Set the animation class based on the previous route
    if (previousRoute === "/auth/signup") {
      setAnimationClass("animate-fade-in-left");
    } else {
      setAnimationClass("animate-fade-in-top");
    }
  }, [previousRoute]);

  return (
    <div className="relative">
      <BKG />
      <div className="absolute top-0 left-0 z-20 h-full w-full flex">
        <div className="w-1/2 h-screen flex flex-col bg-transparent">
          <div className="p-6 h-2 w-full flex justify-start">
            <div>
              <Image src="/svg/logo.svg" alt="logo" width={100} height={100} />
            </div>
          </div>
          <div
            className={`justify-center items-center h-4/5 flex ${animationClass}`}
          >
            <FormContainer
              className="w-1/2 p-4 bg-primary-black rounded-lg h-min flex flex-col shadow-2xl"
              onSubmit={handleSubmit}
            >
              <h2 className="w-full font-bold text-white">Signin</h2>
              <div className="mt-12 mb-12 h-8">
                <Textbox
                  label="Email"
                  type="email"
                  theme="yellow"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={validateFields}
                />
              </div>
              {emailError && (
                <Prompt className="expanded -translate-y-8 text-white border-2 border-primary-red rounded-lg">
                  {emailError}
                </Prompt>
              )}
              <div className="mb-12 h-8">
                <Textbox
                  label="Password"
                  type="password"
                  theme="yellow"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={validateFields}
                />
              </div>
              {passwordError && (
                <Prompt className="expanded -translate-y-8 text-white border-2 border-primary-red rounded-lg">
                  {passwordError}
                </Prompt>
              )}

              <div className="mb-12 h-8 flex justify-between">
                <Link href={"/auth/resetPassword"} legacyBehavior>
                  <a className="font-bold text-primary-yellow">
                    Forgot password?
                  </a>
                </Link>
                {emailError || passwordError ? (
                  <BtnDisabled>Login</BtnDisabled>
                ) : (
                  <BtnYellow type="submit">Login</BtnYellow>
                )}
              </div>
              <Link href="/auth/signup" legacyBehavior>
                <a className="mb-12 h-8 flex justify-center items-center font-bold text-primary-yellow">
                  Don't have an account
                </a>
              </Link>
            </FormContainer>
          </div>
          <div className="flex flex-grow self-center w-1/3 h-auto pb-12 justify-between items-end font-bold">
            <Link href={"/end-user/terms-of-use"}>Terms of Use</Link>
            <Link href={"/end-user/privacy-and-cookies"}>
              Privacy & Cookies
            </Link>
          </div>
        </div>
        <div className="w-1/2 h-screen mx-auto flex flex-col items-start justify-center bg-transparent pl-10">
          <p className="mb-12 text-gray-200 text-8xl animate-fade-in-right">
            Grow.
          </p>
          <p className="mb-12 text-primary-yellow text-8xl animate-fade-in-right bold">
            Organize.
          </p>
          <p className="mb-12 text-gray-200 text-8xl animate-fade-in-right">
            Get Things Done.
          </p>
        </div>
      </div>
    </div>
  );
};

// export async function getServerSideProps(context:any) {
//   const { req } = context;
//   const prevRoute = req.headers.referer || "";
//   const previousRoute= new URL(prevRoute).pathname
//   console.log("previousRoute:", previousRoute)
//   return {
//     props: {
//       previousRoute,
//     },
//   };
// }

export default Signin;
