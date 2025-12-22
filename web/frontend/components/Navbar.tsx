"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    // ❌ Hide navbar on login page
    if (pathname === "/login") return null;

    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "64px",
                backgroundColor: "#111",
                borderBottom: "1px solid #333",
                zIndex: 1000,
            }}
        >


            <h3 style={{ color: "#fff" }}>Project‑H</h3>

            <div style={{ display: "flex", gap: "16px" }}>
                <Link href="/dashboard" style={{ color: "#aaa" }}>
                    Dashboard
                </Link>
                <Link href="/analyse" style={{ color: "#aaa" }}>
                    Analyse
                </Link>
                <Link href="/history" style={{ color: "#aaa" }}>
                    History
                </Link>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "#ff6b6b",
                        cursor: "pointer",
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
