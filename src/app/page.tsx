"use client";

import { StepFour } from "@/_component/StepFour";
import { StepOne } from "@/_component/StepOne";
import { StepThree } from "@/_component/StepThree";
import { StepTwo } from "@/_component/StepTwo";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState<number>(1);

  const handleClickNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleClickBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-zinc-50 w-screen h-screen items-center justify-center flex">
      {step === 1 && <StepOne handleClickNext={handleClickNext} />}
      {step === 2 && (
        <StepTwo
          handleClickNext={handleClickNext}
          handleClickBack={handleClickBack}
          step={step}
        />
      )}
      {step === 3 && (
        <StepThree
          handleClickNext={handleClickNext}
          handleClickBack={handleClickBack}
          step={step}
        />
      )}
      {step === 4 && <StepFour />}
    </div>
  );
}
