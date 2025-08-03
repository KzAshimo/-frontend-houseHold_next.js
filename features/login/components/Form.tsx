"use client";

import { useForm } from "react-hook-form";
import { useLogin } from "./Auth";

type LoginFormInputs = {
  email: string;
  password: string;
};

export const Form = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login, isLoading, error } = useLogin();

  const onSubmit = (data: LoginFormInputs) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          {...register("email")}
          type="email"
          required
          className="w-full border border-gray-600 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          {...register("password")}
          type="password"
          required
          className="w-full border border-gray-600 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-600/60 text-white py-2 px-4 rounded-md hover:bg-slate-700 disabled:opacity-50"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};
