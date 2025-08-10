"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";

type ExpenseIncomeSwitchProps = {
  onChange?: (showExpense: boolean) => void;
  initialShowExpense?: boolean;
};

const ExpenseIncomeSwitch = ({
  onChange,
  initialShowExpense = true,
}: ExpenseIncomeSwitchProps) => {
  const [showExpense, setShowExpense] = useState(initialShowExpense);

  const handleChange = (checked: boolean) => {
    setShowExpense(checked);
    onChange?.(checked);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={showExpense}
        onChange={handleChange}
        className={`${
          showExpense ? "bg-indigo-600" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
      >
        <span
          className={`${
            showExpense ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
      <span className="text-sm font-medium text-gray-700 select-none">
        {showExpense ? "Expense" : "Income"}
      </span>
    </div>
  );
};

export default ExpenseIncomeSwitch;
