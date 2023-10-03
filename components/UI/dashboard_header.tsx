import Image from "next/image";
import React, { useState } from "react";

export const Dashoboard_Header: React.FC<{ storeTitle: string; pageTitle: string }> = (props) => {
  return (
    <div className="fixed h-16 w-[86.5%] z-10 top-0 left-0 bg-white flex items-center">
      {/* Title Section */}
      <div className="h-full flex items-center pl-4 w-1/12 ">
        <Image src="/svg/logo.svg" alt="logo" width={100} height={100} />
      </div>
      <div className=" flex w-8/12 pl-10 items-center h-full  font-bold">
        <h1>{props.storeTitle}</h1>
      </div>
      <div className="w-4/12 h-full flex items-center justify-end pr-6 font-bold">
        <h2 className="border-b-4 border-primary-yellow">{props.pageTitle}</h2>
      </div>
    </div>
  );
};

export default Dashoboard_Header;
