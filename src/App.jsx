import { useState } from "react";
import { Navbar } from "./Components/Navbar";
import { SummaryCard } from "./Components/SummaryCard";
import { TransactionForm } from "./Components/TransactionForm";

function App() {
const [transactions, setTransactions] = useState([]);
const [editingIndex, setEditingIndex] = useState(null);

const income = transactions
.filter((item) => item.type === "Income")
.reduce((total, item) => total + item.amount, 0);

const expenses = transactions
.filter((item) => item.type === "Expense")
.reduce((total, item) => total + item.amount, 0);

const balance = income - expenses;

const formatCurrency = (amount) =>
new Intl.NumberFormat("en-IN", {
style: "currency",
currency: "INR",
maximumFractionDigits: 2,
}).format(amount);

function handleAddTransaction(newTransaction) {
setTransactions((prev) => [...prev, newTransaction]);
}

function handleUpdateTransaction(indexToUpdate, updatedTransaction) {
setTransactions((prev) =>
prev.map((item, index) =>
index === indexToUpdate ? updatedTransaction : item
)
);
}

function handleDelete(indexToDelete) {
setTransactions((prev) =>
prev.filter((_, index) => index !== indexToDelete)
);


if (editingIndex === indexToDelete) {
  setEditingIndex(null);
} else if (editingIndex > indexToDelete) {
  setEditingIndex((prev) => prev - 1);
}


}

return ( <div className="relative min-h-screen overflow-hidden bg-[#080d19] text-white">
{/* Decorative background glows */} <div className="pointer-events-none fixed -left-40 top-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" /> <div className="pointer-events-none fixed -right-40 top-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" /> <div className="pointer-events-none fixed bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-500/[0.07] blur-[120px]" />


  <div className="relative z-10">
    <Navbar />

    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
      {/* Dashboard heading */}
      <section className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-xs font-medium text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Your financial overview
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back<span className="text-emerald-400">.</span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Keep track of your money, understand your spending, and stay
            in control of your finances.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
          <p className="text-xs text-slate-500">Total transactions</p>
          <p className="mt-1 text-2xl font-bold text-white">
            {String(transactions.length).padStart(2, "0")}
          </p>
        </div>
      </section>

      {/* Summary cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          title="Total balance"
          amount={formatCurrency(balance)}
          icon="◈"
          color="emerald"
          subtitle="Income minus expenses"
        />

        <SummaryCard
          title="Total income"
          amount={formatCurrency(income)}
          icon="↗"
          color="blue"
          subtitle="All recorded income"
        />

        <SummaryCard
          title="Total expenses"
          amount={formatCurrency(expenses)}
          icon="↘"
          color="rose"
          subtitle="All recorded spending"
        />
      </section>

      {/* Main content */}
      <section className="mt-8 grid items-start gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        {/* Transactions */}
        <div
          id="transactions"
          className="scroll-mt-28 rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-7"
        >
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Recent transactions</h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage your income and expenses
              </p>
            </div>

            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400">
              {transactions.length} records
            </span>
          </div>

          {transactions.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-4 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-400/10 text-3xl text-emerald-400">
                ↗
              </div>
              <h3 className="font-semibold text-white">
                Your story starts here
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                Add your first transaction to see your financial overview
                come to life.
              </p>
              <a
                href="#transaction-form"
                className="mt-5 rounded-xl bg-emerald-400/10 px-4 py-2.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/20"
              >
                + Add your first transaction
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 transition hover:border-white/15 hover:bg-white/[0.045] sm:p-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg ${
                        item.type === "Income"
                          ? "bg-emerald-400/10 text-emerald-400"
                          : "bg-rose-400/10 text-rose-400"
                      }`}
                    >
                      {item.type === "Income" ? "↗" : "↘"}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-slate-100">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.type}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <p
                      className={`text-sm font-bold sm:text-base ${
                        item.type === "Income"
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {item.type === "Income" ? "+" : "-"}
                      {formatCurrency(item.amount)}
                    </p>

                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingIndex(index);
                          document
                            .getElementById("transaction-form")
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            });
                        }}
                        aria-label={`Edit ${item.title}`}
                        className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-slate-400 transition hover:border-sky-400/30 hover:bg-sky-400/10 hover:text-sky-300"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(index)}
                        aria-label={`Delete ${item.title}`}
                        className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-slate-400 transition hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {transactions.length > 0 && (
            <div className="mt-5 border-t border-white/[0.07] pt-4">
              <div className="flex justify-between gap-3 text-sm">
                <span className="text-slate-500">Net balance</span>
                <span
                  className={`font-bold ${
                    balance >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {formatCurrency(balance)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Add/Edit transaction form */}
        <TransactionForm
          onAddTransaction={handleAddTransaction}
          onUpdateTransaction={handleUpdateTransaction}
          transactions={transactions}
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
        />
      </section>

      <footer className="mt-10 border-t border-white/[0.07] py-6 text-center text-xs text-slate-600">
        Finora · Your money, your control.
      </footer>
    </main>
  </div>
</div>


);
}

export default App;
