import Link from "next/link";

export default function SideNav() {
    return (
        <div className="md:h-full px-3 py-6 md:px-2">
            {/* <div className="flex grow md:h-full flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2"> */}
            <div>
                <span className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-2xl mt-2 font-medium md:flex-none md:justify-start md:p-2 md:px-3">Dashboard</span>
                <Links />
            </div>
            {/* </div> */}
        </div>
    );
}

function Links() {
    return (
        <div className="md:block flex flex-row">
            <Link href={"/dashboard"} className="flex h-[48px] w-1/3 md:w-full grow items-center text-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm mt-2 font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">Dashboard</Link>
            <Link href={"/dashboard/workshops"} className="flex h-[48px] w-1/3 md:w-full grow items-center text-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm mt-2 font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">Workshops</Link>
            <Link href={"/dashboard/mails"} className="flex h-[48px] w-1/3 md:w-full grow items-center text-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm mt-2 font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">Send Mails</Link>
            <Link href={"/dashboard/students"} className="flex h-[48px] w-1/3 md:w-full grow items-center text-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm mt-2 font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">Students</Link>
            <Link href={"/dashboard/requests"} className="flex h-[48px] w-1/3 md:w-full grow items-center text-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm mt-2 font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">Requests</Link>
            <Link href={"/dashboard/youtube"} className="flex h-[48px] w-1/3 md:w-full grow items-center text-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm mt-2 font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">Youtube</Link>
            <Link href={"/dashboard/images"} className="flex h-[48px] w-1/3 md:w-full grow items-center text-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm mt-2 font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">Images</Link>
            <Link href={"/dashboard/faculty"} className="flex h-[48px] w-1/3 md:w-full grow items-center text-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm mt-2 font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">Faculty</Link>
        </div>
    )
}