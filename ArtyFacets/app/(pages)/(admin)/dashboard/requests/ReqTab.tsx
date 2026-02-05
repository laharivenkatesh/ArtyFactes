import { GetRequests } from "@/app/lib/data"
import { columns } from "./col"
import { DataTable } from "../students/table/DataTable"

export default async function ReqTab() {
    const data = await GetRequests()

    return (
        <DataTable columns={columns} data={data} />
    )
}