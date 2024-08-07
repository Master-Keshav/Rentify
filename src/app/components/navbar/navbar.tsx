'use client'

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { setLoading } from "@/redux/slices/loaderSlice";
import { hideNotification, showNotification } from "@/redux/slices/notificationSlice";
import { getUserDetails } from "@/utils/userUtils";

import './index.scss'

const navLink = [
    {
        "name": "Home",
        "link": '/'
    },
    {
        "name": "Properties",
        "link": '/properties'
    },
    {
        "name": "Agents",
        "link": '/agents'
    },
    {
        "name": "Favs",
        "link": '/likes'
    },
    {
        "name": "Dashboard",
        "link": '/dashboard'
    },
]

const navProfileLink = [
    {
        "name": "My Profile",
        "link": '#'
    },
    {
        "name": "Settings",
        "link": '#'
    },
]

interface UserDetailsInterface {
    id?: string;
    username?: string;
    name?: string;
    email?: string;
    phonenumber?: string | number;
    experience?: string | number;
    about?: string;
    imageUrl?: string;
    hasPassword?: boolean;
}

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [userData, setUserData] = useState<UserDetailsInterface>({});

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                dispatch(setLoading(true));
                await getUserDetails(dispatch, setUserData);
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchUserDetails();
    }, []);

    const onResetPassword = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(`/api/users/resetpassword?email=${encodeURIComponent(userData.email!)}`);
            console.log("Reset password email sent", response.data);
            toast.success("Reset password email sent");
            dispatch(hideNotification());
        } catch (error: any) {
            console.log(error.message);
            error = error.response.data;
            toast.error(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        const showPasswordNotification = async () => {
            try {
                if ('hasPassword' in userData && !userData.hasPassword) {
                    dispatch(
                        showNotification({
                            heading: "Password Required",
                            bodyContent: (
                                <p>
                                    Please add a password to secure your account.
                                    <span onClick={onResetPassword}>Click here.</span>
                                </p>
                            ),
                        })
                    );
                }
            } catch (error: any) {
                console.error("Error hashing token:", error.message);
            }
        };

        showPasswordNotification();
    }, [userData]);

    const logout = async () => {
        try {
            dispatch(setLoading(true));
            // await axios.get('/api/users/logout')
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            error = error.response.data
            toast.error(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <Link href="/">
                    <div>
                        <Image src="/logo.png" alt="Logo" width={120} height={150} />
                    </div>
                </Link>
            </div>
            <div className="header-middle">
                <nav>
                    <ul>
                        {navLink.map((item, idx) => (
                            <li key={idx}>
                                <Link href={item.link}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="header-right">
                <div className="profile">
                    <div className="profile-pic">
                        <Image src={`${userData.imageUrl || "/background.png"}`} alt="Profile Picture" width={60} height={40} />
                    </div>
                    <nav className="dropdownmenu">
                        <ul>
                            <li>
                                <Link className="link menu" href='/'>Hi, {userData.name?.split(' ')[0] || userData.username?.split(' ')[0] || userData.username}</Link>
                                <ul id="submenu">
                                    {navProfileLink.map((item, idx) => (
                                        <li key={idx}>
                                            <Link className="link" href={item.link}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
        </header>
    );
};

export default Navbar;
