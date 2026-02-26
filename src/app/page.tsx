"use client";

import { StepFour } from "@/_component/StepFour";
import { StepOne } from "@/_component/StepOne";
import { StepThree } from "@/_component/StepThree";
import { StepTwo } from "@/_component/StepTwo";
import { Direction } from "radix-ui";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [direction, setDirection] = useState<number>(0);
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

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const handleClickNext = () => {
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleClickBack = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="bg-zinc-50 w-screen h-screen items-center justify-center flex overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="w-full flex justify-center"
        >
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
