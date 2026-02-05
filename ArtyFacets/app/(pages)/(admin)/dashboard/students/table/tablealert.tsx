"use client"
import { Button } from "@/app/ui/components/ui/button"
import { Student } from "./columns"
import DeleteButton from "./deleteBtn"
import Link from "next/link"

export default function EditButton({ workshop }: { workshop: Student }) {
    return (
        <div className="flex gap-2">
            <Link href={`/dashboard/edit-student/${workshop._id}`}>
                <Button className="h-full">Edit</Button>
            </Link>
            <DeleteButton workshop={workshop._id} />
        </div>
    )
}