"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Profile = {
    name: string;
    email: string;
    phone: string;
    country: string;
};

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<Profile>({
        name: "",
        email: "",
        phone: "",
        country: "",
    });

    const [isEditing, setIsEditing] = useState(false);

    // 🔐 Auth + Load profile
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/login");
            return;
        }

        const savedProfile = localStorage.getItem("profile");
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        } else {
            // default values (v1)
            setProfile({
                name: "Project‑H User",
                email: "user@projecth.com",
                phone: "",
                country: "",
            });
        }
    }, [router]);

    const handleChange = (field: keyof Profile, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        localStorage.setItem("profile", JSON.stringify(profile));
        setIsEditing(false);
        alert("Profile saved successfully");
    };

    return (
        <div style={{ padding: "32px", maxWidth: "720px", color: "#fff" }}>
            <h2 style={{ marginBottom: "24px" }}>Profile</h2>

            {/* Avatar */}
            <div
                style={{
                    width: "96px",
                    height: "96px",
                    borderRadius: "50%",
                    background: "#333",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    marginBottom: "24px",
                }}
            >
                {profile.name.charAt(0)}
            </div>

            {/* Fields */}
            {(["name", "email", "phone", "country"] as (keyof Profile)[]).map(
                (field) => (
                    <div key={field} style={{ marginBottom: "16px" }}>
                        <label style={{ color: "#aaa", display: "block" }}>
                            {field.toUpperCase()}
                        </label>
                        <input
                            value={profile[field]}
                            disabled={!isEditing}
                            onChange={(e) => handleChange(field, e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px",
                                background: "#111",
                                color: "#fff",
                                border: "1px solid #333",
                                borderRadius: "4px",
                            }}
                        />
                    </div>
                )
            )}

            {/* Buttons */}
            {!isEditing ? (
                <button
                    onClick={() => setIsEditing(true)}
                    style={btnStyle}
                >
                    Edit Profile
                </button>
            ) : (
                <button
                    onClick={handleSave}
                    style={{ ...btnStyle, background: "#22c55e", color: "#000" }}
                >
                    Save Profile
                </button>
            )}
        </div>
    );
}

const btnStyle: React.CSSProperties = {
    marginTop: "16px",
    padding: "10px 16px",
    background: "#fff",
    color: "#000",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
};
