"use client";

import { Image } from "lucide-react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { data } from "@/app/page";
import { Dispatch, SetStateAction } from "react";

const formSchema = z?.object({
  dateOfBirth: z.date({ error: "Invalid date." }),
  profileImage: z.instanceof(File, { message: "Invalid file." }),
});

type formSchemaType = z.infer<typeof formSchema>;
type typeOfProps = {
  step: number;
  handleClickBack: () => void;
  handleClickNext: () => void;
  data: data;
  setData: Dispatch<SetStateAction<data>>;
};

export function StepThree(props: typeOfProps) {
  const { handleClickBack, handleClickNext, step, data, setData } = props;
  const [open, setOpen] = useState(false);
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateOfBirth: data.dateOfBirth ?? undefined,
      profileImage: data.profileImage ?? undefined,
    },
  });
  const onSubmit = (values: formSchemaType) => {
    setData((prev) => ({
      ...prev,
      dateOfBirth: values.dateOfBirth,
      profileImage: values.profileImage,
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
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Date of birth<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="date"
                            className="w-full justify-between font-normal"
                          >
                            {field.value
                              ? field.value.toLocaleDateString()
                              : "--/--/--"}
                            <CalendarDays />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <PopoverHeader>
                            <PopoverTitle></PopoverTitle>
                            <PopoverDescription></PopoverDescription>
                          </PopoverHeader>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setOpen(false);
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="w-full h-full"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Profile image<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative w-full h-20">
                        <Input
                          type="file"
                          accept="image/*"
                          className="absolute bg-red-500 w-full h-full top-0 left-0 opacity-0 z-10 cursor-pointer"
                          placeholder="Your profile image."
                          ref={field.ref}
                          onChange={(e) => {
                            const files = e.target.files;
                            if (!files) return;
                            const [file] = files;
                            field.onChange(file);
                          }}
                        />
                        {field.value ? (
                          <div className="absolute w-full h-full top-0 left-0 rounded-xl overflow-hidden">
                            <img
                              src={URL.createObjectURL(field.value)}
                              alt="profile"
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="bg-gray-100 w-full h-full rounded-2xl flex justify-center items-center">
                            <Image className="text-gray-500 w-10 h-10" />
                          </div>
                        )}
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
  );
}
