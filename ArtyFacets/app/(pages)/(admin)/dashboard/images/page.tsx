import { Suspense } from "react";
import ImagesPageForm from "./newImageForm";
import Loading from "./Loading";
import ImagesAWS from "./LoadImages";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/ui/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/ui/components/ui/tabs"

export default function TabsDemo() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Gallery Management</h1>
                    <p className="text-gray-600 text-lg mb-8">Manage your image gallery and uploads</p>
                </div>
                <Tabs defaultValue="images" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-white border-2 border-purple-200 rounded-lg p-1 mb-6">
                        <TabsTrigger value="images" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-md transition-all">Gallery</TabsTrigger>
                        <TabsTrigger value="newimages" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-md transition-all">Upload Image</TabsTrigger>
                    </TabsList>
                    <TabsContent value="images" className="w-full">
                        <Card className="border-2 border-purple-200 shadow-lg rounded-xl">
                            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-xl">
                                <CardTitle className="text-2xl">Gallery Images</CardTitle>
                                <CardDescription className="text-purple-100">
                                    View all images in your gallery
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <Suspense fallback={<Loading />}>
                                    <ImagesAWS />
                                </Suspense>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="newimages" className="w-full">
                        <Card className="border-2 border-purple-200 shadow-lg rounded-xl">
                            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-xl">
                                <CardTitle className="text-2xl">Upload New Image</CardTitle>
                                <CardDescription className="text-purple-100">
                                    Add new images to your gallery
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <ImagesPageForm />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
