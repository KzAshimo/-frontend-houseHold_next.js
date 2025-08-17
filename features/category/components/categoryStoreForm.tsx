"use client";

import { useFormContext } from "react-hook-form";
import StoreForm from "@/components/items/form/storeForm";
import useStoreCategory from "../hooks/useStoreCategoryHook";
import useUser from "@/features/auth/hooks/useUserHook";

type CategoryFormData = {
  name: string;
  type: string;
};

const CategoryFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CategoryFormData>();

  return (
    <div className="space-y-4">
      {/* カテゴリ名 */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-100"
        >
          カテゴリ名
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "カテゴリ名は必須です" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* 種類 */}
      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-slate-100"
        >
          種類
        </label>
        <select
          id="type"
          {...register("type", { required: "種類は必須です" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="" className="bg-slate-600">選択してください</option>
          <option value="income" className="bg-slate-600">収入</option>
          <option value="expense" className="bg-slate-600">支出</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>
    </div>
  );
};

export const CategoryForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { storeCategory, isLoading, error } = useStoreCategory();
  const { user, isLoading: isUserLoading } = useUser();

  const handleStore = async (data: CategoryFormData) => {
    if (!user) {
      console.error("ユーザー情報が取得できませんでした");
      return;
    }

    const userId = user.id;
    await storeCategory({ ...data, userId });

    if (!error) {
      onSuccess();
    }
  };

  return (
    <StoreForm<CategoryFormData>
      onSubmit={handleStore}
      isLoading={isLoading || isUserLoading}
      error={error}
      submitText="カテゴリ登録"
    >
      <CategoryFormFields />
    </StoreForm>
  );
};
