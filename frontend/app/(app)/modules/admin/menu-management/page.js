"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Trash2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

function MenuManagementPage() {
    const router = useRouter();

    const STORAGE_LIST_KEY = "oceanbreeze_menu_items_v1";

    const [items, setItems] = useState([]);
    const [showCount, setShowCount] = useState(10);
    const [search, setSearch] = useState("");

    // Load from localStorage
    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const raw = localStorage.getItem(STORAGE_LIST_KEY);
            const parsed = raw ? JSON.parse(raw) : [];
            setItems(Array.isArray(parsed) ? parsed : []);
        } catch (e) {
            setItems([]);
        }
    }, []);

    // Filter
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return items;

        return items.filter((it) => {
            const name = (it.menuName || it.name || "").toLowerCase();
            const availability = (it.availability || "").toLowerCase();
            const price = String(it.price || "").toLowerCase();
            const portion = (it.potionSize || it.portionSize || "").toLowerCase();
            return (
                name.includes(q) ||
                availability.includes(q) ||
                price.includes(q) ||
                portion.includes(q)
            );
        });
    }, [items, search]);

    const visible = useMemo(() => {
        return filtered.slice(0, Number(showCount));
    }, [filtered, showCount]);

    const handleDelete = (id) => {
        const ok = confirm("Delete this menu item?");
        if (!ok) return;

        const next = items.filter((it) => it.id !== id);
        setItems(next);
        localStorage.setItem(STORAGE_LIST_KEY, JSON.stringify(next));
    };

    const handleView = (id) => {
        alert(`View item: ${id} (create view page if you want)`);
    };

    const handleEdit = (id) => {
        router.push(`/modules/admin/menu-management/add-menu-item?id=${id}`);
    };

    return (
        <div className="flex-1 p-6 pt-20">
            {/* TOP: Title + Add Button */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-semibold text-gray-900">Menu Management</h1>

                <div className="flex justify-end items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() =>
                            router.push("/modules/admin/menu-management/add-menu-item")
                        }
                        title="Add New"
                        className="group h-10 w-10 px-0 overflow-hidden flex items-center justify-center gap-0 transition-all duration-200 hover:w-[210px] hover:px-3 hover:justify-start hover:gap-2 hover:bg-[#005477]/5 hover:border-[#005477]/30"
                    >
                        <Plus className="h-4 w-4 text-[#005477]" />
                        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-[#005477] opacity-0 transition-all duration-600 group-hover:max-w-[200px] group-hover:opacity-100">
                            Add New Menu Item
                        </span>
                    </Button>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="mt-8 rounded-md border bg-white shadow-sm">
                <div className="flex items-center justify-between gap-4 p-3">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-700">show</span>
                        <select
                            value={showCount}
                            onChange={(e) => setShowCount(Number(e.target.value))}
                            className="h-8 rounded-md border px-2 text-sm outline-none focus:ring-2 focus:ring-[#005477]/30"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="General Search"
                        className="h-8 w-[220px] rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-[#005477]/30"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="mt-6 overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-4">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th className="px-4 font-medium">Image</th>
                            <th className="px-4 font-medium">Name</th>
                            <th className="px-4 font-medium">Availability</th>
                            <th className="px-4 font-medium">Price</th>
                            <th className="px-4 font-medium">Portion Size</th>
                            <th className="px-4 font-medium text-right">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {visible.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                                    No menu items found.
                                </td>
                            </tr>
                        ) : (
                            visible.map((it) => (
                                <tr
                                    key={it.id}
                                    className="bg-[#005477]/25 rounded-xl overflow-hidden"
                                >
                                    <td className="px-4 py-3">
                                        <div className="h-14 w-20 overflow-hidden rounded-lg bg-white">
                                            {it.image ? (
                                                <img
                                                    src={it.image}
                                                    alt={it.menuName || "menu"}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-xs text-gray-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 text-gray-900 font-medium">
                                        {it.menuName || it.name || "-"}
                                    </td>

                                    <td className="px-4 py-3 text-gray-900">
                                        {it.availability || "-"}
                                    </td>

                                    <td className="px-4 py-3 text-gray-900">
                                        {it.price ? `LKR ${it.price}` : "-"}
                                    </td>

                                    <td className="px-4 py-3 text-gray-900">
                                        {it.potionSize || it.portionSize || "-"}
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex justify-end items-center gap-6 text-gray-900">
                                            <button
                                                type="button"
                                                onClick={() => handleView(it.id)}
                                                title="View"
                                                className="hover:opacity-80"
                                            >
                                                <Eye className="h-5 w-5" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDelete(it.id)}
                                                title="Delete"
                                                className="hover:opacity-80"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleEdit(it.id)}
                                                title="Edit"
                                                className="hover:opacity-80"
                                            >
                                                <Pencil className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MenuManagementPage;