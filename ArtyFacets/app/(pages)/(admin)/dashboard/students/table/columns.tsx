"use client"
import { ColumnDef } from "@tanstack/react-table"
import EditButton from "./tablealert"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/app/ui/components/ui/button"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = {
    _id: string
    name: string
    phone: string
    email: string
    date: string
    courses: string[]
    address: string
    dob: string
    occupation: string
    known: string
}

export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "email",

        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "dob",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    DOB
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div>{new Date(row.original.dob).toLocaleDateString()}</div>
        }
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Join Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div>{new Date(row.original.date).toLocaleDateString()}</div>
        }
    },
    {
        accessorKey: "known",
        header: "Found Us @",
    },
    {
        accessorKey: "occupation",
        header: "Occupation",
    },
    {
        accessorKey: "courses",
        header: "Enrolled Courses",
        cell: ({ row }) => {
            return <div className="w-full tet-clip">{row.original.courses.join(", ")}</div>
        }
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            return (
                <div className="text-right font-medium">
                    <EditButton workshop={row.original} />
                </div>
            )
        },
    },
]