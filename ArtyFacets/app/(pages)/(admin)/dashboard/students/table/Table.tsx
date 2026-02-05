import { getStudents } from "@/app/lib/data"
import { DataTable } from "./DataTable"
import { columns } from "./columns"

export default async function StudentTable() {
    const data = await getStudents()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}