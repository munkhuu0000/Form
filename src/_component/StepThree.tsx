"use client";

type typeOfProps = {
  step: number;
  handleClickBack: () => void;
  handleClickNext: () => void;
};

export function StepThree(props: typeOfProps) {
  const { handleClickBack, handleClickNext, step } = props;
  return (
    <div className="bg-zinc-50 w-screen h-min-[655px] items-center justify-center flex"></div>
  );
}
