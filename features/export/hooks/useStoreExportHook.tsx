import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

type ExportPayload = {
  type: string;
  periodFrom: string;
  periodTo: string;
  fileName: string;
};

const useStoreExportHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const storeExport = async (payload: ExportPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      await axiosInstance.post("api/v1/export/store", payload);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    storeExport,
    isLoading,
    error,
  };
};

export default useStoreExportHook;
