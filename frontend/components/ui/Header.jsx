"use client";

import React from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header({
    title = "OceanBreeze",
    onLogout,
    profileHref = "/profile",
    showProfile = true,
    showLogout = true,
    className,
}) {
    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 h-16",
                "bg-white dark:bg-black",
                "border dark:border-white/10",
                className
            )}
        >
            <div className="h-full px-6 flex items-center justify-between">
                {/* Left: Brand */}
                <Link href="/" className="select-none">
                    <span className="text-2xl font-semibold tracking-tight text-[#005477]">
                        {title}
                    </span>
                </Link>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    {showProfile && (
                        <Link
                            href={profileHref}
                            className={cn(
                                "h-10 w-10 rounded-full",
                                "bg-black/5 dark:bg-white/10",
                                "flex items-center justify-center",
                                "hover:bg-black/10 dark:hover:bg-white/15",
                                "transition"
                            )}
                            aria-label="Profile"
                            title="Profile"
                        >
                            <User className="h-5 w-5 text-[#005477]" />
                        </Link>
                    )}

                    {showLogout && (
                        <button
                            type="button"
                            onClick={onLogout}
                            className={cn(
                                "h-10 w-10 rounded-md",
                                "flex items-center justify-center",
                                "hover:bg-black/5 dark:hover:bg-white/10",
                                "transition"
                            )}
                            aria-label="Logout"
                            title="Logout"
                        >
                            <LogOut className="h-6 w-6 text-[#005477]" />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}