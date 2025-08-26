"use client";

import useExpenseIndex from "@/features/expense/hooks/useIndexExpenseHook";
import useIndexIncome from "@/features/income/hooks/useIndexIncomeHook";
import { useMemo } from "react";

type MonthlySummary = {
  month: string; // YYYY-MM
  incomeTotal: number;
  expenseTotal: number;
  balance: number;
};

const useExpenseIncomeSummaryHook = () => {
  const { incomes, isLoading: incomeLoading } = useIndexIncome();
  const { expenses, isLoading: expenseLoading } = useExpenseIndex();

  const summaries: MonthlySummary[] = useMemo(() => {
    const monthly: Record<string, MonthlySummary> = {};

    // --- 収入集計 ---
    incomes.forEach((inc) => {
      const month = inc.created_at.slice(0, 7);
      if (!monthly[month]) {
        monthly[month] = { month, incomeTotal: 0, expenseTotal: 0, balance: 0 };
      }
      monthly[month].incomeTotal += inc.amount;
    });

    // --- 支出集計 ---
    expenses.forEach((exp) => {
      const month = exp.created_at.slice(0, 7);
      if (!monthly[month]) {
        monthly[month] = { month, incomeTotal: 0, expenseTotal: 0, balance: 0 };
      }
      monthly[month].expenseTotal += exp.amount;
    });

    // --- 収支計算 ---
    Object.values(monthly).forEach((m) => {
      m.balance = m.incomeTotal - m.expenseTotal;
    });

    // 月順にソートして返す
    return Object.values(monthly).sort((a, b) => (a.month < b.month ? -1 : 1));
  }, [incomes, expenses]);

  return {
    summaries,
    isLoading: incomeLoading || expenseLoading,
  };
};

export default useExpenseIncomeSummaryHook;
