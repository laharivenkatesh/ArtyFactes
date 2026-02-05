'use client'

import { JoinForm } from "@/app/(pages)/join/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/ui/components/ui/card"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/app/ui/components/ui/button"
import { Student } from "../../students/table/columns"
import { ArrowLeft, Loader2 } from "lucide-react"
import { GetStudent } from "@/app/lib/students"

export default function EditStudentPage({ params }: { params: { id: string } }) {
    const [student, setStudent] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setLoading(true)
                const data = await GetStudent(params.id)
                if (data) {
                    setStudent(data)
                } else {
                    setError("Student not found")
                }
            } catch (err) {
                console.error("Error fetching student:", err)
                setError("Failed to load student details")
            } finally {
                setLoading(false)
            }
        }

        fetchStudent()
    }, [params.id])

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-8 px-4 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                    <p className="text-gray-600">Loading student details...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <Link href="/dashboard/students">
                        <Button variant="outline" className="mb-6">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Students
                        </Button>
                    </Link>
                    <Card className="border-2 border-red-200 bg-red-50">
                        <CardHeader>
                            <CardTitle className="text-red-700">Error</CardTitle>
                            <CardDescription className="text-red-600">{error}</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        )
    }

    if (!student) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <Link href="/dashboard/students">
                        <Button variant="outline" className="mb-6">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Students
                        </Button>
                    </Link>
                    <Card className="border-2 border-yellow-200 bg-yellow-50">
                        <CardHeader>
                            <CardTitle className="text-yellow-700">Not Found</CardTitle>
                            <CardDescription className="text-yellow-600">Student not found. Please go back and try again.</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <Link href="/dashboard/students">
                    <Button variant="outline" className="mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Students
                    </Button>
                </Link>

                <Card className="border-2 border-indigo-200 shadow-lg rounded-xl">
                    <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-xl">
                        <CardTitle className="text-3xl">Edit Student</CardTitle>
                        <CardDescription className="text-indigo-100">
                            Update student information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <JoinForm edit={student} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
