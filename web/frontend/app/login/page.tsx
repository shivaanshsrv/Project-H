"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        setError("");
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
                { email, password }
            );

            localStorage.setItem("token", res.data.access_token);
            router.push("/analyse");
        } catch {
            setError("Invalid email or password");
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#0f0f0f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "360px",
                    backgroundColor: "#1a1a1a",
                    padding: "32px",
                    borderRadius: "8px",
                    border: "1px solid #333",
                }}
            >
                <h2 style={{ color: "#fff", marginBottom: "4px" }}>
                    Project‑H
                </h2>
                <p style={{ color: "#aaa", marginBottom: "24px" }}>
                    Solar Roof Analysis
                </p>

                <label style={{ color: "#ddd" }}>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "16px",
                        background: "#111",
                        color: "#fff",
                        border: "1px solid #444",
                        borderRadius: "4px",
                    }}
                />

                <label style={{ color: "#ddd" }}>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                        background: "#111",
                        color: "#fff",
                        border: "1px solid #444",
                        borderRadius: "4px",
                    }}
                />

                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#fff",
                        color: "#000",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>

                {error && (
                    <p style={{ color: "#ff6b6b", marginTop: "12px" }}>
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}
