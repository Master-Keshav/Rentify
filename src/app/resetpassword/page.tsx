'use client'

import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { setLoading } from "@/redux/slices/loaderSlice";

import "./page.scss";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setPasswords({
            ...passwords,
            [id]: value,
        });
    };

    const resetPassword = async () => {
        if (!passwords.newPassword || !passwords.confirmPassword || passwords.newPassword != passwords.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            dispatch(setLoading(true));
            const response = await axios.post("/api/users/resetpassword", {
                token: window.location.search.split("=")[1],
                newPassword: passwords.newPassword,
                confirmPassword: passwords.confirmPassword,
            });
            console.log("Reset password success", response.data);
            toast.success("Password reset successful");
            window.location.href = "/login";
        } catch (error: any) {
            console.error("Reset password error", error);
            toast.error(error.response?.data?.message || "Failed to reset password");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="backgroundContainer">
            <div className="wrapper">
                <div className="card">
                    <h1>Reset Password</h1>
                    <div className="inputBox">
                        <input
                            id="newPassword"
                            type="password"
                            value={passwords.newPassword}
                            onChange={handleInputChange}
                            placeholder="New Password"
                        />
                    </div>
                    <div className="inputBox">
                        <input
                            id="confirmPassword"
                            type="password"
                            value={passwords.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm Password"
                        />
                    </div>
                    <button onClick={resetPassword} disabled={!passwords.newPassword || !passwords.confirmPassword}>
                        Reset Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
