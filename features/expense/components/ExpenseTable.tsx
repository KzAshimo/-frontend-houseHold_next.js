"use client";

import { useState } from "react";
import useExpenseIndex from "@/features/expense/hooks/useIndexExpenseHook";
import Modal from "@/components/items/modal/categoryModal";
import DeleteExpenseButton from "./expenseDeleteButton";
import UpdateExpenseModal from "./expenseUpdateModal";

const ExpenseTable = () => {
  const { expenses: initialExpense, isLoading, error } = useExpenseIndex();
  const [expenses, setExpenses] = useState<typeof initialExpense>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const months = Array.from(
    new Set(
      initialExpense.map((e) =>
        new Date(e.created_at).toLocaleString("ja-JP", {
          year: "numeric",
          month: "short",
        })
      )
    )
  );

  const categories = Array.from(new Set(initialExpense.map((e) => e.category)));

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

  const getDetails = (month: string, category: string) => {
    return initialExpense.filter(
      (e) =>
        new Date(e.created_at).toLocaleString("ja-JP", {
          year: "numeric",
          month: "short",
        }) === month && e.category === category
    );
  };

  const handleCardClick = (month: string, category: string) => {
    setSelectedMonth(month);
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>読み込み中...</div>;
  if (error) return <div className="text-red-500">データ取得失敗: {error}</div>;

  return (
    <div className="m-5 space-y-6">
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${selectedMonth} の ${selectedCategory} 詳細`}
      >
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
                    <td className="px-1 py-2">{e.memo || "（メモなし）"}</td>
                    <td className="px-1 py-2 text-right font-bold text-red-100">
                      {e.amount.toLocaleString()} 円
                    </td>

                    <td className="px-1 py-2 text-center">
                      <UpdateExpenseModal
                        expenseId={e.id}
                        defaultValues={{
                          amount: e.amount,
                          content: e.content,
                          memo: e.memo,
                        }}
                      />
                    </td>

                    <td className="px-1 py-2 text-center">
                      <DeleteExpenseButton
                        expenseId={e.id}
                        onDeleted={(id) => {
                          setExpenses((prev) =>
                            prev.filter((exp) => exp.id !== id)
                          );
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ExpenseTable;
