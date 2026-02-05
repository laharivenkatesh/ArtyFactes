"use client"
import { DeleteWorkshop } from "@/app/lib/workshop"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/app/ui/components/ui/alert-dialog"
import { Button } from "@/app/ui/components/ui/button"
import TextareaForm from "./Newform"

export default function EditButton({ workshop }: { workshop: { _id: string, title: "", enrolled: any[], markdown: "", mainImg: "", date: { to: any, from: any } } }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="h-full">Edit</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit</AlertDialogTitle>
                    <AlertDialogDescription>
                        <TextareaForm Edit={workshop}/>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Close</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}