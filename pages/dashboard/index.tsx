"use client";
import ExpenseTable from "@/features/expense/components/expenseTable";
import "../../app/globals.css";
import Header from "@/components/header/header";

const DashboardPage = () => {
  return (
    <div>
      <Header />
      <ExpenseTable/>
    </div>
  );
};

export default DashboardPage;