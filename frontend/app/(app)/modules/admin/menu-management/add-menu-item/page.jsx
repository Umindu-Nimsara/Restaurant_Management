"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "oceanbreeze_add_menu_item_v1";

const AVAILABILITY_OPTIONS = [
    { value: "Available", label: "Available" },
    { value: "Unavailable", label: "Unavailable" },
];

const CATEGORY_OPTIONS = [
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
    { value: "Beverages", label: "Beverages" },
    { value: "Dessert", label: "Dessert" },
];

export default function AddMenuItemPage() {
    const router = useRouter();
    const fileRef = useRef(null);

    const [imageDataUrl, setImageDataUrl] = useState(""); // base64 (for preview + storage)
    const [form, setForm] = useState({
        menuName: "",
        availability: "",
        price: "",
        potionSize: "",
        category: "",
        featured: "", // Yes/No
        description: "",
    });

    const [savedToast, setSavedToast] = useState(false);

    // -------------------------
    // Load from localStorage
    // -------------------------
    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);

            if (parsed?.form) setForm(parsed.form);
            if (parsed?.imageDataUrl) setImageDataUrl(parsed.imageDataUrl);
        } catch (e) {
            // ignore corrupted data
        }
    }, []);

    // -------------------------
    // Auto-save to localStorage
    // -------------------------
    useEffect(() => {
        if (typeof window === "undefined") return;

        const payload = {
            form,
            imageDataUrl,
            updatedAt: new Date().toISOString(),
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }, [form, imageDataUrl]);

    const isValid = useMemo(() => {
        return (
            imageDataUrl &&
            form.menuName.trim() &&
            form.availability &&
            form.price.trim() &&
            form.potionSize.trim() &&
            form.category &&
            form.featured &&
            form.description.trim()
        );
    }, [form, imageDataUrl]);

    const onPickImage = () => fileRef.current?.click();

    const onFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Optional: basic validation
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            return;
        }

        // Convert to base64
        const reader = new FileReader();
        reader.onload = () => {
            setImageDataUrl(String(reader.result || ""));
        };
        reader.readAsDataURL(file);
    };

    const setField = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleCancel = () => {
        router.back();
    };

    const handleSave = () => {
        if (!isValid) {
            alert("Please fill all required fields.");
            return;
        }

        // 1️⃣ Save data (already auto-saved OR you can push to array here)

        // OPTIONAL: If you are saving as list
        const existing =
            JSON.parse(localStorage.getItem("oceanbreeze_menu_items_v1")) || [];

        const newItem = {
            id: Date.now(),
            ...form,
            image: imageDataUrl,
            createdAt: new Date().toISOString(),
        };

        localStorage.setItem(
            "oceanbreeze_menu_items_v1",
            JSON.stringify([...existing, newItem])
        );

        // 2️⃣ Clear draft (optional)
        localStorage.removeItem(STORAGE_KEY);

        // 3️⃣ Navigate back to Menu Management page
        router.push("/modules/admin/menu-management");
    };

    const handleClearDraft = () => {
        if (typeof window === "undefined") return;

        localStorage.removeItem(STORAGE_KEY);
        setImageDataUrl("");
        setForm({
            menuName: "",
            availability: "",
            price: "",
            potionSize: "",
            category: "",
            featured: "",
            description: "",
        });
    };

    return (
        <div className="flex-1 p-6 pt-20">
            {/* Title */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Add New Menu Item</h1>
            </div>

            {/* Image Upload */}
            <div className="mb-8">
                <label className="text-sm font-medium text-gray-900">
                    Upload Images<span className="text-red-500">*</span>
                </label>

                <div
                    onClick={onPickImage}
                    role="button"
                    tabIndex={0}
                    className="mt-3 w-full rounded-xl border-2 border-dashed border-black/40 hover:border-[#005477] transition cursor-pointer bg-white"
                >
                    <div className="h-[180px] flex items-center justify-center">
                        {imageDataUrl ? (
                            <div className="w-full h-full p-3">
                                {/* preview */}
                                <img
                                    src={imageDataUrl}
                                    alt="Preview"
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-gray-600">
                                <ImagePlus className="h-12 w-12 text-black/60" />
                            </div>
                        )}
                    </div>
                </div>

                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onFileChange}
                />
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                {/* Menu Name */}
                <div>
                    <label className="text-sm font-medium text-gray-900">
                        Menu Name<span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={form.menuName}
                        onChange={(e) => setField("menuName", e.target.value)}
                        placeholder="Enter Name"
                        className="mt-3 h-12 rounded-xl shadow-sm"
                    />
                </div>

                {/* Availability */}
                <div>
                    <label className="text-sm font-medium text-gray-900">
                        Availability<span className="text-red-500">*</span>
                    </label>

                    <select
                        value={form.availability}
                        onChange={(e) => setField("availability", e.target.value)}
                        className="mt-3 h-12 w-full rounded-xl border border-input bg-white px-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#005477]/30"
                    >
                        <option value="" disabled>
                            --Select Availability--
                        </option>
                        {AVAILABILITY_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="text-sm font-medium text-gray-900">
                        Price<span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={form.price}
                        onChange={(e) => setField("price", e.target.value)}
                        placeholder="Enter Price"
                        className="mt-3 h-12 rounded-xl shadow-sm"
                    />
                </div>

                {/* Potion Size */}
                <div>
                    <label className="text-sm font-medium text-gray-900">
                        Potion Size<span className="text-red-500">*</span>
                    </label>
                    <Input
                        value={form.potionSize}
                        onChange={(e) => setField("potionSize", e.target.value)}
                        placeholder="Enter Potion size"
                        className="mt-3 h-12 rounded-xl shadow-sm"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="text-sm font-medium text-gray-900">
                        Category<span className="text-red-500">*</span>
                    </label>

                    <select
                        value={form.category}
                        onChange={(e) => setField("category", e.target.value)}
                        className="mt-3 h-12 w-full rounded-xl border border-input bg-white px-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#005477]/30"
                    >
                        <option value="" disabled>
                            --Select Category--
                        </option>
                        {CATEGORY_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Featured */}
                <div>
                    <label className="text-sm font-medium text-gray-900">
                        Featured<span className="text-red-500">*</span>
                    </label>

                    <select
                        value={form.featured}
                        onChange={(e) => setField("featured", e.target.value)}
                        className="mt-3 h-12 w-full rounded-xl border border-input bg-white px-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#005477]/30"
                    >
                        <option value="" disabled>
                            --Select Featured--
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>

            {/* Description */}
            <div className="mt-10">
                <label className="text-sm font-medium text-gray-900">
                    Description<span className="text-red-500">*</span>
                </label>

                <textarea
                    value={form.description}
                    onChange={(e) => setField("description", e.target.value)}
                    placeholder="Enter Description"
                    className="mt-3 w-full min-h-[220px] rounded-xl border border-input bg-white px-4 py-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-[#005477]/30"
                />
            </div>

            {/* Footer Buttons */}
            <div className="mt-10 flex items-center justify-end gap-4">
                <Button variant="outline" onClick={handleClearDraft}>
                    Clear Draft
                </Button>

                <Button variant="outline" onClick={handleCancel} className="border-[#005477] text-[#005477]">
                    Cancel
                </Button>

                <Button
                    onClick={handleSave}
                    className="bg-[#005477] hover:bg-[#005477]/90 text-white px-10"
                    disabled={!isValid}
                >
                    Save
                </Button>
            </div>

            {/* mini toast */}
            {savedToast && (
                <div className="fixed bottom-6 right-6 rounded-xl bg-[#005477] text-white px-4 py-3 shadow-lg">
                    Saved to localStorage ✅
                </div>
            )}
        </div>
    );
}