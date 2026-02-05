import { JoinForm } from "@/app/(pages)/join/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/ui/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/ui/components/ui/tabs"
import { Suspense } from "react"
import Loading from "../workshops/Loading"
import StudentTable from "./table/Table"
import Link from "next/link"
import { Button } from "@/app/ui/components/ui/button"


export default function workshopsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Students Management</h1>
                            <p className="text-gray-600 text-lg">Manage and register students in the system</p>
                        </div>
                        <Link href="/dashboard/register-student">
                            <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl whitespace-nowrap">
                                + Register New Student
                            </Button>
                        </Link>
                    </div>
                    <TabsDemo />
                </div>
            </div>
        </div>
    )
}

function TabsDemo() {
    return (
        <Tabs defaultValue="students" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white border-2 border-indigo-200 rounded-lg p-1">
                <TabsTrigger value="students" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-md transition-all">All Students</TabsTrigger>
                <TabsTrigger value="newStudents" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-md transition-all">Manage Registration</TabsTrigger>
            </TabsList>
            <TabsContent value="newStudents" className="w-full mt-6">

                <Card className="border-2 border-indigo-200 shadow-lg rounded-xl">
                    <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-xl">
                        <CardTitle className="text-2xl">Quick Registration</CardTitle>
                        <CardDescription className="text-indigo-100">
                            Register a new student directly from the dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <JoinForm />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="students" className="w-full mt-6">

                <Card className="border-2 border-indigo-200 shadow-lg rounded-xl">
                    <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-xl">
                        <CardTitle className="text-2xl">All Students</CardTitle>
                        <CardDescription className="text-indigo-100">
                            View and manage all registered students
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <Suspense fallback={<Loading />}>
                            <StudentTable />
                        </Suspense>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
