'use client'

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BiMenu, BiSolidUserAccount } from "react-icons/bi";
import { IoClose, IoLogIn, IoLogOut } from "react-icons/io5";
import { useDispatch } from "react-redux";

import Logo from '../../public/logo.png'
import noUserImage from '../../public/no-user-image.png'
import Button from "@/components/button";
import { hamburgerMidNoUserLinks, hamburgerMidUserLinks, hamburgerSmallLinks, navLink } from '@/constants/navbar'
import { UserDetailsInterface } from '@/interfaces/navbar'
import { setLoading } from "@/redux/slices/loaderSlice";
import { hideNotification, showNotification } from "@/redux/slices/notificationSlice";
import { getUserDetails } from "@/utils/userUtils";

import './styles/navbar.scss'

const useMediaQuery = (query: any) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addListener(listener);
        return () => media.removeListener(listener);
    }, [matches, query]);

    return matches;
};

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [user, setUser] = useState<UserDetailsInterface>({});
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hamburgerMidLinks, setHamburgerMidLinks] = useState(hamburgerMidNoUserLinks);

    const isLargeScreen = useMediaQuery('(min-width: 1425px)');
    const isMediumScreen = useMediaQuery('(min-width: 1100px) and (max-width: 1424px)');
    const isSmallScreen = useMediaQuery('(max-width: 1099px)');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                dispatch(setLoading(true));
                await getUserDetails(dispatch, setUser);
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchUserDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (user?.id) {
            setIsUserLoggedIn(true);
            setHamburgerMidLinks(hamburgerMidUserLinks);
        }
    }, [user])

    useEffect(() => {
        if (isLargeScreen) {
            setIsMenuOpen(false);
        }
    }, [isLargeScreen])

    const onResetPassword = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(`/api/users/resetpassword?email=${encodeURIComponent(user.email!)}`);
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
                if ('hasPassword' in user && !user.hasPassword) {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

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
                    <Image alt="Logo" src={Logo} width={140} height={80} loading="eager" />
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
                <Image src={`${user.imageUrl || noUserImage.src}`} alt="Profile Picture" width={60} height={60} />
                {
                    isUserLoggedIn ?
                        <div className="user-exists">
                            <div className="user-name">
                                Hi, {user.name?.split(' ')[0] || user.email!.split('@')[0]}
                            </div>
                            <Button
                                text="Log Out"
                                textColor="var(--white)"
                                iconColor="var(--emerald)"
                                backgroundColor="var(--charcoal-blue)"
                                handleOnClick={() => router.push('/login')}
                                logo={<IoLogOut />}
                            />
                        </div> :
                        <div className="no-user">
                            <Button
                                text="Log In"
                                textColor="var(--white)"
                                iconColor="var(--emerald)"
                                backgroundColor="var(--charcoal-blue)"
                                handleOnClick={() => router.push('/login')}
                                logo={<IoLogIn />}
                            />
                            <Button
                                text="Sign Up"
                                textColor="var(--white)"
                                iconColor="var(--emerald)"
                                backgroundColor="var(--charcoal-blue)"
                                handleOnClick={() => router.push('/signup')}
                                logo={<BiSolidUserAccount />}
                            />
                        </div>
                }
                <div className={`hamburger ${isMenuOpen ? 'invisible' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <BiMenu size={50} />
                </div>
            </div>
            <div className={`overlay ${isMenuOpen ? 'open' : ''}`}>
                <IoClose className="close-icon" size={30} onClick={() => setIsMenuOpen(false)} />
                <nav>
                    <ul>
                        {isMediumScreen && hamburgerMidLinks.map((item, idx) => (
                            <li key={idx}>
                                <Link onClick={() => setIsMenuOpen(false)} href={item.link}>
                                    {item.icon}
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        {isSmallScreen && hamburgerSmallLinks.concat(hamburgerMidNoUserLinks).map((item, idx) => (
                            <li key={idx}>
                                <Link onClick={() => setIsMenuOpen(false)} href={item.link}>
                                    {item.icon}
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;