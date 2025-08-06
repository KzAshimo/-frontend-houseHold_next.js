"use client";

import { Button } from "@/components/items/button/Button";
import useLogout from "@/features/auth/hooks/useLogoutHook";
// import Link from "next/link";

const Header = () => {
  // const { user, isLoading, isUserLoading } = useUser();
  const { logout, isLoading } = useLogout();

  // if (isUserLoading) {
  //   return <div>ユーザ情報読み込み中...</div>;
  // }

  return (
    <header>
      <nav>
        <Button
          type="button"
          color="rose"
          clickHandler={logout}
          isDisabled={isLoading}
        >
          {isLoading ? "ログアウト処理中..." : "ログアウト"}
        </Button>
      </nav>
    </header>
  );
};

export default Header;
