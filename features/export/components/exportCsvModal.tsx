import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import ExportCsvForm from "./exportCsvForm";

const ExportCsvModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        CSV エクスポート
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-10 flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-black/50">
            <div className="bg-white p-6 rounded shadow-lg z-20 w-full max-w-lg">
              <Dialog.Title className="text-lg font-bold mb-4">
                CSV エクスポート
              </Dialog.Title>
              <ExportCsvForm />
              <div className="mt-4 text-right">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ExportCsvModal;
