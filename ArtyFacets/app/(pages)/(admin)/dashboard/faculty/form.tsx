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
import { AddFaculty, UpdateFaculty } from "@/app/lib/students";
import { toast } from "@/app/ui/components/ui/use-toast";

const formSchema = z.object({
    _id: z.string().optional(),
    uname: z.string(),
    role: z.string(),
    bio: z.string(),
    image: z.string()
});

export default function FacultyLinkForm({
    Faculty,
}: {
    Faculty?: { _id: string; name: ""; bio: ""; role: ""; image: "" };
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            _id: Faculty == undefined ? "" : Faculty._id,
            uname: Faculty == undefined ? "" : Faculty.name,
            role: Faculty == undefined ? "" : Faculty.role,
            bio: Faculty == undefined ? "" : Faculty.bio,
            image: Faculty == undefined ? "" : Faculty.image,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!values) return;
        if (Faculty) {
            await UpdateFaculty({
                _id: Faculty._id,
                name: values.uname,
                bio: values.bio,
                image: values.image,
                role: values.role,
            });
            toast({
                title: "The Faculty details have been set to:",
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
            await AddFaculty({ name: values.uname, bio: values.bio, role: values.role, image: values.image });
            toast({
                title: "The Faculty details are:",
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
                    name="uname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Arty Facets..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Name of the Faculty.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Arts Teacher"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Faculty Role.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="About the Faculty..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Faculty Bio.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image Link</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="https://..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Paste the Image Link here.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={form.formState.isSubmitting} type="submit">
                    Submit
                </Button>
            </form>
        </Form>
    );
}
