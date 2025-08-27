import { Description, Field, Textarea } from "@headlessui/react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import useStoreNotification from "../hooks/useStoreNotificationHook";
import useUser from "@/features/auth/hooks/useUserHook";

export type NotificationFormData = {
  title: string;
  content: string;
  type: string;
  start_date: string;
  end_date: string;
};

const NotificationStoreForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<NotificationFormData>();

  return (
    <div className="space-y-4">
      {/* タイトル */}
      <div>
        <label className="block text-sm font-medium text-white">タイトル</label>
        <input
          type="text"
          {...register("title", { required: "タイトル名は必須です" })}
          className="mt-1 block w-full rounded-md border-2 border-white px-2 py-1"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

{/* 内容 */}
      <Field>
        <label className="block text-sm font-medium text-white">内容</label>
        <Textarea
          {...register("content", { required: "内容は必須です" })}
          rows={3}
          className={`mt-2 block w-full resize-none rounded-lg border px-3 py-1.5 text-sm text-white
            bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/25 ${
              errors.content ? "border-red-500" : "border-white"
            }`}
        />
        {errors.content ? (
          <Description className="text-sm text-red-500 mt-1">
            {errors.content.message}
          </Description>
        ) : (
          <Description className="text-sm text-white/50 mt-1">
            お知らせの内容を入力してください
          </Description>
        )}
      </Field>

      {/* 種類 */}
      <div>
        <label className="block text-sm font-medium text-white">種類</label>
        <select
          {...register("type", { required: "種類は必須です" })}
          className="mt-1 block w-full rounded-md border-2 border-white px-2 py-1"
        >
          <option value="" className="bg-slate-600">
            選択してください
          </option>
          <option value="always" className="bg-slate-600">
            毎回表示
          </option>
          <option value="once" className="bg-slate-600">
            1度のみ表示
          </option>
        </select>
        {errors.type && (
          <p className="text-red-600 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      {/* 開始日 */}
      <div>
        <label className="block text-sm font-medium text-white">開始日</label>
        <input
          type="date"
          {...register("start_date", { required: "開始日は必須です" })}
          className="mt-1 block w-full rounded-md border-2 border-white px-2 py-1 bg-slate-800 text-white"
        />
        {errors.start_date && (
          <p className="text-red-600 text-sm mt-1">
            {errors.start_date.message}
          </p>
        )}
      </div>

      {/* 終了日 */}
      <div>
        <label className="block text-sm font-medium text-white">終了日</label>
        <input
          type="date"
          {...register("end_date", { required: "終了日は必須です" })}
          className="mt-1 block w-full rounded-md border-2 border-white px-2 py-1 bg-slate-800 text-white"
        />
        {errors.end_date && (
          <p className="text-red-600 text-sm mt-1">{errors.end_date.message}</p>
        )}
      </div>
    </div>
  );
};

// フォーム本体
export const NotificationForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const methods = useForm<NotificationFormData>();
  const { handleSubmit } = methods;

  const { storeNotification, isLoading, error } = useStoreNotification();
  const { user } = useUser();

  const handleStore = async (data: NotificationFormData) => {
    if (!user) return;
    await storeNotification({ ...data, userId: user.id });
    if (!error) onSuccess();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleStore)} className="space-y-4">
        <NotificationStoreForm />
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
