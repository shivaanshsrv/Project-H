"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type HistoryItem = {
    _id: string;
    image_path: string;
    created_at: string;
};

export default function HistoryPage() {
    const router = useRouter();
    const [items, setItems] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                router.replace("/login");
                return;
            }

            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/analysis/my`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setItems(res.data || []);
            } catch (err) {
                console.error("Failed to load history", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [router]);

    const resolveImageUrl = (path: string) => {
        if (!path) return "";
        if (path.startsWith("http")) return path;
        return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`;

    };

    if (loading) {
        return <p style={{ color: "#aaa", padding: "24px" }}>Loading history...</p>;
    }

    if (items.length === 0) {
        return (
            <p style={{ color: "#aaa", padding: "24px" }}>
                No past analyses found.
            </p>
        );
    }

    return (
        <div style={{ padding: "32px", color: "#fff" }}>
            <h2 style={{ marginBottom: "24px" }}>Analysis History</h2>

            {items.map((item) => (
                <div
                    key={item._id}
                    style={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "8px",
                        padding: "24px",
                        marginBottom: "32px",
                    }}
                >
                    {/* Date */}
                    <p style={{ color: "#aaa", marginBottom: "12px" }}>
                        {new Date(item.created_at).toLocaleString()}
                    </p>

                    {/* Image */}
                    <img
                        src={resolveImageUrl(item.image_path)}
                        alt="Uploaded roof"
                        style={{
                            width: "100%",
                            border: "1px solid #444",
                            borderRadius: "4px",
                        }}
                    />
                </div>
            ))}
        </div>
    );
}
