import { Form } from "@/features/login/components/Form";
import '../../app/globals.css';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-r/srgb from-zinc-400 to-yellow-400">
      <div className="bg-slate-500/40 shadow-md rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">ログイン</h1>
        <Form />
      </div>
    </div>
  );
};

export default LoginPage;
