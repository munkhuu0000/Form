"use client";

import { StepOne } from "@/_component/StepOne";
import { StepTwo } from "@/_component/StepTwo";

export default function Home() {
  return (
    <div className="bg-zinc-50 w-screen h-screen items-center justify-center flex">
      <StepOne />
      <StepTwo />
    </div>
  );
}
