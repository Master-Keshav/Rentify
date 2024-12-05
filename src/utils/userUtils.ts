import axios from "axios";
import { toast } from "react-hot-toast";

import { setLoading } from "@/redux/slices/loaderSlice";
import { AppDispatch } from "@/redux/store";

export const getUserDetails = async (dispatch: AppDispatch, setUserData: (data: any) => void) => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get('/api/users/me');

        const userData = {
            ...res.data.user,
            id: res.data.user._id
        };

        delete userData._id;

        setUserData(userData);
    } catch (error: any) {
        console.error("Error fetching user details:", error.message);
        toast.error(error?.response?.data?.message || "Failed to Fetch User");
    } finally {
        dispatch(setLoading(false));
    }
};