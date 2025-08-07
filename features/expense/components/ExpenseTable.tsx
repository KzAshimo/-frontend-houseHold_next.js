"use client";

import { useState } from "react";
import useExpenseIndex from "@/features/expense/hooks/useIndexHook";
import Modal from "@/components/items/modal/CategoryModal";

const ExpenseTable = () => {
  const { expenses, isLoading, error } = useExpenseIndex();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const months = Array.from(
    new Set(
      expenses.map((e) =>
        new Date(e.created_at).toLocaleString("ja-JP", {
          year: "numeric",
          month: "short",
        })
      )
    )
  );

  const categories = Array.from(new Set(expenses.map((e) => e.category)));

  const getAmount = (month: string, category: string) => {
    return expenses
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
    return expenses.filter(
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
    <div className="mt-3 space-y-6">
      {months.map((month) => (
        <div key={month}>
          <h2 className="text-lg font-bold mb-3">{month}</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <div
                key={cat}
                className="flex-shrink-0 w-48 bg-white shadow rounded-lg border p-4 cursor-pointer hover:shadow-lg transition"
                onClick={() => handleCardClick(month, cat)}
              >
                <div className="text-sm text-gray-500">{cat}</div>
                <div className="text-xl font-bold text-gray-800 mt-1">
                  {getAmount(month, cat).toLocaleString()} 円
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* モーダル */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${selectedMonth} の ${selectedCategory} 詳細`}
      >
        {selectedMonth && selectedCategory && (
          <ul className="space-y-2">
            {getDetails(selectedMonth, selectedCategory).map((e) => (
              <li
                key={e.id}
                className="border-b pb-1 flex justify-between text-sm"
              >
                <span>{e.memo || "（メモなし）"}</span>
                <span className="font-bold">{e.amount.toLocaleString()} 円</span>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </div>
  );
};

export default ExpenseTable;
