import { BiSolidUserAccount } from "react-icons/bi";
import { FaBuilding, FaHeart } from "react-icons/fa6";
import { IoHome, IoLogIn, IoLogOut } from "react-icons/io5";
import { MdDashboard, MdPerson } from "react-icons/md";

export const navLink = [
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

export const hamburgerMidNoUserLinks = [
    {
        name: "Sign Up",
        link: "/signup",
        icon: <BiSolidUserAccount />
    },
    {
        name: "Login",
        link: "/login",
        icon: <IoLogIn />
    }
]

export const hamburgerMidUserLinks = [
    {
        name: "Log Out",
        link: "/logout",
        icon: <IoLogOut />
    }
]

export const hamburgerSmallLinks = [
    {
        name: "Home",
        link: "/",
        icon: <IoHome />
    },
    {
        name: "Properties",
        link: "/properties",
        icon: <FaBuilding />
    },
    {
        name: "Agents",
        link: "/agents",
        icon: <MdPerson />
    },
    {
        name: "Favs",
        link: "/likes",
        icon: <FaHeart />
    },
    {
        name: "Dashboard",
        link: "/dashboard",
        icon: <MdDashboard />
    },
]