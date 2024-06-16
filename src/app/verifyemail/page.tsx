"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";

import { setLoading } from "@/redux/slices/loaderSlice";

import './page.scss';

export default function VerifyEmailPage() {
    const dispatch = useDispatch();

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [error, setError] = useState<any>(null)

    const verifyUserEmail = async () => {
        try {
            dispatch(setLoading(true));
            const resp = await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
            toast.success("User Verified");
            let counter = 3;
            const interval = setInterval(() => {
                counter -= 1;
                setCountdown(counter);
                if (counter === 0) {
                    clearInterval(interval);
                    window.location.href = '/login'; // Redirect to login page after countdown
                }
            }, 1000);
        } catch (error: any) {
            console.log(error);
            toast.error("User not verified");
            setError(error.response.data.message)
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get("token");
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="container">
            <div className="card">
                <h1>Verify Email</h1>
                {verified ? (
                    <div className="timer">
                        <h3>Email verified successfully!</h3>
                        <h3>Redirecting in {countdown} seconds...</h3>
                        <div className="countdown"></div>
                    </div>
                ) : !!error ? (
                    <div className="timer">
                        <h3>Email verification failed due to below reason:</h3>
                        <h3>{error}</h3>
                    </div>
                ) : (
                    <h3>Verifying your email...</h3>
                )}
            </div>
        </div >
    );
}
