import { Suspense } from "react";
import ReqTab from "./ReqTab";
import Loading from "../images/Loading";

export default function workshopsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Student Requests</h1>
                    <p className="text-gray-600 text-lg mb-8">Review and manage student registration requests</p>
                    <div className="bg-white border-2 border-amber-200 rounded-xl shadow-lg p-6">
                        <Suspense fallback={<div className="text-center py-8">Loading requests...</div>}>
                            <ReqTab />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}