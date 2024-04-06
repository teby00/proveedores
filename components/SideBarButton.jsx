'use client'

import { usePathname } from "next/navigation";
import { SheetClose } from "./ui/sheet";
import Link from "next/link";

export default function SideBarButton({ id, nombre, negocio }) {

    const path = usePathname()

    return (
        <SheetClose className="flex w-full" asChild >
            <Link href={`/dashboard/${negocio}/${id}`} className={` ${ path === `/dashboard/${negocio}/${id}` && 'bg-gray-500/60 text-white' } inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 w-full justify-start`}>
                { nombre }
            </Link>
        </SheetClose>
    )
}