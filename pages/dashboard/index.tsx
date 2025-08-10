"use client";
import ExpenseTable from "@/features/expense/components/expenseTable";
import "../../app/globals.css";
import Header from "@/components/header/header";
import IncomeTable from "@/features/income/components/incomeTable";

const DashboardPage = () => {
  return (
    <div>
      <Header />
      <ExpenseTable/>
      <IncomeTable/>
    </div>
  );
};

export default DashboardPage;