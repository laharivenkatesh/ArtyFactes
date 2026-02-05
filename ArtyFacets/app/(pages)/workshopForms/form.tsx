"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { Button } from "@/app/ui/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/ui/components/ui/form"

import { toast } from "@/app/ui/components/ui/use-toast"
import { Input } from "@/app/ui/components/ui/input"
import clsx from "clsx"
import { JoinWorkshop } from "@/app/lib/workshop"

const phoneRegex = /^\d{10}$/;

const FormSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(100, { message: "Name cannot exceed 100 characters" })
        .trim(),
    phone: z.string()
        .regex(phoneRegex, { message: "Please enter a valid 10-digit phone number" }),
    email: z.string()
        .email({ message: "Please enter a valid email address" })
        .trim()
        .toLowerCase(),
})

export function JoinForm({ workshop }: { workshop: string }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsSubmitting(true);
        try {
            await JoinWorkshop(workshop, data);
            toast({
                title: "Success!",
                description: (
                    <div className="mt-2 border-l-2 border-green-400 rounded-md p-4">
                        You have successfully registered for the workshop.
                    </div>
                ),
            });
            form.reset();
        } catch (error) {
            toast({
                title: "Registration Failed",
                description: "There was an error submitting your registration. Please try again.",
                variant: "destructive",
            });
            console.error("Workshop registration error:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="rounded-xl mt-5">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={clsx("w-full space-y-6 rounded-xl border-2 border-black p-4 shadow-sm")}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className={clsx("w-full px-2")}>
                                <FormLabel className="font-bold text-xl">Student Name: </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your name"
                                        autoComplete="name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col sm:flex-row w-full gap-4">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className={clsx("w-full sm:w-1/2 px-2")}>
                                    <FormLabel className="font-bold text-xl">Phone: </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            placeholder="Phone Number"
                                            autoComplete="tel"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className={clsx("w-full sm:w-1/2 px-2")}>
                                    <FormLabel className="font-bold text-xl">Email ID: </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your Email"
                                            autoComplete="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button 
                        type="submit" 
                        className="mx-3"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}
