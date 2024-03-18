"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";

export default function EmailInput() {
  const params = useSearchParams();
  const callbackUrl = params?.get("callbackUrl");

  const formSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSend = async (values: z.infer<typeof formSchema>) => {
    // signIn("resend", { email: values.email, callbackUrl: callbackUrl ?? "/" });
  };
  return (
    <div className="grid w-full items-center gap-1.5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSend)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@mail.pl"
                    type="email"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-2">
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
}
