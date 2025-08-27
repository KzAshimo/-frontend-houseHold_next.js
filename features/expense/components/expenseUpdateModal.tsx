"use client";

import { useState } from "react";
import useExpenseUpdate from "../hooks/useUpdateExpenseHook";
import useExpenseIndex from "../hooks/useIndexExpenseHook";
import { useFormContext } from "react-hook-form";
import { KeyedMutator } from "swr";
import { Button } from "@headlessui/react";
import Modal from "@/components/items/modal";
import Form from "@/components/items/form";

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
  defaultValues: {
    amount: number;
    content: string;
    memo?: string;
  };
  onUpdated: KeyedMutator<Expense[]>;
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
        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
        onClick={() => setIsOpen(true)}
      >
        編集
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="支出の編集"
      >
        <Form
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitText="更新する"
          error={error}
        >
          <AmountInput defaultValue={defaultValues.amount} />
          <ContentInput defaultValue={defaultValues.content} />
          <MemoInput defaultValue={defaultValues.memo} />
        </Form>
      </Modal>
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
