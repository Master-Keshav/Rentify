'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { setLoading } from "@/redux/slices/loaderSlice";
import { hideNotification } from "@/redux/slices/notificationSlice";

import "./page.scss";

const AddPassword = () => {
    const dispatch = useDispatch();
    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        dispatch(hideNotification());
    }, [])


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setPasswords({
            ...passwords,
            [id]: value,
        });
    };

    const addPassword = async () => {
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
            console.log("Added password successfully", response.data);
            toast.success("Password added successfuly");
            window.location.href = "/login";
        } catch (error: any) {
            console.error("Add password error", error);
            toast.error(error.response?.data?.message || "Failed to add password");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="backgroundContainer">
            <div className="wrapper">
                <div className="card">
                    <h1>Add Password</h1>
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
                    <button onClick={addPassword} disabled={!passwords.newPassword || !passwords.confirmPassword}>
                        Add Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPassword;
