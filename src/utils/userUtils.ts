import axios from "axios";
import { toast } from "react-hot-toast";
import { setLoading } from "@/redux/slices/loaderSlice";
import { AppDispatch } from "@/redux/store";

export const getUserDetails = async (dispatch: AppDispatch, setUserData: (data: any) => void) => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get('/api/users/me');
        console.log(res.data.user)
        setUserData(res.data.user);
    } catch (error: any) {
        console.error("Error fetching user details:", error.message);
        toast.error(error?.response?.data?.message || "Failed to Fetch User");
    } finally {
        dispatch(setLoading(false));
    }
};