import { ReactNode } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  isLoading?: boolean;
  submitText?: string;
  error?: string | null;
};

const Form = <T extends FieldValues>({
  onSubmit,
  children,
  isLoading = false,
  submitText = "登録する",
  error = null,
}: Props<T>) => {
  const methods = useForm<T>();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* フォームの各入力項目がここに表示されます */}
        {children}

        {/* バックエンドからのエラーメッセージを表示します */}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

        <div className="mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? "処理中..." : submitText}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;