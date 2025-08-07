"use client";

import useExpenseIndex from "@/features/expense/hooks/useIndexHook";

const ExpenseTable = () => {
  const { expenses, isLoading, error } = useExpenseIndex();

  // 月とカテゴリの一覧を抽出
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

  // 月×カテゴリの金額集計
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

  if (isLoading) return <div>読み込み中...</div>;
  if (error) return <div className="text-red-500">データ取得失敗: {error}</div>;

  return (
    <div className="m-5 space-y-6 ">
      {months.map((month) => (
        <div key={month}>
          {/* 月のタイトル */}
          <h2 className="text-lg font-bold mb-3">{month}</h2>

          {/* カテゴリカードの横スクロール */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <div
                key={cat}
                className="flex-shrink-0 w-48 bg-white shadow rounded-lg border p-4 cursor-pointer hover:shadow-lg transition"
                onClick={() => console.log(`モーダルで ${month} の ${cat} を表示`)}
              >
                <div className="text-ml text-gray-500">{cat}</div>
                <div className="text-xl font-bold text-gray-800 mt-1">
                  {getAmount(month, cat).toLocaleString()} 円
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseTable;
