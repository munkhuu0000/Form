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

export function StepTwo() {
  const formSchema = z?.object({
    Email: z
      .string()
      .min(2, "Must have more than 2 characters")
      .max(10, "Must have less than 10 characters")
      .regex(/^[a-zA-Z]+$/, "Can't contain special characters and numbers"),
    Phonenumber: z
      .string()
      .min(2, "Must have more than 2 characters")
      .max(10, "Must have less than 10 characters")
      .regex(/^[a-zA-Z]+$/, "Can't contain special characters and numbers"),
    Password: z
      .string()
      .min(2, "Must have more than 2 characters")
      .max(10, "Must have less than 10 characters")
      .trim(),
    ConfirmPasswordPassword: z
      .string()
      .min(2, "Must have more than 2 characters")
      .max(10, "Must have less than 10 characters")
      .trim(),
  });

  type formSchemaType = z.infer<typeof formSchema>;

  const form =
    useForm <
    formSchemaType >
    {
      resolver: zodResolver(formSchema),
      defaultValues: {
        Email: "",
        Phonenumber: "",
        Password: "",
        ConfirmPassword: "",
      },
    };

  const onSubmit = (values: formSchemaType) => {
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
                  name="Firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your firstname" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Lastname<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your lastname" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Username<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Your username" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Continue 1/3</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
