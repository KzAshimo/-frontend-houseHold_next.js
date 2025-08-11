"use client";

import { useState } from "react";
import useIncomeUpdate from "../hooks/useUpdateIncomeHook";
import useIncomeIndex from "../hooks/useIndexIncomeHook";
import { useFormContext } from "react-hook-form";
import StoreForm from "@/components/items/form/storeForm";
import InputFormModal from "@/components/items/modal/inputModal";
import { Button } from "@/components/items/button/button";
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
  defaultValues: {
    amount: number;
    content: string;
    memo?: string;
  };
  onUpdated: KeyedMutator<Income[]>;
};

export default function UpdateIncomeModal({ incomeId, defaultValues }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateIncome, isLoading, error } = useIncomeUpdate();
  const { refetch } = useIncomeIndex();

  const handleSubmit = async (data: typeof defaultValues) => {
    await updateIncome(incomeId, data);
    if (!error) {
      await refetch();
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button type="button" clickHandler={() => setIsOpen(true)} color="lime">
        編集
      </Button>

      <InputFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="収入の編集"
      >
        <StoreForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitText="更新する"
          error={error}
        >
          <AmountInput defaultValue={defaultValues.amount} />
          <ContentInput defaultValue={defaultValues.content} />
          <MemoInput defaultValue={defaultValues.memo} />
        </StoreForm>
      </InputFormModal>
    </>
  );
}

function AmountInput({ defaultValue }: { defaultValue: number }) {
  const { register } = useFormContext();
  return (
    <div>
      <label className="block text-sm font-medium">金額</label>
      <input
        type="number"
        defaultValue={defaultValue}
        {...register("amount", { required: true })}
        className="mt-1 block w-full rounded-md border-gray-300 text-slate-100"
      />
    </div>
  );
}

function ContentInput({ defaultValue }: { defaultValue: string }) {
  const { register } = useFormContext();
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium">収入元</label>
      <input
        type="text"
        defaultValue={defaultValue}
        {...register("content", { required: true })}
        className="mt-1 block w-full rounded-md border-gray-300 text-slate-100"
      />
    </div>
  );
}

function MemoInput({ defaultValue }: { defaultValue?: string }) {
  const { register } = useFormContext();
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium">メモ</label>
      <input
        type="text"
        defaultValue={defaultValue}
        {...register("memo")}
        className="mt-1 block w-full rounded-md border-gray-300 text-slate-100"
      />
    </div>
  );
}
