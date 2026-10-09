export function SummaryCard({
    title,amount
}){
    return (
        <div className="rounded-xl border p-5">
            <p className="text-sm text-gray-500" >{title}</p>
            <h2 className="mt-2 text-2xl font-bold" >{amount}</h2>


        </div>
        

    )
}