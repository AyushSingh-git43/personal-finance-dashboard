import { useState } from "react";

export function TransactionForm({onAddTransaction})

{
    const [title, setTitle] = useState("");
    const [amount ,setAmount] = useState("");
    const [type, setType] = useState("Expanse")

    function handleSubmit(e){
        e.preventDefault();
        console.log({title,amount,type});
        const transaction = {
            title,
            amount,
            type
        }
        onAddTransaction(transaction)


    }

    return(
        <form onSubmit={handleSubmit}
         className="mt-6 rounded-xl border p-6">
            <h2 className="mb-6 text-xl font-bold" > Add Transaction</h2>

            <div className="grid gap-4 md:grid-cols-3">
                <input 
                id="title"
                type="text"
                placeholder="Transaction Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-lg border px-4 py-2 outline-none"
                />
                <input
                id="amount"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-lg border px-4 py-2 outline-none"
               />

               <select 
               id="type"
               value={type}
               onChange={(e) => setType(e.target.value)}
               className="rounded-lg border px-4 py-2 outline-none"
               >
                <option value="Expense"> Expense </option>
                <option value ="Income"> Income </option>

               </select>

            </div>
            <button type="submit" className="mt-4 rounded-lg bg-black 
            px-5 py-2 text-white">Add Transaction</button>
            
        </form>
        
    )

}