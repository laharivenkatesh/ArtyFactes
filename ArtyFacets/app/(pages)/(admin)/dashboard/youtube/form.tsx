"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/app/ui/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/ui/components/ui/form";
import { Input } from "@/app/ui/components/ui/input";
import { AddYoutube, UpdateYoutube } from "@/app/lib/students";
import { toast } from "@/app/ui/components/ui/use-toast";

const formSchema = z.object({
    _id: z.string().optional(),
    title: z.string(),
    link: z.string().url(),
});

export default function YoutubeLinkForm({
    Youtube,
}: {
    Youtube?: { _id: string; title: ""; link: "" };
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: Youtube == undefined ? "" : Youtube._id,
            title: Youtube == undefined ? "" : Youtube.title,
            link: Youtube == undefined ? "" : Youtube.link,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!values) return;
        if (Youtube) {
            await UpdateYoutube({
                _id: Youtube._id,
                title: values.title,
                link: values.link,
            });
            toast({
                title: "The Youtube Video details have been set to:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">
                            {JSON.stringify(values, null, 2)}
                        </code>
                    </pre>
                ),
            });
        } else {
            values._id = "";
            await AddYoutube({ title: values.title, link: values.link });
            toast({
                title: "The Youtube Video details are:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">
                            {JSON.stringify(values, null, 2)}
                        </code>
                    </pre>
                ),
            });
        }
        form.reset();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-3xl mx-auto bg-white"
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Arty Facets..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Title of the Video.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Link</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Paste the Youtube Video Link here.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={form.formState.isSubmitting} type="submit">Submit</Button>
            </form>
        </Form>
    );
}
