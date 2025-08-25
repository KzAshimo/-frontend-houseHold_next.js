import { useForm } from "react-hook-form";
import useStoreUserHook from "../hooks/useStoreUserHook";

type UserStoreInputs = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string; // 追加
  role: string;
};

export const StoreForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserStoreInputs>();
  const { storeUser, isLoading, error } = useStoreUserHook();

  const onSubmit = (data: UserStoreInputs) => {
    storeUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-white">
      {/* 名前 */}
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          {...register("name", { required: "名前は必須です" })}
          type="text"
          className="w-full border border-gray-600 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      {/* メール */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          {...register("email", { required: "メールアドレスは必須です" })}
          type="email"
          className="w-full border border-gray-600 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      {/* パスワード */}
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          {...register("password", {
            required: "パスワードは必須です",
            minLength: { value: 8, message: "パスワードは8文字以上です" },
          })}
          type="password"
          className="w-full border border-gray-600 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      {/* 確認用パスワード */}
      <div>
        <label className="block text-sm font-medium mb-1">Password再入力</label>
        <input
          {...register("password_confirmation", {
            required: "確認用パスワードは必須です",
            validate: (value) =>
              value === watch("password") || "パスワードが一致しません",
          })}
          type="password"
          className="w-full border border-gray-600 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
        {errors.password_confirmation && (
          <p className="text-red-500">{errors.password_confirmation.message}</p>
        )}
      </div>

      {/* ロール */}
      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          {...register("role", { required: "ロールは必須です" })}
          className="w-full border border-gray-600 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="" className="bg-slate-600">選択してください</option>
          <option value="user" className="bg-slate-600">ユーザ</option>
          <option value="admin" className="bg-slate-600">管理者</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-3 text-white hover:bg-gray-600"
      >
        {isLoading ? "登録中..." : "登録"}
      </button>
    </form>
  );
};
