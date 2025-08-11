"use client";

import { Button } from "@/components/items/button/button";
import useIncomeDelete from "../hooks/useDeleteIncomeHook";
import { KeyedMutator } from "swr";

type Income = {
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
  incomeId: number;
  onDeleted?: KeyedMutator<Income[]>;
};

export default function DeleteIncomeButton({ incomeId, onDeleted }: Props) {
  const { deleteIncome, isLoading, error } = useIncomeDelete();

  const handleClick = async () => {
    if (!confirm("本当に削除しますか？")) return;

    try {
      await deleteIncome(incomeId);
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
