"use client"

import Image from "next/legacy/image";
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
import { Button } from "@/app/ui/components/ui/button";
import { DeleteS3 } from "@/app/utils/s3";

export function AlertDialogDemo({ link }: { link: string }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="h-full rounded-xl"><Image unoptimized={true} loading="lazy" src={`https://arty-facet-web.s3.ap-south-1.amazonaws.com/${link}`} width={350} className="rounded-xl" height={550} alt={link.toString()} /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Copy / Delete</AlertDialogTitle>
                    <AlertDialogDescription>
                        Be aware while clicking Delete, This is One Time Action Only.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={async () => { await DeleteS3(link) }} className="bg-red-300 border-2 border-red-500">Delete</AlertDialogCancel>
                    <AlertDialogAction onClick={async () => { await navigator.clipboard.writeText(`https://arty-facet-web.s3.ap-south-1.amazonaws.com/${link}`) }}>Copy Link</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}