import NewWorkshop from "./Newform";
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
import CardWithForm from "./workshops";
import { Suspense } from "react";
import Loading from "./Loading";

export default function workshopsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Workshops Management</h1>
                        <p className="text-gray-600 text-lg mb-8">Create and manage workshop programs</p>
                    </div>
                    <TabsDemo />
                </div>
            </div>
        </div>
    )
}

function TabsDemo() {
    return (
        <Tabs defaultValue="workshops" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white border-2 border-green-200 rounded-lg p-1">
                <TabsTrigger value="workshops" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-md transition-all">All Workshops</TabsTrigger>
                <TabsTrigger value="newworkshop" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-md transition-all">New Workshop</TabsTrigger>
            </TabsList>
            <TabsContent value="newworkshop" className="w-full mt-6">
                <Card className="border-2 border-green-200 shadow-lg rounded-xl">
                    <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-xl">
                        <CardTitle className="text-2xl">Create New Workshop</CardTitle>
                        <CardDescription className="text-green-100">
                            Add a new workshop to your program
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <NewWorkshop />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="workshops" className="w-full mt-6">
                <Card className="border-2 border-green-200 shadow-lg rounded-xl">
                    <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-xl">
                        <CardTitle className="text-2xl">All Workshops</CardTitle>
                        <CardDescription className="text-green-100">
                            View and manage your workshops
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <Suspense fallback={<Loading />}>
                            <CardWithForm />
                        </Suspense>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
