import BKG from "../../components/special_components/authBackground";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Form_Basic_Information as Form1 } from "../../components/Forms/Form_Basic_Information";
import {Form_Business_Information as Form2} from "../../components/Forms/Form_Business_Information"
import {Form_Username_Password as Form3} from "../../components/Forms/Form_Username_Password"
import { Timestamp } from "firebase/firestore";
import userCredentials from "../../Interfaces/userCredentials";
import { SegmentedProgressBar as Bar } from "../../components/UI/segmentedProgressBar";

const Signup = () => {
  const credentials: userCredentials = {
    address1: "",
    address2: "",
    businessDescription: "",
    businessName: "",
    state: "",
    email: "",
    firstName: "",
    activeTier: "",
    lastName: "",
    phoneNumber1: 1,
    phoneNumber2: 1,
    userName: "",
    zipCode: 123,
    storeID: "",
    timeStamp: Timestamp.fromDate(new Date()),
  };
  const [currentStep, setCurrentStep] = useState(1);

  const [userCredentials, setUserCredentials] = useState(credentials);

  const goToNext = () => {
    //takes you to the next form
    setCurrentStep(currentStep + 1);
  };

  //takes you to the previous form
  const goToPrev = () => {
    setCurrentStep(currentStep - 1);
    console.log("go to previous")
  };

  const handleFormData = (data: any) => {
    setUserCredentials({ ...userCredentials, ...data });
    console.log({ ...userCredentials, ...data });
    if (currentStep === 4) {
      console.log("userCredentials:", { ...userCredentials, ...data });
    }
  };

  return (
    <div className="relative">
      <BKG currentStep={currentStep} />
      <div className="flex absolute top-0 left-0 h-full w-full z-20">
        <div className=" bg-transparent w-1/2 h-screen flex flex-col">
          {/* left transparent background */}
          <div className="w-full flex p-6 justify-start h-2">
            {/* left logo area */}
            <div>
              <Image src="/svg/logo.svg" alt="logo" width={100} height={100} />
            </div>
          </div>
          <div className="flex justify-center flex-col items-center h-4/5 ">
            <Bar
              className="w-[150px] mb-4 animate-fade-in-top"
              segments={4}
              currentStep={currentStep}
              color="primary-yellow"
            />
            {currentStep == 1 && <Form1
              credentials={{
                firstName: userCredentials.firstName,
                lastName: userCredentials.lastName,
                email: userCredentials.email,
              }}
              goToNext={goToNext}
              handleFormData={handleFormData}
              animation={`animate-fade-in-top`}
            />}
            {
              currentStep == 2 && <Form2 userCredentials={ {
                businessName: userCredentials.businessName,
                address1: userCredentials.address1,
                address2: userCredentials.address2,
                phoneNumber1: userCredentials.phoneNumber1,
                phoneNumber2: userCredentials.phoneNumber2,
                state: userCredentials.state,
                businessDescription: userCredentials.businessDescription
              }}
              goToNext={goToNext}
              goToPrevious={goToPrev}
              handleFormData={handleFormData}
              />
            }
            {
              currentStep == 3 && <Form3 userCredentials={ { username: userCredentials.userName
                
              }}
              goToNext={goToNext}
              goToPrevious={goToPrev}
              handleFormData={handleFormData}
              />
            }

          </div>
          <div className="h-auto flex w-1/3 flex-grow self-center font-bold justify-between items-end pb-12">
            <Link href={"/end-user/terms-of-use"}>Terms of Use</Link>
            <Link href={"/end-user/privacy-and-cookies"}>
              Privacy & Cookies
            </Link>
          </div>
        </div>
        { currentStep !== 4 &&<div className="w-1/2 h-screen mx-auto flex flex-col items-start justify-center bg-transparent pl-10">
          <p className="mb-12 text-gray-200 text-8xl animate-fade-in-right">
            Grow.
          </p>
          <p className="mb-12 text-primary-yellow text-8xl animate-fade-in-right bold">
            Organize.
          </p>
          <p className="mb-12 text-gray-200 text-8xl animate-fade-in-right">
            Get Things Done.
          </p>
        </div>}
      </div>
    </div>
  );
};

export default Signup;
