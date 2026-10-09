import { useState } from "react"
import { Navbar } from "./Components/Navbar"
import { SummaryCard } from "./Components/SummeryCard"
import { TransactionForm } from "./Components/Transaction"
 
 
 function App(){
  const [transaction ,setTransaction ] = useState([]);

  function handleTransaction(transaction){
    setTransaction((prev) => [...prev,transaction])
  }

  return (
    <div>
      <Navbar/>

      <main className="p-6">
       
 <div className="grid gap-4 md:grid-cols-3" >
        
      <SummaryCard  title="income" amount ="10000"/>
      <SummaryCard  title="Expence" amount ="9000"/>
      <SummaryCard  title="Balance" amount ="15000"/>
      </div>
      <TransactionForm onAddTransaction={handleTransaction}/>
      
      </main>
      </div>
      
  )
}
export default App