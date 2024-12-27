import { DefaultTable } from "@/components/core/DefaultTable"
import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

const dummyData = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
]

const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
]

const RoleList = () => {

    return (
        <div className="container mx-auto py-10">
            <DefaultTable columns={columns} data={dummyData} />
        </div>
    )
}

export default RoleList