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
import { Student } from "./col"
import { AcceptReq, DeleteReq } from "@/app/lib/students"

export default function EditButton({ workshop }: { workshop: Student}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="h-full">Action</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-h-96 overflow-y-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle>Action</AlertDialogTitle>
                    <AlertDialogDescription>
                        Choose the action you would like to do against this Request.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction className="bg-blue-300 border-2 text-black border-blue-500" onClick={ async () => { await AcceptReq(workshop._id) }} >Accept</AlertDialogAction>
                    <AlertDialogAction className="bg-red-300 border-2 text-black border-red-500" onClick={ async () => { await DeleteReq(workshop._id) }} >Reject</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}