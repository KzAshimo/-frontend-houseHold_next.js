import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

type Export = {
  result: boolean;
  export: {
    id: number;
    user_id: number;
    type: string;
    period_from: string;
    period_to: string;
    file_name: string;
    file_path: string;
    status: string;
  };
} | null;

type ExportPayload = {
  exportId: number;
};

const useExportHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exportData, setExportData] = useState<Export>(null);

  const runExport = async ({ exportId }: ExportPayload) => {
    setIsLoading(true);
    setError(null);
    setExportData(null);

    try {
      const res = await axiosInstance.post(`/api/v1/export/${exportId}/export`);
      setExportData(res.data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    exportData,
    runExport,
    isLoading,
    error,
  };
};

export default useExportHook;
