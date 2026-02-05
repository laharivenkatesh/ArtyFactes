"use client"
import { marked } from "marked";
import MailsPage from "./load";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/app/ui/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/ui/components/ui/form"
import { Textarea } from "@/app/ui/components/ui/textarea"
import { toast } from "@/app/ui/components/ui/use-toast"
import { Input } from "@/app/ui/components/ui/input";
import { SendMailsToUsers } from "@/app/lib/mails";

const FormSchema = z.object({
    subject: z
        .string()
        .max(160, {
            message: "Subject must not be longer than 30 characters.",
        }),
    message: z.string(),
    image: z.string().url({ message: "Image must be a valid URL." })
})


export default function MailPage() {
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [image, setImage] = useState("")

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { message: "", subject: "", image: "" },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        await SendMailsToUsers(data)
        toast({
            description: (
                <pre className="mt-2 w-[340px] rounded-md border-l-2 border-green-400 p-4">
                    The mails have been sent successfully!
                </pre>
            ),
        })
    }


    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Email Campaign</h1>
                        <p className="text-gray-600 text-lg">Send emails to all your students</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white border-2 border-blue-200 rounded-xl shadow-lg p-8 sticky top-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded"></div>
                                    <h2 className="text-2xl font-bold text-gray-900">Compose Email</h2>
                                </div>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-semibold">Subject Line</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            onChangeCapture={(e) => setSubject(e.currentTarget.value)}
                                                            placeholder="Enter email subject..."
                                                            {...field}
                                                            className="border-2 border-blue-200 focus:border-blue-500"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="image"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-semibold">Image URL</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            onChangeCapture={(e) => setImage(e.currentTarget.value)}
                                                            placeholder="https://example.com/image.jpg"
                                                            {...field}
                                                            className="border-2 border-blue-200 focus:border-blue-500"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="font-semibold">Message</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            onChangeCapture={(e) => setMessage(e.currentTarget.value)}
                                                            placeholder="Write your email message here... (Markdown supported)"
                                                            {...field}
                                                            className="border-2 border-blue-200 focus:border-blue-500 min-h-32"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl">
                                            Send Email Campaign
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                        <div className="lg:col-span-3">
                            <div className="bg-white border-2 border-blue-200 rounded-xl shadow-lg p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded"></div>
                                    <h2 className="text-2xl font-bold text-gray-900">Email Preview</h2>
                                </div>
                                <MailsPage data={{ subject, message: marked(message, { breaks: true }), image: image }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}