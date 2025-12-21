"use client";

import { useState } from "react";
import axios from "axios";

type AnalysisResult = {
    panel_count: number;
    system_size_kw: number;
    confidence: number;
    energy?: {
        monthly: number;
        yearly: number;
    };
    overlay_image_url?: string;
};

export default function AnalysePage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState("");

    const handleAnalyze = async () => {
        if (!file) {
            setError("Please select an image");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const formData = new FormData();
            formData.append("image", file);

            const token = localStorage.getItem("token");

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai/analyze`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setResult(res.data.analysis || res.data);
        } catch {
            setError("Analysis failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#0f0f0f",
                padding: "40px",
            }}
        >
            <div
                style={{
                    maxWidth: "720px",
                    margin: "auto",
                    backgroundColor: "#1a1a1a",
                    padding: "32px",
                    borderRadius: "8px",
                    border: "1px solid #333",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "24px",
                    }}
                >
                    <h2 style={{ color: "#fff" }}>Project‑H Analysis</h2>
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#aaa",
                            cursor: "pointer",
                        }}
                    >
                        Logout
                    </button>
                </div>

                {/* Upload */}
                <label style={{ color: "#ddd", fontWeight: "bold" }}>
                    Upload Roof Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    style={{
                        display: "block",
                        margin: "12px 0 20px",
                        color: "#ddd",
                    }}
                />

                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    style={{
                        padding: "12px 20px",
                        background: "#fff",
                        color: "#000",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Analyzing..." : "Analyze Roof"}
                </button>

                {error && (
                    <p style={{ color: "#ff6b6b", marginTop: "12px" }}>
                        {error}
                    </p>
                )}

                {/* Results */}
                {result && (
                    <div style={{ marginTop: "32px", color: "#ddd" }}>
                        <h3 style={{ color: "#fff" }}>Results</h3>

                        <p><b>Panel Count:</b> {result.panel_count}</p>
                        <p><b>System Size:</b> {result.system_size_kw} kW</p>
                        <p><b>Monthly Energy:</b> {result.energy?.monthly} kWh</p>
                        <p><b>Yearly Energy:</b> {result.energy?.yearly} kWh</p>
                        <p><b>Confidence:</b> {result.confidence}</p>

                        {result.overlay_image_url && (
                            <div style={{ marginTop: "20px" }}>
                                <img
                                    src={`${process.env.NEXT_PUBLIC_AI_URL}${result.overlay_image_url}`}
                                    alt="Overlay"
                                    style={{
                                        width: "100%",
                                        border: "1px solid #444",
                                        borderRadius: "4px",
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
