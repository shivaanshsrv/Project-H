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
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Project‑H</h2>
        <p style={styles.subtitle}>Solar Roof Analysis</p>

        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f0f0f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "360px",
    backgroundColor: "#1a1a1a",
    padding: "32px",
    borderRadius: "8px",
    border: "1px solid #333",
  },
  title: { color: "#fff", marginBottom: "4px" },
  subtitle: { color: "#aaa", marginBottom: "24px" },
  label: { color: "#ddd" },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "16px",
    background: "#111",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#fff",
    color: "#000",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: { color: "#ff6b6b", marginTop: "12px" },
};
