import { IsAdmin } from "@/app/lib/auth/auth";
import SideNav from "@/app/ui/components/sidenav";
import { redirect } from "next/navigation";

export default async function RootLayout({ children, }: { children: React.ReactNode; }) {
    if (!(await IsAdmin())) redirect('/')
    else {
        return (
            <div className="flex md:h-screen flex-col md:flex-row md:overflow-hidden pb-14 pt-20">
                <div className="w-full flex-none md:w-64">
                    <SideNav />
                </div>
                <div className="flex-grow md:overflow-y-auto">
                    {children}
                </div>
            </div>
        );
    }
}
