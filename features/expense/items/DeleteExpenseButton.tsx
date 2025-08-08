"use client";

import { Button } from "@/components/items/button/Button";
import useExpenseDelete from "../hooks/UseDeleteHook";
import useExpenseIndex from "../hooks/useIndexHook";

type Props = {
  expenseId: number;
  onDeleted?: (id: number) => void;
};

export default function DeleteExpenseButton({ expenseId, onDeleted }: Props) {
  const { deleteExpense, isLoading, error } = useExpenseDelete();
  const { refetch } = useExpenseIndex();

  const handleClick = async () => {
    if (!confirm("本当に削除しますか？")) return;

    await deleteExpense(expenseId);

    if (!error) {
      await refetch();
      if (onDeleted) {
        onDeleted(expenseId);
      }
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
