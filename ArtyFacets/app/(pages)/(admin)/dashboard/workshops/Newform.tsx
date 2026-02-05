"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { any, z } from "zod"
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
import { Textarea } from "@/app/ui/components/ui/textarea"
import { toast } from "@/app/ui/components/ui/use-toast"
import { useState } from "react"
import { marked } from "marked"
import { Input } from "@/app/ui/components/ui/input"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { cn } from "@/app/ui/utility"
import { Calendar } from "@/app/ui/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/ui/components/ui/popover"
import { EditWorkshop, PostWorkshop } from "@/app/lib/workshop"

const FormSchema = z.object({
    markdown: z.string().min(10, { message: "Bio must be at least 10 characters." }),
    title: z.string().min(5, {message:"Title must be at least 5 characters."}),
    mainImg: z.string().url({message: "Not a valid Image Link."}),
    date: z.any(),
    _id: z.string(),
    enrolled: z.array(z.any())
})

export default function TextareaForm({ Edit }: { Edit?: {_id: string, title: "",markdown: "",mainImg: "",enrolled: any[], date: {to: any, from: any}}}) {
    const [markdown, setMarkdown] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(Edit?.date?.from || Date.now()),
        to: addDays(new Date(Date.now()), 2),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues:{
            title: Edit?.title || "",
            markdown: Edit?.markdown || "",
            mainImg: Edit?.mainImg || "",
            _id: Edit?._id || "",
            enrolled: Edit?.enrolled || []
        }
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        data.date = date
        if(Edit) {
            data._id = Edit._id
            await EditWorkshop(data)
            toast({
                title: "The Workshop details have been set to:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),
            })
        } else {
            await PostWorkshop(data)
            toast({
                description: (
                    <pre className="mt-2 w-[340px] rounded-md border-l-2 border-green-400 p-4">
                        New Workshop Created!
                    </pre>
                ),
            })
        }
    }

    return (
        <div className="flex lg:flex-row-reverse flex-col-reverse lg:justify-around">
            <div className="prose lg:min-w-3/4 w-full px-3">
                <div className="text-center font-bold text-3xl">{title}</div>
                <div className="text-center">{new Date(date?.from || Date.now()).toLocaleDateString()} to {new Date(date?.to || Date.now()).toLocaleDateString()}</div>
                <article dangerouslySetInnerHTML={{__html: marked(markdown, {breaks: true}) }} />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="lg:min-w-1/4 w-full">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Title"
                                        {...field}
                                        onChangeCapture={(e) => { setTitle(e.currentTarget.value) }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="mainImg"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Main Image: </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Image"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="markdown"
                        render={({ field }) => (
                            <FormItem className="my-5">
                                <FormLabel>Markdown</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about yourself"
                                        // className="resize-none"
                                        {...field}
                                        onChangeCapture={(e) => { setMarkdown(e.currentTarget.value) }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-[300px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                    <Button type="submit" disabled={form.formState.isSubmitting}>Submit</Button>
                </form>
            </Form>
        </div>
    )
}
