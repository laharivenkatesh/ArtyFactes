import Spinner from "@/app/ui/components/loadingSpinner";
import React from "react";

export default function Loading() {
    return (
        <section>
            <div className="flex items-center justify-center">
                <Spinner size={60} />
            </div>
        </section>
    );
};