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

interface UserState {
    email: string;
    password: string;
    username: string;
}

interface GoogleUserState {
    email: string;
    // password: string;
    username: string;
    imageUrl: string;
    googleId: string,
}

const SignupPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [user, setUser] = useState<UserState>({
        email: "",
        password: "",
        username: "",
    });
    const [googleUser, setGoogleUser] = useState<GoogleUserState>({
        email: "",
        // password: "",
        username: "",
        imageUrl: "",
        googleId: "",
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
            console.error(error.message);
            error = error.response?.data || error.message;
            toast.error(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        const { email, password, username } = user;
        if (email.length > 0 && password.length > 0 && username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

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
                name?: string,
                picture?: string,
                sub?: string
            };

            if (!decodedToken) {
                throw new Error("Failed to decode Google response.");
            }

            const payload = {
                email: decodedToken.email || "",
                username: decodedToken.name || "",
                imageUrl: decodedToken.picture || "",
                googleId: decodedToken.sub || "",
            };

            setGoogleUser(payload);

            try {
                const signupResponse = await axios.post("/api/users/google/signup", payload);
                console.log("Google signup success:", signupResponse.data);
                toast.success(signupResponse.data.message);
                router.push("/login");
            }
            catch (signupError: any) {
                console.error("Error signing up user:", signupError);
                signupError = signupError.response.data
                toast.error(signupError.message);
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
                    <div className="or-separator">
                        <span className="line"></span>
                        <span className="or">or</span>
                        <span className="line"></span>
                    </div>
                    <div className="google-signup-button">
                        <GoogleLogin
                            onSuccess={onGoogleSuccess}
                            onError={() => {
                                console.log('Login Failed');
                                toast.error("Google login failed");
                            }}
                        />
                    </div>
                    <div className="swap-page">
                        <Link href="/login" className="link">Go to Login Page</Link>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default SignupPage;
