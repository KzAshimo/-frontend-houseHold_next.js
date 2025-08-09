"use client";

import { useState } from "react";
import useExpenseUpdate from "../hooks/useUpdateExpenseHook";
import useExpenseIndex from "../hooks/useIndexExpenseHook";
import { useFormContext } from "react-hook-form";
import StoreForm from "@/components/items/form/StoreForm";
import InputFormModal from "@/components/items/modal/InputModal";
import { Button } from "@/components/items/button/Button";

type Props = {
  expenseId: number;
  defaultValues: {
    amount: number;
    content: string;
    memo?: string;
  };
};

export default function UpdateExpenseModal({
  expenseId,
  defaultValues,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateExpense, isLoading, error } = useExpenseUpdate();
  const { refetch } = useExpenseIndex();

  const handleSubmit = async (data: typeof defaultValues) => {
    await updateExpense(expenseId, data);
    if (!error) {
      await refetch();
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
      type="button"
        clickHandler={() => setIsOpen(true)}
        color="lime"
      >
        編集
      </Button>

      <InputFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="支出の編集"
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
      <label className="block text-sm font-medium">内容</label>
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
