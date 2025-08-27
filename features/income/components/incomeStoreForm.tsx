"use client";

import { useFormContext } from "react-hook-form";
import useIndexIncomeCategory, {
  IncomeCategory,
} from "@/features/category/hooks/useIndexIncomeCategoryHook";

type Props = {
  onSuccess?: () => void;
};

export type IncomeFormData = {
  category_id: number;
  amount: number;
  content: string;
  memo?: string;
};

const IncomeFormFields = ({ onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormContext<IncomeFormData>();

  const { categories, isLoading, error: categoryError } =
    useIndexIncomeCategory();

  const onSubmit = async (data: IncomeFormData) => {
    try {
      await fetch("/api/v1/income/store", {
        method: "POST",
        body: JSON.stringify(data),
      });
      reset();           // フォームをクリア
      onSuccess?.();     // 成功時に親のハンドラーを呼ぶ
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* カテゴリ */}
      <div>
        <label htmlFor="categoryId" className="block text-sm font-medium text-slate-100">
          カテゴリー
        </label>
        <select
          id="categoryId"
          {...register("category_id", { required: "カテゴリーは必須です" })}
          disabled={isLoading || !!categoryError}
          className="mt-1 block w-full rounded-md border-white border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-slate-100"
        >
          {isLoading && <option>読み込み中...</option>}
          {categoryError && <option>取得失敗</option>}
          {!isLoading && !categoryError && (
            <>
              <option value="">選択してください</option>
              {categories.map((c: IncomeCategory) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </>
          )}
        </select>
        {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id.message}</p>}
      </div>

      {/* 金額 */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-slate-100">金額</label>
        <input
          type="number"
          id="amount"
          {...register("amount", { required: "金額は必須です", valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-white border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
      </div>

      {/* 内容 */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-slate-100">内容</label>
        <input
          type="text"
          id="content"
          {...register("content", { required: "内容は必須です" })}
          className="mt-1 block w-full rounded-md border-white border-2 shadow-sm"
        />
        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>}
      </div>

      {/* メモ */}
      <div>
        <label htmlFor="memo" className="block text-sm font-medium text-slate-100">メモ</label>
        <textarea
          id="memo"
          {...register("memo")}
          rows={3}
          className="mt-1 block w-full rounded-md border-white border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="mt-2 rounded bg-green-500 px-4 py-2 text-white"
      >
        登録
      </button>
    </form>
  );
};

export default IncomeFormFields;
