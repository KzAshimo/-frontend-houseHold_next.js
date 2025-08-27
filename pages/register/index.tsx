import { StoreForm } from "@/features/auth/components/userStoreForm";
import "../../app/globals.css";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-[url('/image/register.jpg')] relative bg-black/70">
      <div className="absolute inset-0" />
      <div className="relative bg-slate-700/70 shadow-md rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          ユーザ新規登録
        </h1>
        <StoreForm />
      </div>
    </div>
  );
};

export default RegisterPage;
