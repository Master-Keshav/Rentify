"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LoaderModal from "./loaderModal";

const LoaderWrapper: React.FC = () => {
    const isOpen = useSelector((state: RootState) => state.loader.loading);
    return isOpen ? <LoaderModal /> : null;
};

export default LoaderWrapper;