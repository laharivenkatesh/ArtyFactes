import { YoutubeComponent } from "@/app/(pages)/page";
import YoutubeLinkForm from "./form";
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
import { Suspense } from "react";
import Loading from "../workshops/Loading";

export default function YoutubeForm() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Video Management</h1>
                    <p className="text-gray-600 text-lg mb-8">Upload and manage your YouTube videos</p>
                </div>

                <div className="space-y-8">
                    {/* Add Video Form */}
                    <Card className="border-2 border-red-200 shadow-lg rounded-xl">
                        <CardHeader className="bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-t-xl">
                            <CardTitle className="text-2xl">Add YouTube Video</CardTitle>
                            <CardDescription className="text-red-100">
                                Paste your YouTube video link to add it to your library
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <YoutubeLinkForm />
                        </CardContent>
                    </Card>

                    {/* Videos Grid */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Videos</h2>
                        <Suspense fallback={<div className="text-center py-12"><Loading /></div>}>
                            <YoutubeComponent dash={true} adm={true} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
