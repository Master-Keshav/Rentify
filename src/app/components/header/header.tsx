'use client'

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import './index.scss'
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoaderModal from "@/app/components/Loader/LoaderModal";

const Header = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        try {
            setLoading(true);
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            error = error.response.data
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <header className="header">
            {loading ? <LoaderModal isOpen={loading} /> : <></>}
            <div className="header-left">
                <Link href="/">
                    <Image src="/logo.png" alt="Logo" width={40} height={40} />
                    <span className="logo-text">Rentify</span>
                </Link>
            </div>
            <div className="header-middle">
                <nav>
                    <ul>
                        <li>
                            <Link href="/dashboard">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/projects">
                                Projects
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="header-right">
                <div className="profile">
                    <div className="profile-pic">
                        <Image src="/profile-pic.jpg" alt="Profile Picture" width={40} height={40} />
                    </div>
                    <div className="profile-dropdown">
                        <button className="dropdown-btn">Profile</button>
                        <div className="dropdown-content">
                            <Link href="/profile">
                                My Profile
                            </Link>
                            <Link href="/settings">
                                Settings
                            </Link>
                        </div>
                    </div>
                </div>
                <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
        </header>
    );
};

export default Header;
