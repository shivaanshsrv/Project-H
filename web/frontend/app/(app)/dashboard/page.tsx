"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#0f0f0f",
                padding: "40px",
            }}
        >
            <h1 style={{ color: "#fff", marginBottom: "24px" }}>
                Dashboard
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "20px",
                }}
            >
                {/* Analyse Card */}
                <div
                    onClick={() => router.push("/analyse")}
                    style={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        padding: "24px",
                        cursor: "pointer",
                    }}
                >
                    <h3 style={{ color: "#fff" }}>Analyse Roof</h3>
                    <p style={{ color: "#aaa", marginTop: "8px" }}>
                        Upload a roof image and get solar analysis
                    </p>
                </div>

                {/* History Card */}
                <div
                    onClick={() => router.push("/history")}
                    style={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        padding: "24px",
                        cursor: "pointer",
                    }}
                >
                    <h3 style={{ color: "#fff" }}>View History</h3>
                    <p style={{ color: "#aaa", marginTop: "8px" }}>
                        See previous analyses and results
                    </p>
                </div>
            </div>
        </div>
    );
}
