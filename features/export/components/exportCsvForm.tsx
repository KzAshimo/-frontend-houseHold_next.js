"use client";

import { useState } from "react";
import useStoreExportHook from "@/features/export/hooks/useStoreExportHook";
import useExportHook from "@/features/export/hooks/useExportHook";
import useDownloadExportHook from "@/features/export/hooks/useDownloadExportHook";

type ExportItem = {
  id: number;
  user_id: number;
  type: string;
  period_from: string;
  period_to: string;
  file_name?: string;
  file_path?: string;
  status: string;
};

const ExportCsvForm = () => {
  const { storeExport, isLoading: isStoring, error: storeError } = useStoreExportHook();
  const { exportData, runExport, isLoading: isExporting, error: exportError } = useExportHook();
  const { downloadExport, isLoading: isDownloading, error: downloadError } = useDownloadExportHook();

  const [form, setForm] = useState({
    type: "",
    periodFrom: "",
    periodTo: "",
    fileName: "",
  });

  // --- フォーム入力変更 ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- データ登録 ---
  const handleStore = async () => {
    await storeExport(form);
  };

  // --- CSV 変換 ---
const handleExport = async (exportId: number) => {
    await runExport({ exportId });
};

  // --- CSV ダウンロード ---
  const handleDownload = async (exportId: number, fileName?: string) => {
    await downloadExport(exportId, fileName);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">CSV エクスポート</h2>

      {/* フォーム */}
      <div className="space-y-2">
        <input
          name="type"
          placeholder="タイプ"
          value={form.type}
          onChange={handleChange}
          className="border p-1"
        />
        <input
          name="periodFrom"
          type="date"
          value={form.periodFrom}
          onChange={handleChange}
          className="border p-1"
        />
        <input
          name="periodTo"
          type="date"
          value={form.periodTo}
          onChange={handleChange}
          className="border p-1"
        />
        <input
          name="fileName"
          placeholder="ファイル名"
          value={form.fileName}
          onChange={handleChange}
          className="border p-1"
        />
        <button
          onClick={handleStore}
          disabled={isStoring}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          {isStoring ? "登録中..." : "登録"}
        </button>
        {storeError && <p className="text-red-500">{storeError}</p>}
      </div>

      {/* 登録済みエクスポート */}
      {exportData && (
        <div>
          <h3 className="font-semibold">登録済みエクスポート</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <span>{exportData.export.file_name || `export_${exportData.export.id}`}</span>
              <button
                onClick={() => handleExport(exportData.export.id)}
                disabled={isExporting}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                {isExporting ? "変換中..." : "変換"}
              </button>
              <button
                onClick={() => handleDownload(exportData.export.id, exportData.export.file_name)}
                disabled={isDownloading}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                {isDownloading ? "ダウンロード中..." : "ダウンロード"}
              </button>
            </li>
          </ul>
          {exportError && <p className="text-red-500">{exportError}</p>}
          {downloadError && <p className="text-red-500">{downloadError}</p>}
        </div>
      )}
    </div>
  );
};

export default ExportCsvForm;
