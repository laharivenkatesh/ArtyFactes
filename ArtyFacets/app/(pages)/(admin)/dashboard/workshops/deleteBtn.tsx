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

export default function DeleteButton({workshop}:{workshop : string}){
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="h-full">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete</AlertDialogTitle>
                    <AlertDialogDescription>
                        Be aware while clicking Delete, This is One Time Action Only.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={async () => { await DeleteWorkshop(workshop) }} className="bg-red-300 border-2 border-red-500">Delete</AlertDialogCancel>
                    <AlertDialogAction>Cancel</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}