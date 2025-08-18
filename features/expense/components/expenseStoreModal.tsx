"use client";

import { Dialog, DialogPanel, DialogTitle, Button } from '@headlessui/react';
import { useForm, FormProvider } from "react-hook-form";
import useExpenseStore from "../hooks/useStoreExpenseHook";
import useUser from "@/features/auth/hooks/useUserHook";
import ExpenseFormFields, { ExpenseFormData } from "./expenseStoreForm";

export default function ExpenseStoreModal({
  isOpen,
  setIsOpen,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const { storeExpense, isLoading, error } = useExpenseStore();
  const { user } = useUser();
  const methods = useForm<ExpenseFormData>();

  const handleSubmit = async (data: ExpenseFormData) => {
    if (!user) return console.error("ユーザー情報が取得できませんでした");
    await storeExpense({ ...data, userId: user.id });
    if (!error) onSuccess();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
          <DialogTitle className="text-lg font-bold text-white mb-4">支出登録</DialogTitle>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
              <ExpenseFormFields />
              <div className="flex justify-end gap-2 mt-4">
                <Button type="button" className="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600" onClick={() => setIsOpen(false)}>
                  閉じる
                </Button>
                <Button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500" disabled={isLoading}>
                  登録
                </Button>
              </div>
            </form>
          </FormProvider>
        </DialogPanel>
      </div>
    </Dialog>
  );
}