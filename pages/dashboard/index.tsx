"use client";
import ExpenseTable from "@/features/expense/components/ExpenseTable";
import "../../app/globals.css";
import Header from "@/components/header/Header";

const DashboardPage = () => {
  return (
    <div>
      <Header />
      <ExpenseTable/>
    </div>
  );
};

export default DashboardPage;