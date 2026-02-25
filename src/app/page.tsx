"use client";

import { StepFour } from "@/_component/StepFour";
import { StepOne } from "@/_component/StepOne";
import { StepThree } from "@/_component/StepThree";
import { StepTwo } from "@/_component/StepTwo";
import { useState } from "react";

export type data = {
  Firstname: string;
  Lastname: string;
  Username: string;
  Email: string;
  Phonenumber: string;
  Password: string;
  Confirmpassword: string;
  dateOfBirth: Date | null;
  profileImage: File | null;
};

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<data>({
    Firstname: "",
    Lastname: "",
    Username: "",
    Email: "",
    Phonenumber: "",
    Password: "",
    Confirmpassword: "",
    dateOfBirth: null,
    profileImage: null,
  });

  const handleClickNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleClickBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-zinc-50 w-screen h-screen items-center justify-center flex">
      {step === 1 && (
        <StepOne
          handleClickNext={handleClickNext}
          data={data}
          setData={setData}
          step={step}
        />
      )}
      {step === 2 && (
        <StepTwo
          handleClickNext={handleClickNext}
          handleClickBack={handleClickBack}
          step={step}
          data={data}
          setData={setData}
        />
      )}
      {step === 3 && (
        <StepThree
          handleClickNext={handleClickNext}
          handleClickBack={handleClickBack}
          step={step}
          data={data}
          setData={setData}
        />
      )}
      {step === 4 && <StepFour />}
    </div>
  );
}
