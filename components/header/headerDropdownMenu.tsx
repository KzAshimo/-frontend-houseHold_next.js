import useLogout from "@/features/auth/hooks/useLogoutHook";
import ExpenseStoreModal from "@/features/expense/components/expenseStoreModal";
import IncomeStoreModal from "@/features/income/components/incomeStoreModal";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";

const HeaderDropdownMenu = () => {
  const { logout, isLoading } = useLogout();
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);

  return (
    <div className="w-52 text-right">
      <Menu __demoMode>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
          <Bars3Icon className="size-5 fill-white/60" />
          Menu
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
              <PencilIcon className="size-4 fill-white/30" />
              カテゴリ
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                追加 / 編集
              </kbd>
            </button>
          </MenuItem>

          <MenuItem
            as="button"
            onClick={() => setIsExpenseModalOpen(true)}
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
          >
            <PlusCircleIcon className="size-4 fill-white/30" />
            支出
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
              追加
            </kbd>
          </MenuItem>

          <MenuItem
            as="button"
            onClick={() => setIsIncomeModalOpen(true)}
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
          >
            <PlusCircleIcon className="size-4 fill-white/30" />
            収入
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
              追加
            </kbd>
          </MenuItem>

          <MenuItem>
            <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
              <TrashIcon className="size-4 fill-white/30" />
              Delete
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                ⌘D
              </kbd>
            </button>
          </MenuItem>

          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
              onClick={logout}
              disabled={isLoading}
            >
              <UserCircleIcon className="size-4 fill-white/30" />
              ログアウト
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>

      {/* 支出モーダル */}
      {isExpenseModalOpen && (
        <ExpenseStoreModal
          isOpen={isExpenseModalOpen}
          setIsOpen={setIsExpenseModalOpen}
          onSuccess={() => setIsExpenseModalOpen(false)}
        />
      )}

      {/* 収入モーダル */}
      {isIncomeModalOpen && (
        <IncomeStoreModal
          isOpen={isIncomeModalOpen}
          setIsOpen={setIsIncomeModalOpen}
          onSuccess={() => setIsIncomeModalOpen(false)}
        />
      )}
    </div>
  );
};

export default HeaderDropdownMenu;
