import { JoinForm } from "@/app/(pages)/join/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/ui/components/ui/card"

export default function RegisterStudentPage() {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Register New Student</h1>
                <p className="text-lg text-gray-600">Add a new student to the system using the form below</p>
            </div>

            <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-t-lg">
                    <CardTitle className="text-2xl">Student Registration Form</CardTitle>
                    <CardDescription className="text-teal-100">
                        Please fill out all required fields to register a new student
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                    <JoinForm />
                </CardContent>
            </Card>
        </div>
    )
}
