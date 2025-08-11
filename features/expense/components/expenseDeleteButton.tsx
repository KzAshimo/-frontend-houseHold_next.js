"use client";

import { Button } from "@/components/items/button/button";
import useExpenseDelete from "../hooks/useDeleteExpenseHook";
import { KeyedMutator } from "swr";

type Expense = {
  id: number;
  user: string;
  category: string;
  content: string;
  amount: number;
  memo: string;
  created_at: string;
  updated_at: string;
};

type Props = {
  expenseId: number;
  onDeleted?: KeyedMutator<Expense[]>;
};

export default function DeleteExpenseButton({ expenseId, onDeleted }: Props) {
  const { deleteExpense, isLoading, error } = useExpenseDelete();

  const handleClick = async () => {
    if (!confirm("本当に削除しますか？")) return;

    try {
      await deleteExpense(expenseId);
      if (onDeleted) {
        await onDeleted();
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Button
        type="button"
        clickHandler={handleClick}
        isDisabled={isLoading}
        color="rose"
      >
        {isLoading ? "削除中..." : "削除"}
      </Button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
}
