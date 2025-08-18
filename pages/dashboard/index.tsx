"use client";

import { useState } from "react";
import Header from "@/components/header/header";
import ExpenseTable from "@/features/expense/components/expenseTable";
import IncomeTable from "@/features/income/components/incomeTable";
import "../../app/globals.css";

const DashboardPage = () => {
  const [showExpense, setShowExpense] = useState(true);

  return (
    <div className="bg-gradient-to-r from-amber-350 from-10% via-sky-950 via-30% to-slate-950 to-75%">
      <Header onToggleView={setShowExpense} />
      {showExpense ? <ExpenseTable /> : <IncomeTable />}
    </div>
  );
};

export default DashboardPage;
