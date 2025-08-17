"use client";

import { Button } from "@/components/items/button/button";
import useLogout from "@/features/auth/hooks/useLogoutHook";
import useUser from "@/features/auth/hooks/useUserHook";
import { useState } from "react";
import StoreExpenseButton from "@/features/expense/components/expenseStoreButton";
import ExpenseIncomeSwitch from "./expenseIncomeSwitch";
import StoreIncomeButton from "@/features/income/components/incomeStoreButton";
import StoreCategoryButton from "@/features/category/components/categoryStoreButton";

type HeaderProps = {
  onToggleView?: (showExpense: boolean) => void;
};

const Header = ({ onToggleView }: HeaderProps) => {
  const { logout, isLoading: isLogoutLoading } = useLogout();
  const { user, isLoading: isUserLoading, error } = useUser();

  const [showExpense, setShowExpense] = useState(true);

  const handleSwitchChange = (checked: boolean) => {
    setShowExpense(checked);
    onToggleView?.(checked);
  };

  return (
    <header className="bg-slate-800/40 shadow px-6 py-4 flex items-center justify-between">
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

      <StoreCategoryButton/>

      {/* 中央：Expense / Income 切替スイッチ */}
      <div className="mx-6">
        <ExpenseIncomeSwitch
          onChange={handleSwitchChange}
          initialShowExpense={showExpense}
        />
      </div>

      {/* スイッチに応じて追加ボタンを切替 */}
      {showExpense ? (
        <StoreExpenseButton />
      ) : (
        <StoreIncomeButton />
      )}

      {/* 右側：ログアウトボタン */}
      <Button
        type="button"
        color="rose"
        clickHandler={logout}
        isDisabled={isLogoutLoading}
      >
        {isLogoutLoading ? "ログアウト処理中..." : "ログアウト"}
      </Button>
    </header>
  );
};

export default Header;
