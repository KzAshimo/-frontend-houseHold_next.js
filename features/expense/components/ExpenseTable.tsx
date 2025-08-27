"use client";

import { useMemo, useState } from "react";
import useExpenseIndex from "@/features/expense/hooks/useIndexExpenseHook";
import DeleteExpenseButton from "./expenseDeleteButton";
import UpdateExpenseModal from "./expenseUpdateModal";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import ExpenseIncomeSummaryTable from "@/features/expense_income/components/expenceIncomeSummary";

const ExpenseTable = () => {
  const {
    expenses: initialExpense,
    isLoading,
    error,
    refetch,
  } = useExpenseIndex();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // --- 年リスト ---
  const years = useMemo(
    () =>
      Array.from(
        new Set(
          initialExpense.map((i) =>
            new Date(i.created_at).getFullYear().toString()
          )
        )
      ).sort((a, b) => Number(b) - Number(a)), // 新しい順
    [initialExpense]
  );

  // 選択中の年（初期値は最新の年）
  const [selectedYear, setSelectedYear] = useState<string | null>(
    years.length > 0 ? years[0] : null
  );

  // --- 月リスト（選択中の年に限定） ---
  const months = useMemo(() => {
    if (!selectedYear) return [];
    return Array.from(
      new Set(
        initialExpense
          .filter(
            (i) => new Date(i.created_at).getFullYear().toString() === selectedYear
          )
          .map((i) =>
            new Date(i.created_at).toLocaleString("ja-JP", {
              year: "numeric",
              month: "short",
            })
          )
      )
    );
  }, [initialExpense, selectedYear]);

  // --- カテゴリリスト ---
  const categories = useMemo(
    () => Array.from(new Set(initialExpense.map((i) => i.category))),
    [initialExpense]
  );

  // --- 集計 ---
  const getAmount = (month: string, category: string) => {
    return initialExpense
      .filter(
        (e) =>
          new Date(e.created_at).toLocaleString("ja-JP", {
            year: "numeric",
            month: "short",
          }) === month && e.category === category
      )
      .reduce((sum, e) => sum + e.amount, 0);
  };

  // --- 詳細取得 ---
  const getDetails = (month: string, category: string) => {
    return initialExpense.filter(
      (e) =>
        new Date(e.created_at).toLocaleString("ja-JP", {
          year: "numeric",
          month: "short",
        }) === month && e.category === category
    );
  };

  // --- カードクリック ---
  const handleCardClick = (month: string, category: string) => {
    setSelectedMonth(month);
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>読み込み中...</div>;
  if (error) return <div className="text-red-500">データ取得失敗: {error}</div>;

  return (
    <div className="m-5 space-y-6">
      <ExpenseIncomeSummaryTable/>

      {/* 年セレクタ */}
      {years.length > 0 && (
        <div className="mb-6">
          <label className="mr-2 font-bold text-white">年を選択:</label>
          <select
            value={selectedYear ?? ""}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="rounded-md px-3 py-2 bg-gray-700 text-white"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}年
              </option>
            ))}
          </select>
        </div>
      )}

      {months.map((month) => (
        <div key={month}>
          <h2 className="text-lg font-bold mb-3">{month}</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <div
                key={cat}
                className="flex-shrink-0 w-48 bg-violet-500/20 shadow rounded-lg border p-4 cursor-pointer hover:shadow-lg transition"
                onClick={() => handleCardClick(month, cat)}
              >
                <div className="text-2xl font-bold text-white">{cat}</div>
                <div className="text-xl font-bold text-white mt-1">
                  {getAmount(month, cat).toLocaleString()} 円
                </div>
                <div className="text-xs text-gray-300 mt-3">
                  クリックして詳細
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* モーダル */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50 focus:outline-none"
      >
        <div className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-4xl rounded-xl bg-white/5 p-6 backdrop-blur-2xl">
            <DialogTitle className="text-lg font-bold text-white mb-4">
              {`${selectedMonth} の ${selectedCategory} 詳細`}
            </DialogTitle>

            {selectedMonth && selectedCategory && (
              <div className="overflow-x-auto">
                <table className="min-w-[700px] w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-500 border-b">
                    <tr>
                      <th className="px-1 py-2">日付</th>
                      <th className="px-1 py-2">入力者</th>
                      <th className="px-1 py-2">内容</th>
                      <th className="px-1 py-2">メモ</th>
                      <th className="px-1 py-2 text-right font-bold text-red-100">
                        金額
                      </th>
                      <th className="px-1 py-2 text-center">編集</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDetails(selectedMonth, selectedCategory).map((e) => (
                      <tr key={e.id} className="border-b">
                        <td className="px-4 py-2">
                          {new Date(e.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-1 py-2">{e.user}</td>
                        <td className="px-1 py-2">{e.content}</td>
                        <td className="px-1 py-2">
                          {e.memo || "（メモなし）"}
                        </td>
                        <td className="px-1 py-2 text-right font-bold text-red-100">
                          {e.amount.toLocaleString()} 円
                        </td>
                        <td className="px-1 py-2 flex gap-2 justify-center">
                          <UpdateExpenseModal
                            expenseId={e.id}
                            defaultValues={{
                              amount: e.amount,
                              content: e.content,
                              memo: e.memo,
                            }}
                            onUpdated={refetch}
                          />
                          <DeleteExpenseButton
                            expenseId={e.id}
                            onDeleted={refetch}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 text-right">
              <button
                className="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                閉じる
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ExpenseTable;
