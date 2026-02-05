"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import clsx from "clsx"
import Link from "next/link"

import { Button } from "@/app/ui/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/ui/components/ui/form"
import { toast } from "@/app/ui/components/ui/use-toast"
import { Input } from "@/app/ui/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/app/ui/components/ui/radio-group"
import { Checkbox } from "@/app/ui/components/ui/checkbox"
import { EditStudent, JoinReq } from "@/app/lib/students"
import { Student } from "../(admin)/dashboard/students/table/columns"
import { Loader2 } from "lucide-react"

const COURSES = [
    { id: "Kathak", label: "Kathak" },
    { id: "Bollywood", label: "Bollywood Style Dance" },
    { id: "Bharathnatayam", label: "Bharathnatayam" },
    { id: "Vocal Music - C", label: "Vocal Music (Carnatic)" },
    { id: "Vocal Music - H", label: "Vocal Music (Hindustani)" },
    { id: "Fine Arts", label: "Fine Arts" },
    { id: "Guitar", label: "Guitar" },
    { id: "Keyboard", label: "Keyboard" },
    { id: "Tabla", label: "Tabla" },
    { id: "Flute", label: "Flute" },
    { id: "Yoga", label: "Yoga" },
] as const

type CourseType = typeof COURSES[number]['id']

const REFERRAL_SOURCES = [
    { value: "news", label: "News Paper Pamphlet" },
    { value: "social", label: "Social Media" },
    { value: "smone", label: "Through Someone" },
    { value: "board", label: "Board Outside" },
    { value: "mail", label: "Mail" },
] as const

const FormSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }).max(100, { message: "Name cannot exceed 100 characters" }),
    address: z.string().min(1, { message: "Address is required" }),
    dob: z.string({ required_error: "Date of birth is required" }),
    phone: z.string().min(10, { message: "Phone number must be 10 digits" }).max(10, { message: "Phone number must be 10 digits" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    occupation: z.string().max(50, { message: "Occupation cannot exceed 50 characters" }),
    courses: z.array(z.string()).refine((value) => value.length > 0, {
        message: "Please select at least one course",
    }),
    known: z.enum(["news", "social", "smone", "board", "mail", ""], {
        required_error: "Please select how you heard about us",
    }),
    date: z.string(),
    _id: z.string(),
    terms: z.boolean().refine((value) => value === true, {
        message: "You must accept the terms and conditions to proceed",
    }),
})

type FormValues = z.infer<typeof FormSchema>

