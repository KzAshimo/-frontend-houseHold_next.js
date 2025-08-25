import { Form } from "@/features/auth/components/formComponent";
import "../../app/globals.css";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-[url('/image/login.jpg')] relative bg-black/70">
      <div className="absolute inset-0" />
      <div className="relative bg-slate-500/40 shadow-md rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          ログイン
        </h1>
        <Form />
        {/* 新規登録ボタン */}
        <div className="mt-6 text-center">
          <Link href="/register" className="block">
            <span className="block w-full bg-rose-600/60 text-white py-2 px-4 rounded-md hover:bg-slate-700 disabled:opacity-50">
              User登録
            </span>
          </Link>
        </div>{" "}
      </div>
    </div>
  );
};

export default LoginPage;
