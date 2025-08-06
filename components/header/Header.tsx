"use client";

import { Button } from "@/components/items/button/Button";
import useLogout from "@/features/auth/hooks/useLogoutHook";
import useUser from "@/features/auth/hooks/useUserHook";

const Header = () => {
  const { logout, isLoading: isLogoutLoading } = useLogout();
  const { user, isLoading: isUserLoading, error } = useUser();

  return (
    <header className="bg-white shadow px-6 py-4 flex items-center">
      {/* 左側：ユーザー情報 */}
      <div className="flex-1 text-gray-700 text-lg font-semibold">
        {isUserLoading ? (
          <span className="text-gray-500">読み込み中...</span>
        ) : error ? (
          <span className="text-red-500">ユーザー情報取得失敗</span>
        ) : user ? (
          <>
            ようこそ <strong>{user.name}</strong> さん
          </>
        ) : (
          <span className="text-gray-500">ゲスト</span>
        )}
      </div>

      {/* 右側：ログアウトボタン */}
      <div>
        <Button
          type="button"
          color="rose"
          clickHandler={logout}
          isDisabled={isLogoutLoading}
        >
          {isLogoutLoading ? "ログアウト処理中..." : "ログアウト"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
