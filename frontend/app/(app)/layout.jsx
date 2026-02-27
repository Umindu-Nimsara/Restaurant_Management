"use client";

import React, { useState } from "react";
import SideMenu from "@/components/ui/sideBar";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/lib/auth";
import Header from "@/components/ui/Header";

export default function AppLayout({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const router = useRouter();
    // const { logout } = useAuth();
    const handleLogout = () => {
        // logout();
        router.push("/"); // go back to landing
    };

    return (
        <div className="min-h-screen bg-background dark:bg-background-dark">
            <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            <Header
                title="OceanBreeze"
                onLogout={handleLogout}
                profileHref="/profile"
                showProfile={true}
                showLogout={true}
            />
            <main className={`pt-16 transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"}`}>
                {children}
            </main>
        </div>
    );
}