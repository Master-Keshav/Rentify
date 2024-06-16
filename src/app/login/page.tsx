'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { setLoading } from "@/redux/slices/loaderSlice";

import "./page.scss";

const LoginPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (isForgotPassword) {
                onResetPassword();
            } else {
                onLogin();
            }
        }
    };

    const onLogin = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/");
        } catch (error: any) {
            console.log(error.message);
            error = error.response.data;
            toast.error(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const onResetPassword = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(`/api/users/resetpassword?email=${encodeURIComponent(user.email)}`);
            console.log("Reset password email sent", response.data);
            toast.success("Reset password email sent");
            setIsForgotPassword(false);
            setUser({
                email: "",
                password: "",
            });
        } catch (error: any) {
            console.log(error.message);
            error = error.response.data;
            toast.error(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && (!isForgotPassword ? user.password.length > 0 : true)) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user, isForgotPassword]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="background-container">
                <div className="wrapper">
                    <h1>{isForgotPassword ? "Reset Password" : "Login"}</h1>
                    <div className="input-box">
                        <input
                            id="email"
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Email"
                            onKeyDown={handleKeyPress}
                        />
                    </div>
                    {!isForgotPassword && (
                        <div className="input-box">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                onKeyDown={handleKeyPress}
                                placeholder="Password"
                            />
                            <span
                                className="icon"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    )}
                    <div className="remember-forgot">
                        {!isForgotPassword && (
                            <label htmlFor="checkbox">
                                <input type="checkbox" /> Remember me
                            </label>
                        )}
                        <a onClick={() => setIsForgotPassword(!isForgotPassword)}>
                            {isForgotPassword ? "Go back to Login" : "Forgot Password"}
                        </a>
                    </div>
                    <button
                        onClick={isForgotPassword ? onResetPassword : onLogin}
                        disabled={buttonDisabled}
                    >
                        {isForgotPassword ? "Reset Password" : "Login here"}
                    </button>
                    {!isForgotPassword && (
                        <div className="swap-page">
                            <Link href="/signup" className="link">Go to Signup Page</Link>
                        </div>
                    )}
                </div>
            </div >
        </>
    );
};

export default LoginPage;
