"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { setLoading } from "@/redux/slices/loaderSlice";

import './page.scss';

const SignupPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSignup();
        }
    };

    const onSignup = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            toast.success(response.data.message);
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            error = error.response.data;
            toast.error(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="background-container">
            <div className="wrapper">
                <h1>Signup</h1>
                <div className="input-box">
                    <input
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="Username"
                    />
                </div>
                <div className="input-box">
                    <input
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="Email"
                    />
                </div>
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
                <button
                    disabled={buttonDisabled}
                    onClick={onSignup}
                >
                    Signup
                </button>
                <div className="swap-page">
                    <Link href="/login" className="link">Go to Login Page</Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
