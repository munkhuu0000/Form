"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { data } from "@/app/page";
import { Dispatch, SetStateAction } from "react";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const formSchema = z
  ?.object({
    Email: z.email("Invalid email address"),
    Phonenumber: z.string().regex(/^\+?\d{8}$/, "Invalid phone number."),
    Password: z
      .string()
      .regex(
        passwordRegex,
        "Weak password. Use numbers, symbols, lowercase letters and uppercase letters.",
      ),
    Confirmpassword: z.string(),
  })
  .refine((data) => data.Password === data.Confirmpassword, {
    message: "Those password did’t match, Try again",
    path: ["Confirmpassword"],
  });

type formSchemaType = z.infer<typeof formSchema>;
type typeOfProps = {
  step: number;
  handleClickBack: () => void;
  handleClickNext: () => void;
  data: data;
  setData: Dispatch<SetStateAction<data>>;
};

export function StepTwo(props: typeOfProps) {
  const { step, handleClickBack, handleClickNext, data, setData } = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: data.Email,
      Phonenumber: data.Phonenumber,
      Password: data.Password,
      Confirmpassword: data.Confirmpassword,
    },
  });
  const toggleVisibility = (): void => {
    setIsVisible((prev) => !prev);
  };

  const onSubmit = (values: formSchemaType) => {
    setData((prev) => ({
      ...prev,
      Email: values.Email,
      Phonenumber: values.Phonenumber,
      Password: values.Password,
      Confirmpassword: values.Confirmpassword,
    }));
    handleClickNext();
    console.log(values);
  };

  return (
    <div className="bg-zinc-50 w-screen h-screen items-center justify-center flex">
      <div className="flex h-min-[655px] w-[480px] items-center flex-col font-sans bg-[#FFFFFF] p-8">
        <div className="w-[416px] h-min-[155px] flex flex-col gap-2">
          <img src="/logo.png" alt="" className="w-15 h-15" />
          <p className="text-[26px] font-semibold drop-shadow-lg">
            Join Us! 😎
          </p>
          <p className="text-[18px] font-normal drop-shadow-lg text-[#8E8E8E]">
            Please provide all current information accurately.
          </p>
        </div>
        <div className="w-[416px] h-min-[228px] flex flex-col gap-2">
          <div>
            <Form {...form}>
              <form
                className="space-y-3"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="Email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Phonenumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Phonenumber<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your phonenumber" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Password<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-row justify-between relative">
                          <Input
                            type={isVisible ? "text" : "password"}
                            placeholder="Your password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={toggleVisibility}
                            className="absolute right-0"
                          >
                            {isVisible ? <Eye /> : <EyeOff />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Confirmpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Confirm Password<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex flex-row justify-between relative">
                          <Input
                            type={isVisible ? "text" : "password"}
                            placeholder="Confirm your password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={toggleVisibility}
                            className="absolute right-0"
                          >
                            {isVisible ? <Eye /> : <EyeOff />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-3">
                  <Button type="button" onClick={handleClickBack}>
                    Back
                  </Button>
                  <Button type="submit">Continue {step}/3</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
