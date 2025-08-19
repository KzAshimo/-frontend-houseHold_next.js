"use client";

import { useState } from "react";
import useUpdateCategory from "../hooks/useUpdateCategoryHook";
import useIndexCategory from "../hooks/useIndexCategoryHook";
import { Button } from "@headlessui/react";
import Modal from "@/components/items/modal";
import Form from "@/components/items/form";
import { useForm, FormProvider, useFormContext } from "react-hook-form"; // FormProviderをインポート

type Category = {
  id: number;
  name: string;
  type: string;
};

type Props = {
  category: Category;
};

const UpdateCategoryModal = ({ category }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { updateCategory, isLoading, error } = useUpdateCategory();
  const { refetch } = useIndexCategory();

  const methods = useForm<Omit<Category, "id">>({
    defaultValues: {
      name: category.name,
      type: category.type,
    },
  });

  const handleSubmit = async (data: { name: string; type: string }) => {
    const success = await updateCategory(category.id, data);
    if (success) {
      await refetch();
      setIsOpen(false);
    }
  };

  const openModal = () => {
    methods.reset({
      name: category.name,
      type: category.type,
    });
    setIsOpen(true);
  };

  return (
    <>
      <Button
        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
        onClick={openModal}
      >
        編集
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="カテゴリの編集"
      >
        <FormProvider {...methods}>
          <Form
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitText="更新する"
            error={error}
          >
            <NameInput />
            <TypeInput />
          </Form>
        </FormProvider>
      </Modal>
    </>
  );
};

function NameInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-4">
      <label htmlFor="name" className="block text-sm font-medium">
        カテゴリ名
      </label>
      <input
        id="name"
        type="text"
        {...register("name", { required: "カテゴリ名は必須です" })}
        className="mt-1 block w-full rounded-md border-2 border-white bg-transparent text-slate-100"
      />
      {errors.name && (
        <p className="text-red-500 text-sm mt-1">
          {errors.name.message as string}
        </p>
      )}
    </div>
  );
}

function TypeInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-4">
      <label htmlFor="type" className="block text-sm font-medium">
        種類
      </label>
      <select
        id="type"
        {...register("type", { required: "種類は必須です" })}
        className="mt-1 block w-full rounded-md border-2 border-white bg-slate-800 text-slate-100 px-2 py-1"
      >
        <option value="" className="bg-slate-600">
          選択してください
        </option>
        <option value="income" className="bg-slate-600">
          収入
        </option>
        <option value="expense" className="bg-slate-600">
          支出
        </option>
      </select>
      {errors.type && (
        <p className="text-red-500 text-sm mt-1">
          {errors.type.message as string}
        </p>
      )}
    </div>
  );
}

export default UpdateCategoryModal;
