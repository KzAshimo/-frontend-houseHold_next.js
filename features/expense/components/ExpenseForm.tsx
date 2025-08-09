import { useFormContext } from "react-hook-form";
import useExpenseStore from "../hooks/useStoreExpenseHook";
import StoreForm from "@/components/items/form/storeForm";
import useCategoryIndex from "@/features/category/hooks/UseIndexHook";

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

  const { categories, isLoading, error: categoryError } = useCategoryIndex();
  return (
    <div className="space-y-4">
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
              <option value="" className="bg-slate-500">選択してください</option>
              {categories.map((category) => (
                <option className="bg-slate-500" key={category.id} value={category.id}>
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

  const handleStore = async (data: ExpenseFormData) => {
    const userId = 1;
    await storeExpense({ ...data, userId });

    if (!error) {
      onSuccess();
    }
  };

  return (
    <StoreForm<ExpenseFormData>
      onSubmit={handleStore}
      isLoading={isLoading}
      error={error}
    >
      <ExpenseFormFields />
    </StoreForm>
  );
};
