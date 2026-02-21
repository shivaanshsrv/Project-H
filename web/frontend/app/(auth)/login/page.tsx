// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleLogin = async () => {
//     setError("");
//     try {
//       const res = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
//         { email, password }
//       );

//       localStorage.setItem("token", res.data.access_token);
//       router.push("/dashboard");
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Project‑H</h2>
//         <p style={styles.subtitle}>Solar Roof Analysis</p>

//         <label style={styles.label}>Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={styles.input}
//         />

//         <label style={styles.label}>Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={styles.input}
//         />

//         <button onClick={handleLogin} style={styles.button}>
//           Login
//         </button>

//         {error && <p style={styles.error}>{error}</p>}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#0f0f0f",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   card: {
//     width: "360px",
//     backgroundColor: "#1a1a1a",
//     padding: "32px",
//     borderRadius: "8px",
//     border: "1px solid #333",
//   },
//   title: { color: "#fff", marginBottom: "4px" },
//   subtitle: { color: "#aaa", marginBottom: "24px" },
//   label: { color: "#ddd" },
//   input: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "16px",
//     background: "#111",
//     color: "#fff",
//     border: "1px solid #444",
//     borderRadius: "4px",
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     background: "#fff",
//     color: "#000",
//     border: "none",
//     borderRadius: "4px",
//     fontWeight: "bold",
//     cursor: "pointer",
//   },
//   error: { color: "#ff6b6b", marginTop: "12px" },
// };




"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Eye, EyeOff } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // Store token in cookie (needed for middleware protection)
      document.cookie = `token=${data.access_token}; path=/;`;

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${inter.className} min-h-screen w-full bg-black flex`}>

      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:block md:w-1/2 relative h-screen">
        <Image
          src="/images/solar.jpg"
          alt="Solar Rooftop"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 h-screen flex items-center justify-center px-8 md:px-20">
        <div className="w-full max-w-md text-white">

          <h1 className="text-3xl font-semibold tracking-tight mb-3">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-400 mb-8">
            Sign in to access your solar analysis dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full px-4 py-3 rounded-lg bg-[#111] border border-[#2a2a2a] focus:border-white outline-none transition-all text-sm"
              />
            </div>

            {/* PASSWORD WITH TOGGLE */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-[#111] border border-[#2a2a2a] focus:border-white outline-none transition-all text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-white text-black font-semibold text-sm hover:opacity-90 transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          <p className="mt-8 text-sm text-gray-400 text-center">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-white font-medium hover:underline"
            >
              Create one
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}