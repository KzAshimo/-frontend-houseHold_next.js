"use client";

import { useMemo, useState } from "react";
import useExpenseIncomeSummaryHook from "../hooks/useExpenseIncomeSummaryHook";

const ExpenseIncomeSummaryTable = () => {
  const { summaries, isLoading } = useExpenseIncomeSummaryHook();

  // 年リストを useMemo で作成
  const years = useMemo(() => {
    const y = Array.from(
      new Set(summaries.map((s) => s.month.split("-")[0]))
    );
    return y.sort().reverse();
  }, [summaries]);

  // 初期選択は最新の年
  const [selectedYear, setSelectedYear] = useState<string>(
    years.length > 0 ? years[0] : ""
  );

  // 選択した年の summaries を useMemo で取得
  const filtered = useMemo(
    () => [...summaries].filter((s) => s.month.startsWith(selectedYear)).reverse(),
    [summaries, selectedYear]
  );

  if (isLoading) return <p>読み込み中...</p>;

  return (
    <div className="space-y-6">
      {/* 年切り替え */}
      <div className="mb-4">
        <label className="mr-2 text-white font-bold">年を選択:</label>
        <select
          className="rounded-md bg-gray-700 text-white px-2 py-1"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}年
            </option>
          ))}
        </select>
      </div>

      {/* 月ごとのカード */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {filtered.map((s) => (
          <div
            key={s.month}
            className="flex-shrink-0 w-64 bg-gray-800/60 shadow rounded-lg border p-4 hover:shadow-lg transition text-white"
          >
            <div className="text-lg font-bold mb-3">{s.month.split("-")[1]}月</div>

            <div className="flex justify-between text-emerald-400">
              <span>収入</span>
              <span>{s.incomeTotal.toLocaleString()} 円</span>
            </div>

            <div className="flex justify-between text-rose-400 mt-2">
              <span>支出</span>
              <span>{s.expenseTotal.toLocaleString()} 円</span>
            </div>

            <div
              className={`flex justify-between mt-3 text-lg font-bold ${
                s.balance >= 0 ? "text-white" : "text-rose-300"
              }`}
            >
              <span>差額</span>
              <span>{s.balance.toLocaleString()} 円</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseIncomeSummaryTable;
