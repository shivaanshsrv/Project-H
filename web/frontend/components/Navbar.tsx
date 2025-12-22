"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    const linkStyle = (path: string) => ({
        color: pathname === path ? "#fff" : "#aaa",
        textDecoration: "none",
        fontWeight: pathname === path ? "bold" : "normal",
        cursor: "pointer",
    });

    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "64px",
                backgroundColor: "#0f0f0f",
                borderBottom: "1px solid #222",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 32px",
                zIndex: 1000,
            }}
        >
            {/* LEFT SIDE LINKS */}
            <div style={{ display: "flex", gap: "24px" }}>
                <Link href="/analyse" style={linkStyle("/analyse")}>
                    Analyse
                </Link>
                <Link href="/dashboard" style={linkStyle("/dashboard")}>
                    Dashboard
                </Link>
                <Link href="/history" style={linkStyle("/history")}>
                    History
                </Link>
            </div>

            {/* RIGHT SIDE ACTIONS */}
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <Link href="/profile" style={linkStyle("/profile")}>
                    Profile
                </Link>

                <button
                    onClick={handleLogout}
                    style={{
                        background: "transparent",
                        border: "1px solid #333",
                        color: "#fff",
                        padding: "8px 14px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