export function JoinForm({ edit }: { edit?: Student }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: edit?.name || "",
            address: edit?.address || "",
            dob: edit ? new Date(edit.dob).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            phone: edit?.phone || "",
            email: edit?.email || "",
            occupation: edit?.occupation || "",
            courses: edit?.courses || ["Kathak"],
            known: "news",
            date: edit?.date || new Date().toISOString(),
            _id: edit?._id || "",
            terms: false,
        },
        mode: "onBlur",
    })

    async function onSubmit(data: FormValues) {
        try {
            setIsSubmitting(true);

            if (edit) {
                await EditStudent(data);
                toast({
                    title: "Student information updated successfully",
                    description: "The student record has been updated in the system.",
                    variant: "default",
                })
            } else {
                await JoinReq(data);
                toast({
                    title: "Registration Successful",
                    description: "Thank you for registering with Arty Facets. We'll be in touch soon!",
                    variant: "default",
                })
                form.reset();
            }
        } catch (error) {
            console.error("Form submission error:", error);
            toast({
                title: "Submission Error",
                description: "There was a problem submitting your form. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="w-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={clsx(
                        "w-full space-y-8 p-6 md:p-8 rounded-xl",
                        { "bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-indigo-200": !edit },
                        { "bg-white border border-gray-200": edit },
                        { "opacity-60 pointer-events-none": isSubmitting }
                    )}
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-gray-700">Student Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your full name"
                                            {...field}
                                            className="border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg h-11 transition-all"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-gray-700">Date of Birth *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="DD/MM/YYYY or use calendar"
                                            {...field}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                field.onChange(value);
                                                
                                                // Parse typed date in DD/MM/YYYY format
                                                if (value && value.includes('/')) {
                                                    const [day, month, year] = value.split('/');
                                                    if (day && month && year && day.length === 2 && month.length === 2 && year.length === 4) {
                                                        const date = new Date(`${year}-${month}-${day}`);
                                                        if (!isNaN(date.getTime())) {
                                                            field.onChange(date.toISOString().split('T')[0]);
                                                        }
                                                    }
                                                }
                                            }}
                                            onFocus={(e) => {
                                                e.currentTarget.type = "date";
                                            }}
                                            onBlur={(e) => {
                                                e.currentTarget.type = "text";
                                            }}
                                            className="border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg h-11 transition-all"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-gray-700">Phone Number *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            placeholder="10-digit phone number"
                                            {...field}
                                            className="border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg h-11 transition-all"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-gray-700">Email Address *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="your.email@example.com"
                                            {...field}
                                            className="border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg h-11 transition-all"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel className="font-semibold text-gray-700">Address *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your complete address"
                                            className="border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg h-11 transition-all resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="occupation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-gray-700">Occupation</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your current occupation"
                                            {...field}
                                            className="border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg h-11 transition-all"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="border-t-2 border-gray-300 pt-8 mt-8">
                        <FormField
                            control={form.control}
                            name="courses"
                            render={() => (
                                <FormItem className="space-y-4">
                                    <div>
                                        <FormLabel className="font-semibold text-lg text-gray-900">Select Courses *</FormLabel>
                                        <FormDescription className="font-medium text-base text-gray-600 mt-2">
                                            Select one or more courses you would like to enroll in
                                        </FormDescription>
                                    </div>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 pt-3">
                                        {COURSES.map((course) => (
                                            <FormField
                                                key={course.id}
                                                control={form.control}
                                                name="courses"
                                                render={({ field }) => (
                                                    <FormItem className="flex items-center space-x-3 space-y-0 p-3 bg-white border-2 border-gray-200 hover:border-indigo-400 rounded-lg transition-all cursor-pointer">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(course.id)}
                                                                onCheckedChange={(checked) => {
                                                                    const updatedValue = checked
                                                                        ? [...field.value, course.id]
                                                                        : field.value.filter(
                                                                            (value) => value !== course.id
                                                                        );
                                                                    field.onChange(updatedValue);
                                                                }}
                                                                className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-medium text-gray-700 cursor-pointer flex-1">
                                                            {course.label}
                                                        </FormLabel>
                                                    </FormItem>
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="known"
                        render={({ field }) => (
                            <FormItem className="space-y-4">
                                <FormLabel className="text-lg font-semibold text-gray-900">How did you hear about Arty Facets? *</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-3"
                                    >
                                        {REFERRAL_SOURCES.map((source) => (
                                            <FormItem key={source.value} className="flex items-center space-x-2 space-y-0 p-3 bg-white border-2 border-gray-200 hover:border-indigo-400 rounded-lg transition-all cursor-pointer">
                                                <FormControl>
                                                    <RadioGroupItem value={source.value} className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                                                </FormControl>
                                                <FormLabel className="font-medium text-gray-700 cursor-pointer text-sm">{source.label}</FormLabel>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage className="text-red-600" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem className="flex items-start space-x-3 space-y-0 p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 mt-1"
                                    />
                                </FormControl>
                                <div className="space-y-2 flex-1">
                                    <FormLabel className="font-medium text-gray-900">
                                        I agree to the{" "}
                                        <Link
                                            href="/terms-and-conditions"
                                            className="text-indigo-600 underline underline-offset-2 hover:text-indigo-700 font-semibold"
                                        >
                                            Terms and Conditions
                                        </Link>
                                    </FormLabel>
                                    <FormDescription className="text-sm text-gray-600">
                                        By checking this box, you agree to our terms of service and privacy policy.
                                    </FormDescription>
                                    <FormMessage className="text-red-600" />
                                </div>
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold text-lg rounded-lg transition-all shadow-lg hover:shadow-xl flex-1"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    <span>{edit ? "Updating..." : "Submitting..."}</span>
                                </>
                            ) : (
                                <span>{edit ? "Update Student" : "Submit Registration"}</span>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
