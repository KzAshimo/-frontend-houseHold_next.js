import axiosInstance from "@/lib/axios";
import handleApiError from "@/lib/handleApiError";
import { useState } from "react";

const useDownloadExportHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadExport = async (exportId: number, fileName?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(
        `api/v1/export/download/${exportId}`,
        {
          responseType: "blob",
        }
      );

      const downloadName = fileName || `export_${exportId}.csv`;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", downloadName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    downloadExport,
    isLoading,
    error,
  };
};

export default useDownloadExportHook;
