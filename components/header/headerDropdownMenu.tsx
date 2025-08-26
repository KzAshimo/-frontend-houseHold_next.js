import useLogout from "@/features/auth/hooks/useLogoutHook";
import IndexCategoryModal from "@/features/category/components/categoryIndexModal";
import ExpenseStoreModal from "@/features/expense/components/expenseStoreModal";
import ExportCsvModal from "@/features/export/components/ExportCsvModal";
import IncomeStoreModal from "@/features/income/components/incomeStoreModal";
import IndexNotificationModal from "@/features/notification/components/notificationIndexModal";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArrowDownCircleIcon,
  Bars3Icon,
  BellAlertIcon,
  ChevronDownIcon,
  PencilIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";

const HeaderDropdownMenu = () => {
  const { logout, isLoading } = useLogout();
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

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
          className="w-52 origin-top-right rounded-xl border border-white/50 bg-black/80 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          <MenuItem
            as="button"
            onClick={() => setIsCategoryModalOpen(true)}
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
          >
            <PencilIcon className="size-4 fill-white/50" />
            カテゴリ
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
              追加 / 編集
            </kbd>
          </MenuItem>

          <MenuItem
            as="button"
            onClick={() => setIsExpenseModalOpen(true)}
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
          >
            <PlusCircleIcon className="size-4 fill-white/50" />
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
            <PlusCircleIcon className="size-4 fill-white/50" />
            収入
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
              追加
            </kbd>
          </MenuItem>

          <MenuItem
            as="button"
            onClick={() => setIsNotificationModalOpen(true)}
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
          >
            <BellAlertIcon className="size-4 fill-white/50" />
            お知らせ
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
              追加 / 編集
            </kbd>
          </MenuItem>

          <MenuItem
            as="button"
            onClick={() => setIsExportModalOpen(true)}
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
          >
            <ArrowDownCircleIcon className="size-4 fill-white/50" />
            CSV出力
            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
              ダウンロード
            </kbd>
          </MenuItem>

          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
              onClick={logout}
              disabled={isLoading}
            >
              <UserCircleIcon className="size-4 fill-white/50" />
              ログアウト
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>

      {/* カテゴリモーダル */}
      {isCategoryModalOpen && (
        <IndexCategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
        />
      )}

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

      {/* お知らせモーダル */}
      {isNotificationModalOpen && (
        <IndexNotificationModal
          isOpen={isNotificationModalOpen}
          onClose={() => setIsNotificationModalOpen(false)}
        />
      )}

      {/* CSVダウンロードモーダル */}
      {isExportModalOpen && (
        <ExportCsvModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}
    </div>
  );
};

export default HeaderDropdownMenu;
