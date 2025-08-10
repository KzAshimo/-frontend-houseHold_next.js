"use client";

import { useState } from "react";
import Header from "@/components/header/header";
import ExpenseTable from "@/features/expense/components/expenseTable";
import IncomeTable from "@/features/income/components/incomeTable";
import "../../app/globals.css";

const DashboardPage = () => {
  const [showExpense, setShowExpense] = useState(true);

  return (
    <div>
      <Header onToggleView={setShowExpense} />
      {showExpense ? <ExpenseTable /> : <IncomeTable />}
    </div>
  );
};

export default DashboardPage;
