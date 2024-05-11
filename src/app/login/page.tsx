"use client";

import axios from "axios";
import Link from "next/link";
import LoaderModal from "../components/Loader/LoaderModal";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import "./page.scss";

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onLogin();
        }
    }

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log(error.message);
            error = error.response.data
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <>
            <div className="background-container">
                {loading ? <LoaderModal isOpen={loading} /> : <></>}
                <div className="wrapper">
                    <h1>Login</h1>
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
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            onKeyDown={handleKeyPress}
                            placeholder="Password"
                        />
                    </div>
                    <div className="remember-forgot">
                        <label htmlFor="checkbox"><input type="checkbox" /> Remember me</label>
                        <a href="#">Forgot Password</a>
                    </div>
                    <button
                        onClick={onLogin}
                    >
                        Login here
                    </button>
                    <div className="swap-page">
                        <Link href="/signup" className="link">Go to Signup Page</Link>
                    </div>
                </div>
            </div >
        </>
    );
}

export default LoginPage