"use client";

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

const formSchema = z?.object({
  dateOfBirth: z.date("Invalid date."),
  profileImage: z.file("Invalid picture."),
});

type formSchemaType = z.infer<typeof formSchema>;
type typeOfProps = {
  step: number;
  handleClickBack: () => void;
  handleClickNext: () => void;
};

export function StepThree(props: typeOfProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [open, setOpen] = useState(false);
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const onSubmit = (values: formSchemaType) => {
    handleClickNext();
    console.log(values);
  };
  const { handleClickBack, handleClickNext, step } = props;
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
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Date of birth<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Popover>
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
                              selected={date}
                              onSelect={setDate}
                              className="rounded-lg border"
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
                        <Input placeholder="Your profile image." {...field} />
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
