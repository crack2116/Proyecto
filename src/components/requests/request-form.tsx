"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  pickup: z.string().min(1, "Pickup location is required"),
  destination: z.string().min(1, "Destination is required"),
  date: z.date({ required_error: "A date is required." }),
  time: z.string().min(1, "Time is required"),
  specialRequirements: z.string().optional(),
});

export function RequestForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickup: "",
      destination: "",
      time: "",
      specialRequirements: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Request Submitted",
      description: "Your new service request has been created successfully.",
    });
    // Here you would typically close the dialog and refresh data
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="pickup"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Pickup Location</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., 123 Main St, Piura" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Destination</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., 456 Market Ave, Sullana" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                    <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
            control={form.control}
            name="specialRequirements"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Special Requirements</FormLabel>
                <FormControl>
                    <Textarea placeholder="e.g., Fragile items, requires refrigeration" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4">
          Submit Request
        </Button>
      </form>
    </Form>
  );
}
