import { motion } from "framer-motion";
import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "@/redux/store";
import { hideNotification } from "@/redux/slices/notificationSlice";

import "./Notification.scss";

const Notification: React.FC = () => {
    const dispatch = useDispatch();
    const { isOpen, heading, bodyContent } = useSelector((state: RootState) => state.notification);

    const notificationVariants = {
        hidden: { x: "100%", opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const handleClose = () => {
        dispatch(hideNotification());
    };

    return (
        <motion.div
            className="notification"
            variants={notificationVariants}
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
        >
            <div className="notification-content">
                <button className="close-button" onClick={handleClose}>
                    <IoMdCloseCircle />
                </button>
                <h3>{heading}</h3>
                <p>{bodyContent}</p>
            </div>
        </motion.div>
    );
};

export default Notification;