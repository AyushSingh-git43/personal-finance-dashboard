import { useEffect, useState } from "react";

export function TransactionForm({
  onAddTransaction,
  onUpdateTransaction,
  transactions = [],
  editingIndex,
  setEditingIndex,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");

  const editingTransaction =
    editingIndex !== null ? transactions[editingIndex] : null;

  // Sync form inputs when editingIndex changes
  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(editingTransaction.amount);
      setType(editingTransaction.type);
    } else {
      setTitle("");
      setAmount("");
      setType("Expense");
    }
  }, [editingIndex, editingTransaction]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !amount) return;

    const newTransaction = {
      title,
      amount: Number(amount),
      type,
    };

    if (editingIndex !== null) {
      // Update existing item
      onUpdateTransaction(editingIndex, newTransaction);
      setEditingIndex(null);
    } else {
      // Add new item
      onAddTransaction(newTransaction);
    }

    // Reset inputs
    setTitle("");
    setAmount("");
    setType("Expense");
  }

  function handleCancel() {
    setEditingIndex(null);
    setTitle("");
    setAmount("");
    setType("Expense");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-bold">
        {editingIndex !== null ? "Edit Transaction" : "Add Transaction"}
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <input
          id="title"
          type="text"
          placeholder="Transaction Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg border px-4 py-2 outline-none"
          required
        />
        <input
          id="amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="rounded-lg border px-4 py-2 outline-none"
          required
        />
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border px-4 py-2 outline-none"
        >
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-black px-5 py-2 text-white"
        >
          {editingIndex !== null ? "Update Transaction" : "Add Transaction"}
        </button>

        {editingIndex !== null && (
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-lg bg-gray-300 px-5 py-2 text-black"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}