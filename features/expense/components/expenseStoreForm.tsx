"use client";

import { useFormContext } from "react-hook-form";
import useExpenseStore from "../hooks/useStoreExpenseHook";
import StoreForm from "@/components/items/form/storeForm";
import useUser from "@/features/auth/hooks/useUserHook";
import useIndexExpenseCategory, { ExpenseCategory } from "@/features/category/hooks/useIndexExpenseCategoryHook";

type ExpenseFormData = {
  category_id: number;
  amount: number;
  content: string;
  memo?: string;
};

const ExpenseFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ExpenseFormData>();
  const { categories, isLoading, error: categoryError } = useIndexExpenseCategory();

  return (
    <div className="space-y-4">
      {/* カテゴリ */}
      <div>
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-slate-100"
        >
          カテゴリー
        </label>
        <select
          id="categoryId"
          {...register("category_id", { required: "カテゴリーは必須です" })}
          disabled={isLoading || !!categoryError}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-slate-100"
        >
          {isLoading && <option>読み込み中...</option>}
          {categoryError && <option>カテゴリーの取得に失敗しました</option>}
          {!isLoading && !categoryError && (
            <>
              <option value="">選択してください</option>
              {categories.map((category: ExpenseCategory) => (
                <option
                  className="bg-slate-600"
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </>
          )}
        </select>
        {errors.category_id && (
          <p className="mt-1 text-sm text-red-600">
            {errors.category_id.message}
          </p>
        )}
        {categoryError && (
          <p className="mt-1 text-sm text-red-600">{categoryError}</p>
        )}
      </div>

      {/* 金額 */}
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-slate-100"
        >
          金額
        </label>
        <input
          type="number"
          id="amount"
          {...register("amount", {
            required: "金額は必須です",
            valueAsNumber: true,
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      {/* 内容 */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-slate-100"
        >
          内容
        </label>
        <input
          type="text"
          id="content"
          {...register("content", {
            required: "内容は必須です",
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      {/* メモ */}
      <div>
        <label
          htmlFor="memo"
          className="block text-sm font-medium text-slate-100"
        >
          メモ (任意)
        </label>
        <textarea
          id="memo"
          {...register("memo")}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.memo && (
          <p className="mt-1 text-sm text-red-600">{errors.memo.message}</p>
        )}
      </div>
    </div>
  );
};

export const ExpenseForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { storeExpense, isLoading, error } = useExpenseStore();
  const { user, isLoading: isUserLoading } = useUser();

  const handleStore = async (data: ExpenseFormData) => {
    if (!user) {
      console.error("ユーザー情報が取得できませんでした");
      return;
    }

    const userId = user.id;
    await storeExpense({ ...data, userId });

    if (!error) {
      onSuccess();
    }
  };

  return (
    <StoreForm<ExpenseFormData>
      onSubmit={handleStore}
      isLoading={isLoading || isUserLoading}
      error={error}
      submitText="支出登録"
    >
      <ExpenseFormFields />
    </StoreForm>
  );
};
