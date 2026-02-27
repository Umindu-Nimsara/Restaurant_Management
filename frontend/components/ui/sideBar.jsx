"use client";

import React, { useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";

import BreadcrumbNav from "@/components/ui/breadcrumb"; //default import now works
import { sideBarIcon } from "@/components/ui/icon";

export default function SideMenu({ isOpen, setIsOpen, isMobileRoute = false }) {
    const router = useRouter();
    const pathname = usePathname();

    const [loadingName, setLoadingName] = useState(null);
    const [expanded, setExpanded] = useState({});

    const menuItems = useMemo(() => {
        return [
            {
                name: "Home",
                route: "/",
                icon: sideBarIcon.Home,
            },
            {
                name: "Menu Management",
                route: "/modules/admin/menu-management/",
                icon: sideBarIcon.HandPlatter,
            },
            {
                name: "Inventory Management",
                route: "/modules/admin/inventory-management/",
                icon: sideBarIcon.ShoppingCart,
            },
            {
                name: "Order Management",
                route: "/modules/admin/order-management/",
                icon: sideBarIcon.BadgeDollarSign,
            },
            {
                name: "Table Management",
                route: "/modules/admin/table-management/",
                icon: sideBarIcon.StoreIcon,
            },
            {
                name: "User Management",
                route: "/modules/admin/user-management/",
                icon: sideBarIcon.UserPen,
            },
        ];
    }, []);

    const toggleExpand = (key, parentKey) => {
        setExpanded((prev) => {
            const next = { ...prev };
            const isOpening = !prev[key];

            const removeSubtree = (root) => {
                const toRemove = Object.keys(next).filter(
                    (k) => k === root || k.startsWith(root + ">")
                );
                toRemove.forEach((k) => delete next[k]);
            };

            const keyDepth = key.split(">").length;
            const siblings = Object.keys(next).filter((k) => {
                const sameParent = k.startsWith(parentKey + ">");
                const sameDepth = k.split(">").length === keyDepth;
                return sameParent && sameDepth && k !== key;
            });

            siblings.forEach(removeSubtree);

            if (isOpening) next[key] = true;
            else removeSubtree(key);

            return next;
        });
    };

    const handleNavigate = (route, name) => {
        if (!route || !name) return;
        const safeRoute = route.startsWith("/") ? route : `/${route}`;

        setLoadingName(name);
        router.push(safeRoute);

        if (typeof window !== "undefined" && window.innerWidth < 640) setIsOpen(false);

        setTimeout(() => setLoadingName(null), 500);
    };

    const renderIcon = (icon) => {
        if (!icon) return null;

        if (typeof icon === "function") {
            const IconComp = icon;
            return (
                <IconComp
                    className="text-[#005477] dark:text-[#005477]"
                    style={{ width: 4, height: 4 }}
                />
            );
        }

        return <span className="text-[#005477] dark:text-[#005477]">{icon}</span>;
    };

    const normPath = (p) => p.replace(/\/+$/, "") || "/";
    const isRouteActive = (route) => {
        if (!route) return false;
        const r = normPath(route.startsWith("/") ? route : `/${route}`);
        const p = normPath(pathname || "/");
        return p === r || p.startsWith(r + "/");
    };

    const renderItems = (items, level = 0, parentKey = "ROOT") => {
        return items.map((item) => {
            const key = `${parentKey}>${item.name}`;
            const hasChildren = !!(item.subItems && item.subItems.length);
            const isExpanded = !!expanded[key];
            const isActive = isRouteActive(item.route);

            return (
                <div key={key}>
                    <button
                        type="button"
                        onClick={() => {
                            if (hasChildren) toggleExpand(key, parentKey);
                            else handleNavigate(item.route, item.name);
                        }}
                        className={cn(
                            "flex w-full items-center rounded-md transition-all cursor-pointer",
                            "hover:bg-gray-200 dark:hover:bg-gray-900",
                            "mt-2 p-2",
                            isActive ? "bg-gray-100 dark:bg-gray-900" : ""
                        )}
                        style={{ paddingLeft: isOpen ? 14 + level * 26 : 8 }}
                        title={item.name}
                    >
                        <div className="w-7 flex items-center justify-center">
                            {loadingName === item.name ? (
                                <div className="animate-spin h-5 w-5 border-2 border-[#005477] border-t-transparent rounded-full" />
                            ) : (
                                renderIcon(item.icon)
                            )}
                        </div>

                        {isOpen && (
                            <span className="ml-2 flex-1 text-sm text-gray-700 dark:text-gray-300 text-left">
                                {item.name}
                            </span>
                        )}

                        {isOpen && hasChildren && (
                            <ChevronDown
                                className={cn(
                                    "h-4 w-4 text-gray-500 transition-transform",
                                    isExpanded ? "rotate-180" : "rotate-0"
                                )}
                            />
                        )}
                    </button>

                    {hasChildren && isExpanded && isOpen && (
                        <div className="mt-1 border-l border-[#005477]/60 dark:border-[#005477]/20">
                            {renderItems(item.subItems, level + 1, key)}
                        </div>
                    )}
                </div>
            );
        });
    };

    if (isMobileRoute) return null;

    const handleMenuToggle = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            {isOpen && (
                <div
                    className="fixed inset-0 bg-white/70 dark:bg-black/70 z-30 sm:hidden"
                    onClick={handleMenuToggle}
                    aria-hidden="true"
                />
            )}

            <div
                className={cn(
                    "fixed top-16 left-0 bg-white dark:bg-black text-gray-700 dark:text-gray-300 shadow-lg flex flex-col transition-all duration-300 ease-in-out z-40 overflow-y-auto",
                    "sm:translate-x-0 sm:block",
                    isOpen ? "w-64 p-3" : "w-16 p-2",
                    "dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                )}
                style={{ height: "calc(100vh - 64px)" }}
            >
                <nav>{renderItems(menuItems)}</nav>
            </div>

            <div
                className={cn(
                    "fixed top-16 z-50 flex items-center gap-2 transition-all duration-300",
                    isOpen ? "left-4 sm:left-64" : "left-4 sm:left-16"
                )}
            >
                <button
                    onClick={handleMenuToggle}
                    className="p-2 ml-2 mt-5 bg-white dark:bg-black text-gray-700 dark:text-gray-300 rounded-md shadow-md dark:border dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                    {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
                </button>

                <div className="mt-5">
                    <BreadcrumbNav />
                </div>
            </div>
        </div>
    );
}