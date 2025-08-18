"use client";

import useUser from "@/features/auth/hooks/useUserHook";
import { useState } from "react";
import HeaderDropdownMenu from "./headerDropdownMenu";
import ExpenseIncomeTabs from "./expenseIncomeTab";

type HeaderProps = {
  onToggleView?: (showExpense: boolean) => void;
};

const Header = ({ onToggleView }: HeaderProps) => {
  const { user, isLoading: isUserLoading, error } = useUser();

  const [showExpense, setShowExpense] = useState(true);

  const handleSwitchChange = (checked: boolean) => {
    setShowExpense(checked);
    onToggleView?.(checked);
  };

  return (
    <header className="bg-slate-800 shadow px-6 py-4 flex items-center justify-between">
      {/* 左側：ユーザー情報 */}
      <div className="flex-1 text-slate-100 text-lg font-semibold">
        {isUserLoading ? (
          <span className="text-gray-500">読み込み中...</span>
        ) : error ? (
          <span className="text-red-500">ユーザー情報取得失敗</span>
        ) : user ? (
          <>
            <strong>{user.name}</strong> さん
          </>
        ) : (
          <span className="text-gray-500">ゲスト</span>
        )}
      </div>

      <div className="mx-2">
        <ExpenseIncomeTabs
          onChange={handleSwitchChange}
          initialShowExpense={showExpense}
        />
      </div>

      <HeaderDropdownMenu />
    </header>
  );
};

export default Header;
