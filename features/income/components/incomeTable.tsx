import { useState, useMemo } from "react";
import useIncomeIndex from "@/features/income/hooks/useIndexIncomeHooks";
import UpdateIncomeModal from "./incomeUpdateModal";
import DeleteIncomeButton from "./incomeDeleteButton";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import ExpenseIncomeSummaryTable from "@/features/expense_income/components/expenceIncomeSummary";

const IncomeTable = () => {
  const {
    incomes: initialIncome,
    isLoading,
    error,
    refetch,
  } = useIncomeIndex();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // ✅ 年リスト
  const years = useMemo(
    () =>
      Array.from(
        new Set(
          initialIncome.map((i) =>
            new Date(i.created_at).getFullYear().toString()
          )
        )
      ).sort((a, b) => Number(b) - Number(a)), // 新しい年を先頭に
    [initialIncome]
  );

  // ✅ 選択中の年（デフォルトは最新の年）
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  if (selectedYear === null && years.length > 0) {
    setSelectedYear(years[0]);
  }

  // ✅ 月リスト（選択した年だけ）
  const months = useMemo(
    () =>
      Array.from(
        new Set(
          initialIncome
            .filter(
              (i) =>
                new Date(i.created_at).getFullYear().toString() === selectedYear
            )
            .map((i) =>
              new Date(i.created_at).toLocaleString("ja-JP", {
                year: "numeric",
                month: "short",
              })
            )
        )
      ),
    [initialIncome, selectedYear]
  );

  // カテゴリリスト
  const categories = useMemo(
    () => Array.from(new Set(initialIncome.map((i) => i.category))),
    [initialIncome]
  );

  // 集計
  const getAmount = (month: string, category: string) =>
    initialIncome
      .filter(
        (i) =>
          new Date(i.created_at).toLocaleString("ja-JP", {
            year: "numeric",
            month: "short",
          }) === month && i.category === category
      )
      .reduce((sum, i) => sum + i.amount, 0);

  // 詳細取得
  const getDetails = (month: string, category: string) =>
    initialIncome.filter(
      (i) =>
        new Date(i.created_at).toLocaleString("ja-JP", {
          year: "numeric",
          month: "short",
        }) === month && i.category === category
    );

  // カードクリック
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
      {/* ✅ 年セレクト */}
      <div className="mb-4">
        <label className="mr-2 text-white font-bold">年を選択:</label>
        <select
          className="rounded-md bg-gray-700 text-white px-2 py-1"
          value={selectedYear ?? ""}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}年
            </option>
          ))}
        </select>
      </div>

      {months.map((month) => (
        <div key={month}>
          <h2 className="text-lg font-bold mb-3">{month}</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <div
                key={cat}
                className="flex-shrink-0 w-48 bg-emerald-500/20 shadow rounded-lg border p-4 cursor-pointer hover:shadow-lg transition"
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

      {/* ✅ モーダル */}
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
                      <th className="px-1 py-2 text-right font-bold text-green-100">
                        金額
                      </th>
                      <th className="px-1 py-2 text-center">編集</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDetails(selectedMonth, selectedCategory).map((i) => (
                      <tr key={i.id} className="border-b">
                        <td className="px-4 py-2">
                          {new Date(i.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-1 py-2">{i.user}</td>
                        <td className="px-1 py-2">{i.content}</td>
                        <td className="px-1 py-2">
                          {i.memo || "（メモなし）"}
                        </td>
                        <td className="px-1 py-2 text-right font-bold text-green-100">
                          {i.amount.toLocaleString()} 円
                        </td>
                        <td className="px-1 py-2 flex gap-2 justify-center">
                          <UpdateIncomeModal
                            incomeId={i.id}
                            defaultValues={{
                              amount: i.amount,
                              content: i.content,
                              memo: i.memo,
                            }}
                            onUpdated={refetch}
                          />
                          <DeleteIncomeButton
                            incomeId={i.id}
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

export default IncomeTable;
