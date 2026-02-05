import { Suspense } from "react";
import FacultyLinkForm from "./form";
import FacultyView from "./view";
import { GetAllFaculty } from "@/app/lib/data";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/ui/components/ui/card"

export default function YoutubeForm() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Faculty Management</h1>
                    <p className="text-gray-600 text-lg mb-8">Manage your faculty members and instructors</p>
                </div>

                <div className="space-y-8">
                    {/* Add Faculty - Wide Box */}
                    <Card className="border-2 border-cyan-200 shadow-lg rounded-xl w-full">
                        <CardHeader className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-t-xl">
                            <CardTitle className="text-2xl">Add New Faculty Member</CardTitle>
                            <CardDescription className="text-cyan-100">
                                Register a new faculty member or instructor to the system
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <FacultyLinkForm />
                        </CardContent>
                    </Card>

                    {/* Faculty List Section */}
                    <Card className="border-2 border-cyan-200 shadow-lg rounded-xl w-full">
                        <CardHeader className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-t-xl">
                            <CardTitle className="text-2xl">Faculty Directory</CardTitle>
                            <CardDescription className="text-cyan-100">
                                View and manage all faculty members
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <Suspense fallback={<div className="text-center py-12">Loading faculty...</div>}>
                                <ViewFac />
                            </Suspense>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

async function ViewFac() {
    const data = await GetAllFaculty()
    return <FacultyView data={data} adm={true} />
}