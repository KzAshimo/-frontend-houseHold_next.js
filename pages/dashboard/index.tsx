"use client";

import { useState } from "react";
import IncomeTable from "@/features/income/components/incomeTable";
import "../../app/globals.css";
import LoginNotificationModal from "@/features/notification/components/notificationForLoginModal";
import Header from "@/components/header/Header";
import ExpenseTable from "@/features/expense/components/ExpenseTable";

const DashboardPage = () => {
  const [showExpense, setShowExpense] = useState(true);

  return (
    <div className="bg-[url('/image/dashboard.jpg')] relative min-h-screen px-4 bg-cover bg-center">
      <Header onToggleView={setShowExpense} />
      {showExpense ? <ExpenseTable /> : <IncomeTable />}
      <LoginNotificationModal />
    </div>
  );
};

export default DashboardPage;
