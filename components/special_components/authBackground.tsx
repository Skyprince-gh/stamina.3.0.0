import React, { Fragment } from "react";
import Image from "next/image";

const AuthBackground: React.FC<{currentStep:number}> = ({currentStep}) => {
  return (
    <Fragment>
    <div className="flex w-screen h-screen absolute top-0 left-0 bg-red-500 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/login_background.jpeg')" }}>
      <div className="bg-white w-1/2 h-screen rounded-tr-[5rem] relative">
        <div className="absolute h-1/6 w-full left-40 bottom-0 bg-white"></div>
      </div>
      <div className="bg-transparent text-red-400 w-1/2 h-screen z-10 rounded-bl-[5rem] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/login_background.jpeg')" }}></div>
    </div>
    </Fragment>
  );
};

export default AuthBackground;
