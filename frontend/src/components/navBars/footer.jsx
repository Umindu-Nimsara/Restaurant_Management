import React from 'react'
import {
    ArrowRight,
    ChevronRight,
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
} from "lucide-react";
import { Separator } from "../ui/separator";

const NAV = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Menu", href: "#" },
    { label: "Contact", href: "#" },
];

function footer() {
    return (
        <div>
            {/* FOOTER */}
            <footer className="bg-[#2a2a2a] text-white">
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-full bg-orange-500/15 grid place-items-center">
                            <span className="text-orange-400 font-bold">f</span>
                        </div>
                        <span className="font-semibold tracking-tight">food</span>
                    </div>

                    <p className="mt-3 text-sm text-white/70 max-w-md">
                        Lorem ipsum dolor sit amet adipisicing.
                        consectetur adipiscing elit.
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                        <a
                            href="#"
                            className="h-9 w-9 rounded-full bg-white/10 grid place-items-center hover:bg-white/15 transition"
                        >
                            <Facebook className="h-4 w-4" />
                        </a>
                        <a
                            href="#"
                            className="h-9 w-9 rounded-full bg-white/10 grid place-items-center hover:bg-white/15 transition"
                        >
                            <Twitter className="h-4 w-4" />
                        </a>
                        <a
                            href="#"
                            className="h-9 w-9 rounded-full bg-white/10 grid place-items-center hover:bg-white/15 transition"
                        >
                            <Instagram className="h-4 w-4" />
                        </a>
                        <a
                            href="#"
                            className="h-9 w-9 rounded-full bg-white/10 grid place-items-center hover:bg-white/15 transition"
                        >
                            <Linkedin className="h-4 w-4" />
                        </a>
                    </div>

                    <Separator className="my-8 bg-white/10" />

                    <div className="flex flex-col items-center gap-3 text-sm text-white/70 md:flex-row md:gap-8">
                        {NAV.map((n) => (
                            <a key={n.label} href="#" className="hover:text-white">
                                {n.label}
                            </a>
                        ))}
                        <a href="#" className="hover:text-white">
                            Shop
                        </a>
                    </div>

                    <Separator className="my-8 bg-white/10" />

                    <div className="w-full flex flex-col gap-3 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
                        <span>© Copyright 2026</span>
                        <div className="flex items-center justify-center gap-4">
                            <a href="#" className="hover:text-white">
                                Terms and Condition
                            </a>
                            <a href="#" className="hover:text-white">
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default footer