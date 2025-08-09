import axios from "axios"

// 共通エラー処理
const handleApiError = (err: unknown):string => {
    if(axios.isAxiosError(err) && err.response){
        const responseData = err.response.data as {message?: string};
        return responseData.message || "エラーが発生しました。";
    }
    if(err instanceof Error){
        return err.message;
    }
    return "不明なエラーが発生しました。";
};

export default handleApiError;