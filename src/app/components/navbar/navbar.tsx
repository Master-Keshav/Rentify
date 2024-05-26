'use client'

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import LoaderModal from "@/app/components/loader/loaderModal";

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
        "name": "FAQs",
        "link": '/faq'
    },
    {
        "name": "About Us",
        "link": '/about'
    },
    {
        "name": "Connect",
        "link": '/connect'
    },
]

const navProfileLink = [
    {
        "name": "My Profile",
        "link": '/profile'
    },
    {
        "name": "Settings",
        "link": '/settings'
    },
]

const Navbar: any = () => {
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
                    <div>
                        <Image src="/logo.png" alt="Logo" width={120} height={150} />
                    </div>
                </Link>
            </div>
            <div className="header-middle">
                <nav>
                    <ul>
                        {
                            navLink.map((item, idx) => (
                                <>
                                    <li key={idx}>
                                        <Link href={item.link}>
                                            {item.name}
                                        </Link>
                                    </li>
                                    {idx === navLink.length - 1 ? null : <span>|</span>}
                                </>
                            ))
                        }
                    </ul>
                </nav>
            </div>
            <div className="header-right">
                <div className="profile">
                    <div className="profile-pic">
                        <Image src="/background.png" alt="Profile Picture" width={60} height={40} />
                    </div>
                    <nav className="dropdownmenu">
                        <ul>
                            <li>
                                <Link className="link menu" href='/'>Hi, Keshav</Link>
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
