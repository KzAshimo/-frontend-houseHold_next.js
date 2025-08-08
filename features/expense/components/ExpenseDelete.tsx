"use client";

import useExpenseDelete from "../hooks/UseDeleteHook";


type Props = {
  expenseId: number;
  onDeleted: () => void;
};

export default function DeleteExpense({ expenseId, onDeleted }: Props) {
  const { deleteExpense, isLoading, error } = useExpenseDelete();

  const handleDelete = async () => {
    if (!confirm("本当に削除しますか？")) return;
    await deleteExpense(expenseId);
    if (!error) {
      onDeleted();
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
      >
        {isLoading ? "削除中..." : "削除"}
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
}
