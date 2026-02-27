// app/page.js

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { modules } from "@/components/ui/module";

export default function AdminHomePage() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background dark:bg-background-dark px-4">

            {/* Logo Section */}
            <div className="mb-10 flex justify-center">
                <Image
                    src="/OceanBreeze.png"
                    width={300}
                    height={100}
                    alt="School360 Logo"
                    priority
                />
            </div>

            {/* Modules Grid */}
            <div className="w-full max-w-6xl flex justify-center">
                <div className="grid gap-18 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                    {modules.map((mod) => (
                        <Link key={mod.name} href={mod.route}>
                            <Card className="flex flex-col items-center justify-center p-4 h-36 w-36 hover:shadow-lg transition-all hover:shadow-blue-300 bg-white dark:bg-card-dark cursor-pointer rounded-xl">
                                <div className="mb-0 text-primary dark:text-secondary">
                                    {mod.icon}
                                </div>
                                <span className="text-center text-sm font-medium text-muted-foreground dark:text-muted-foreground-dark">
                                    {mod.name}
                                </span>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
}