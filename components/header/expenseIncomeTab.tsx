"use client";

import { Tab, TabGroup, TabList } from "@headlessui/react";

type ExpenseIncomeTabsProps = {
  onChange?: (showExpense: boolean) => void; // true: 支出, false: 収入
  initialShowExpense?: boolean;
};

const ExpenseIncomeTabs = ({
  onChange,
  initialShowExpense = true,
}: ExpenseIncomeTabsProps) => {
  const initialIndex = initialShowExpense ? 0 : 1;

  return (
    <TabGroup
      defaultIndex={initialIndex}
      onChange={(index) => onChange?.(index === 0)}
    >
      <TabList className="flex gap-4 rounded-lg bg-slate-700/40 p-1">
        <Tab
          className="flex-1 rounded-md px-4 py-2 text-sm font-medium text-slate-200
            data-selected:bg-purple-600 data-selected:text-white
            focus:outline-none data-hover:bg-slate-600/50"
        >
          支出
        </Tab>
        <Tab
          className="flex-1 rounded-md px-4 py-2 text-sm font-medium text-slate-200
            data-selected:bg-emerald-600 data-selected:text-white
            focus:outline-none data-hover:bg-slate-600/50"
        >
          収入
        </Tab>
      </TabList>
    </TabGroup>
  );
};

export default ExpenseIncomeTabs;
