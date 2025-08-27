"use client";

import { FormProvider, useForm, useFormContext } from "react-hook-form";
import useStoreCategory from "../hooks/useStoreCategoryHook";
import useUser from "@/features/auth/hooks/useUserHook";

export type CategoryFormData = {
  name: string;
  type: "income" | "expense" | "";
};

// 入力フィールド
const CategoryStoreForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CategoryFormData>();

  return (
    <div className="space-y-4">
      {/* カテゴリ名 */}
      <div>
        <label className="block text-sm font-medium text-white">
          カテゴリ名
        </label>
        <input
          type="text"
          {...register("name", { required: "カテゴリ名は必須です" })}
          className="mt-1 block w-full rounded-md border-2 border-white px-2 py-1"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* 種類 */}
      <div>
        <label className="block text-sm font-medium text-white">
          種類
        </label>
        <select
          {...register("type", { required: "種類は必須です" })}
          className="mt-1 block w-full rounded-md border-2 border-white px-2 py-1"
        >
          <option value="" className="bg-slate-600">選択してください</option>
          <option value="income" className="bg-slate-600">収入</option>
          <option value="expense" className="bg-slate-600">支出</option>
        </select>
        {errors.type && (
          <p className="text-red-600 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>
    </div>
  );
};

// フォーム本体
export const CategoryForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const methods = useForm<CategoryFormData>();
  const { handleSubmit } = methods;

  const { storeCategory, isLoading, error } = useStoreCategory();
  const { user } = useUser();

  const handleStore = async (data: CategoryFormData) => {
    if (!user) return;
    await storeCategory({ ...data, userId: user.id });
    if (!error) onSuccess();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleStore)} className="space-y-4">
        <CategoryStoreForm />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
          >
            {isLoading ? "登録中..." : "登録"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
