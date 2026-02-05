"use client"
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
import { JoinForm } from "./form"

export default function JoinButton({ workshop }: { workshop: string }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="p-2 mb-5 rounded-md hover:bg-teal-600 text-white bg-teal-900 text-center cursor-pointer">Register Now!</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Join The Workshop</AlertDialogTitle>
                    <AlertDialogDescription>
                        To Join the Workshop, Fill the form below. (NOTE: To Enroll Multiple Times, fill the with DIFFERENT EMAIL IDs.)
                        <JoinForm workshop={workshop} />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Close</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}