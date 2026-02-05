import { DataTable } from "../../students/table/DataTable"
import { columns } from "./col"

export default function WorkshopUserTable(data:any) {
    return (
        <DataTable columns={columns} data={data.data} />
    )
}