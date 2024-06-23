'use client'

import axios from "axios";
import jwt from 'jsonwebtoken';
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from "@react-oauth/google";
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

    const onGoogleSuccess = async (googleResponse: CredentialResponse) => {
        try {
            dispatch(setLoading(true));

            if (!googleResponse.credential) {
                throw new Error("Google response does not contain a credential.");
            }

            const decodedToken = jwt.decode(googleResponse.credential) as {
                email?: string,
                sub?: string
            };

            if (!decodedToken) {
                throw new Error("Failed to decode Google response.");
            }

            const payload = {
                email: decodedToken.email || "",
                googleId: decodedToken.sub || "",
            };

            console.log(payload)
            try {
                const loginResponse = await axios.post("/api/users/google/login", payload);
                console.log("Google login success:", loginResponse.data);
                toast.success("Login success");
                router.push("/");
            } catch (error: any) {
                console.log(error.message)
                error = error.response.data;
                toast.error(error.message);
            }

        } catch (decodeError: any) {
            console.error("Error decoding Google response:", decodeError.message);
            toast.error("Failed to decode Google response");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
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
                    <div className="google-login-button">
                        <GoogleLogin
                            onSuccess={onGoogleSuccess}
                            onError={() => {
                                console.log('Login Failed');
                                toast.error("Google login failed");
                            }}
                        />
                    </div>
                    {!isForgotPassword && (
                        <>
                            <div className="swap-page">
                                <Link href="/signup" className="link">Go to Signup Page</Link>
                            </div>
                        </>
                    )}
                </div>
            </div >
        </GoogleOAuthProvider >
    );
};

export default LoginPage;
