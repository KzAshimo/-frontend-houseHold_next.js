"use client";

import { useFormContext } from "react-hook-form";
import useStoreIncome from "../hooks/useStoreIncomeHook";
import StoreForm from "@/components/items/form/storeForm";
import useUser from "@/features/auth/hooks/useUserHook";
import useIndexCategoryIncome from "../hooks/useIndexCategoryIncomeHook";

type IncomeFormData = {
  category_id: number;
  amount: number;
  content: string;
  memo?: string;
};

const IncomeFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IncomeFormData>();
  const { categories, isLoading, error: categoryError } = useIndexCategoryIncome();

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
          className="mt-1 block w-full rounded-md border-slate-100 shadow-sm "
        >
          {isLoading && <option>読み込み中...</option>}
          {categoryError && <option>カテゴリーの取得に失敗しました</option>}
          {!isLoading && !categoryError && (
            <>
              <option value="">選択してください</option>
              {categories.map((category) => (
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
          {...register("content", { required: "内容は必須です" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
          メモ
        </label>
        <textarea
          id="memo"
          {...register("memo")}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
    </div>
  );
};

export const IncomeForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { storeIncome, isLoading, error } = useStoreIncome();
  const { user, isLoading: isUserLoading } = useUser();

  const handleStore = async (data: IncomeFormData) => {
    if (!user) {
      console.error("ユーザー情報が取得できませんでした");
      return;
    }

    const userId = user.id;
    await storeIncome({ ...data, userId });

    if (!error) {
      onSuccess();
    }
  };

  return (
    <StoreForm<IncomeFormData>
      onSubmit={handleStore}
      isLoading={isLoading || isUserLoading}
      error={error}
      submitText="収入登録"
    >
      <IncomeFormFields />
    </StoreForm>
  );
};
