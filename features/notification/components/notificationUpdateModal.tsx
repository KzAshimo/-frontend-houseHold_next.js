"use client";

import { useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import useUpdateNotification from "../hooks/useUpdateNotificationHook";
import { Description, Field, Textarea } from "@headlessui/react";
import Modal from "./notificationStoreModal";
import Form from "@/components/items/form";
import useIndexNotification from "../hooks/useIndexNotificationHook";

type Notification = {
  id: number;
  user: string;
  title: string;
  content: string;
  type: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
};

type Props = {
  notification: Notification | null;
  isOpen: boolean;
  onClose: () => void;
};

const NotificationUpdateModal = ({ notification, isOpen, onClose }: Props) => {
  const { updateNotification, isLoading, error } = useUpdateNotification();
  const { refetch } = useIndexNotification();

  const methods = useForm<
    Omit<Notification, "id" | "user" | "created_at" | "updated_at">
  >({
    defaultValues: {
      title: "",
      content: "",
      type: "",
      start_date: "",
      end_date: "",
    },
  });

  useEffect(() => {
    if (notification) {
      methods.reset({
        title: notification.title,
        content: notification.content,
        type: notification.type,
        start_date: notification.start_date,
        end_date: notification.end_date,
      });
    }
  }, [notification, methods]);

  const handleSubmit = async (
    data: Omit<Notification, "id" | "user" | "created_at" | "updated_at">
  ) => {
    if (!notification) return;

    const success = await updateNotification(notification.id, data);
    if (success) {
      await refetch();
      onClose();
    }
  };

  if (!notification) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="通知の編集">
      <FormProvider {...methods}>
        <Form
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitText="更新"
          error={error}
        >
          <TitleInput />
          <ContentInput />
          <TypeInput />
          <StartDateInput />
          <EndDateInput />
        </Form>
      </FormProvider>
    </Modal>
  );
};

function TitleInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Notification>();
  return (
    <div className="mt-4">
      <Field>
        <label className="block text-sm font-medium text-white">タイトル</label>
        <input
          type="text"
          {...register("title", { required: "タイトルは必須です" })}
          placeholder="お知らせのタイトルを入力してください"
          className={`mt-2 block w-full rounded-lg border px-3 py-2 text-sm text-white
            bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/25 ${
              errors.title ? "border-red-500" : "border-white"
            }`}
        />
        {errors.title && (
          <Description className="text-sm text-red-500 mt-1">
            {errors.title.message}
          </Description>
        )}
      </Field>
    </div>
  );
}

function ContentInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Notification>();
  return (
    <div className="mt-4">
      <Field>
        <label className="block text-sm font-medium text-white">内容</label>
        <Textarea
          {...register("content", { required: "内容は必須です" })}
          rows={4}
          placeholder="お知らせの内容を入力してください"
          className={`mt-2 block w-full resize-none rounded-lg border px-3 py-2 text-sm text-white
      bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/25 ${
        errors.content ? "border-red-500" : "border-white"
      }`}
        />
        {errors.content && (
          <Description className="text-sm text-red-500 mt-1">
            {errors.content.message}
          </Description>
        )}
      </Field>
    </div>
  );
}

function TypeInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Notification>();
  return (
    <div className="mt-4">
      <label htmlFor="type" className="block text-sm font-medium text-white">
        種類
      </label>
      <select
        id="type"
        {...register("type", { required: "種類は必須です" })}
        className="mt-1 block w-full rounded-md border-2 border-white bg-slate-800 text-slate-100"
      >
        <option value="">選択してください</option>
        <option value="always">毎回表示</option>
        <option value="once">1度のみ表示</option>
      </select>
      {errors.type && (
        <p className="text-red-500 text-sm mt-1">
          {errors.type.message as string}
        </p>
      )}
    </div>
  );
}

function StartDateInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Notification>();
  return (
    <div className="mt-4">
      <label
        htmlFor="start_date"
        className="block text-sm font-medium text-white"
      >
        開始日
      </label>
      <input
        id="start_date"
        type="date"
        {...register("start_date", { required: "開始日は必須です" })}
        className="mt-1 block w-full rounded-md border-2 border-white bg-slate-800 text-slate-100"
      />
      {errors.start_date && (
        <p className="text-red-500 text-sm mt-1">
          {errors.start_date.message as string}
        </p>
      )}
    </div>
  );
}

function EndDateInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<Notification>();
  return (
    <div className="mt-4">
      <label
        htmlFor="end_date"
        className="block text-sm font-medium text-white"
      >
        終了日
      </label>
      <input
        id="end_date"
        type="date"
        {...register("end_date", { required: "終了日は必須です" })}
        className="mt-1 block w-full rounded-md border-2 border-white bg-slate-800 text-slate-100"
      />
      {errors.end_date && (
        <p className="text-red-500 text-sm mt-1">
          {errors.end_date.message as string}
        </p>
      )}
    </div>
  );
}

export default NotificationUpdateModal;
