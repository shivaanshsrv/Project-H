"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // hide navbar only on login page
    const hideNavbar = pathname === "/login";

    return (
        <>
            {!hideNavbar && <Navbar />}
            {children}
        </>
    );
}
