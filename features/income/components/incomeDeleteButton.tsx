"use client";

import { Button } from "@headlessui/react";
import { KeyedMutator } from "swr";
import useDeleteIncome from "../hooks/UseDeleteIncomeHook";

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
  const { deleteIncome, isLoading, error } = useDeleteIncome();

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
        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "削除中..." : "削除"}
      </Button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </>
  );
}
