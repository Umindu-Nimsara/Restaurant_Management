"use client";

import React, { useState } from "react";
import SideMenu from "@/components/ui/sideBar";

export default function AppLayout({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="min-h-screen bg-background dark:bg-background-dark">
            <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />

            <main className={`pt-16 transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"}`}>
                {children}
            </main>
        </div>
    );
}