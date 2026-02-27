"use client";

import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

function MenuManagementPage() {
    const router = useRouter()


    return (
        <div className="flex-1 p-6">
            <div className="flex justify-end items-center gap-2">
                <Button
                    variant="outline"
                    onClick={() => router.push("/modules/admin/menu-management/add-menu-item")}
                    title="Add New"
                    className="group h-10 w-10 px-0 overflow-hidden flex items-center justify-center gap-0 transition-all duration-200 hover:w-[210px] hover:px-3 hover:justify-start hover:gap-2 hover:bg-[#005477]/5 hover:border-[#005477]/30">

                    <Plus className="h-4 w-4 text-[#005477]" />

                    <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-[#005477] opacity-0 transition-all duration-600 group-hover:max-w-[200px] group-hover:opacity-100">
                        Add New Menu Item
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default MenuManagementPage