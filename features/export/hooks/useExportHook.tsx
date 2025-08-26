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
  const [result, setResult] = useState<Export>(null);

  const exportCsv = async ({ exportId }: ExportPayload) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await axiosInstance.post(`/api/v1/export/${exportId}/export`);
      setResult(res.data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    exportCsv,
    result,
    isLoading,
    error,
  };
};

export default useExportHook;
