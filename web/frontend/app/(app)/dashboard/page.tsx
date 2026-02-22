// "use client";

// import { useRouter } from "next/navigation";

// export default function DashboardPage() {
//     const router = useRouter();

//     return (
//         <div
//             style={{
//                 minHeight: "100vh",
//                 backgroundColor: "#0f0f0f",
//                 padding: "40px",
//             }}
//         >
//             <h1 style={{ color: "#fff", marginBottom: "24px" }}>
//                 Dashboard
//             </h1>

//             <div
//                 style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
//                     gap: "20px",
//                 }}
//             >
//                 {/* Analyse Card */}
//                 <div
//                     onClick={() => router.push("/analyse")}
//                     style={{
//                         backgroundColor: "#1a1a1a",
//                         border: "1px solid #333",
//                         borderRadius: "8px",
//                         padding: "24px",
//                         cursor: "pointer",
//                     }}
//                 >
//                     <h3 style={{ color: "#fff" }}>Analyse Roof</h3>
//                     <p style={{ color: "#aaa", marginTop: "8px" }}>
//                         Upload a roof image and get solar analysis
//                     </p>
//                 </div>

//                 {/* History Card */}
//                 <div
//                     onClick={() => router.push("/history")}
//                     style={{
//                         backgroundColor: "#1a1a1a",
//                         border: "1px solid #333",
//                         borderRadius: "8px",
//                         padding: "24px",
//                         cursor: "pointer",
//                     }}
//                 >
//                     <h3 style={{ color: "#fff" }}>View History</h3>
//                     <p style={{ color: "#aaa", marginTop: "8px" }}>
//                         See previous analyses and results
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }



// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { User, LogOut } from "lucide-react"

// export default function DashboardPage() {
//     const [analyzed, setAnalyzed] = useState(false)

//     const handleAnalyze = () => {
//         setAnalyzed(true)
//     }

//     return (
//         <div className="h-screen w-screen bg-black text-white overflow-hidden flex">

//             {/* ================= LEFT COLUMN ================= */}
//             <div className="w-[20%] h-full flex flex-col gap-6 p-6">

//                 {/* ---------- System Output (FULL HEIGHT) ---------- */}
//                 <div className="flex-1 bg-neutral-900 rounded-2xl p-6 flex flex-col justify-between">

//                     <div>
//                         <h2 className="text-lg font-semibold mb-6">System Output</h2>

//                         <div className="space-y-6">

//                             <Metric label="Panels Installed" value="12" />

//                             <AnimatedEnergy
//                                 label="Monthly Energy"
//                                 value={540}
//                                 suffix="kWh"
//                             />

//                             <AnimatedEnergy
//                                 label="Yearly Energy"
//                                 value={6480}
//                                 suffix="kWh"
//                             />

//                         </div>
//                     </div>

//                 </div>

//                 {/* ---------- History (Scrollable Internally) ---------- */}
//                 <div className="h-[35%] bg-neutral-900 rounded-2xl p-6 flex flex-col">

//                     <h2 className="text-lg font-semibold mb-4">History</h2>

//                     <div className="flex-1 overflow-y-auto space-y-3 pr-2">
//                         <HistoryItem title="Roof Analysis #1" />
//                         <HistoryItem title="Roof Analysis #2" />
//                         <HistoryItem title="Roof Analysis #3" />
//                         <HistoryItem title="Roof Analysis #4" />
//                     </div>

//                 </div>

//             </div>


//             {/* ================= CENTER ================= */}
//             <div className="w-[55%] h-full flex flex-col p-6">

//                 <div className={`flex-1 bg-neutral-900 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 ${analyzed ? "rounded-[32px]" : "rounded-2xl"}`}>


//                     {/* CTA AREA */}
//                     <div className="flex-1 bg-neutral-900 rounded-3xl overflow-hidden flex flex-col">

//                         {/* IMAGE AREA */}
//                         <div className="flex-1 relative overflow-hidden rounded-3xl">

//                             <Image
//                                 src="/imagesolar.jpg"
//                                 alt="Analyzed Roof"
//                                 fill
//                                 className="object-cover rounded-3xl"
//                             />

//                         </div>

//                         {/* CLEAN CTA (NO BACKGROUND STRIP) */}
//                         <div className="px-6 pb-6 pt-4">
//                             <button
//                                 onClick={handleAnalyze}
//                                 className="w-full py-4 rounded-2xl bg-yellow-500 text-black font-semibold transition-colors duration-300 hover:bg-yellow-400"
//                             >
//                                 {analyzed ? "Analyze Another Roof" : "Analyze the Roof"}
//                             </button>
//                         </div>

//                     </div>

//                 </div>

//             </div>


// {/* ================= RIGHT COLUMN ================= */}
// <div className="w-[25%] h-full flex flex-col p-6">

//   {/* Profile Section */}
//   <div className="flex items-center justify-end gap-4 mb-6">

//     {/* User Pill */}
//     <div className="flex items-center gap-3 bg-neutral-800 px-4 py-2 rounded-full">
//       <div className="w-9 h-9 rounded-full overflow-hidden">
//         <img
//           src="/avatar.jpg"
//           alt="User"
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <span className="text-sm font-medium text-white">
//         Shivansh
//       </span>
//     </div>

//     {/* Logout Button */}
//     <button className="w-9 h-9 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-500 transition-colors duration-300">
//       <LogOut size={15} />
//     </button>

//   </div>

//   {/* Energy Graph */}
//   <div className="flex-1 bg-neutral-900 rounded-2xl p-6 overflow-hidden">
//     <h2 className="text-lg font-semibold mb-6">Energy Graph</h2>

//     <div className="h-full flex items-end gap-4 pb-4">
//       {[30, 50, 40, 70, 60].map((height, i) => (
//         <div
//           key={i}
//           className="flex-1 bg-yellow-500 rounded-xl transition-all duration-700"
//           style={{ height: `${height}%` }}
//         />
//       ))}
//     </div>
//   </div>

// </div>

//         </div>
//     )
// }


// /* ================= COMPONENTS ================= */

// function Metric({ label, value }: any) {
//     return (
//         <div>
//             <p className="text-sm text-neutral-400">{label}</p>
//             <p className="text-2xl font-semibold mt-1">{value}</p>
//         </div>
//     )
// }

// function AnimatedEnergy({ label, value, suffix }: any) {
//     return (
//         <div>
//             <p className="text-sm text-neutral-400">{label}</p>

//             <div className="mt-2 w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
//                 <div
//                     className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
//                     style={{ width: "75%" }}
//                 />
//             </div>

//             <p className="mt-2 text-xl font-semibold">
//                 {value} {suffix}
//             </p>
//         </div>
//     )
// }

// function HistoryItem({ title }: any) {
//     return (
//         <div className="bg-neutral-800 hover:bg-neutral-700 transition-colors p-3 rounded-lg text-sm cursor-pointer">
//             {title}
//         </div>
//     )
// }   
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

/* ================= SMALL COMPONENTS ================= */

function Metric({ label, value }: any) {
  return (
    <div>
      <p className="text-sm text-neutral-400">{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  )
}

function AnimatedEnergy({ label, value, suffix }: any) {
  const percentage = Math.min((value / 7000) * 100, 100)

  return (
    <div>
      <p className="text-sm text-neutral-400">{label}</p>
      <div className="mt-3 w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
        <div
          className="bg-yellow-500 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-3 text-xl font-semibold">
        {value} {suffix}
      </p>
    </div>
  )
}

function HistoryItem({ title, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="bg-neutral-800 hover:bg-neutral-700 transition-colors p-3 rounded-xl text-sm cursor-pointer border border-white/5"
    >
      {title}
    </div>
  )
}

/* ================= MAIN ================= */

export default function DashboardPage() {
  const [analysis, setAnalysis] = useState<any>(null)
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  /* ===== LOAD HISTORY (AUTH REQUIRED) ===== */

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/analysis/my", {
        credentials: "include",
      })

      if (!res.ok) {
        setHistory([])
        return
      }

      const data = await res.json()

      if (Array.isArray(data)) {
        setHistory(data)
      } else if (Array.isArray(data.analyses)) {
        setHistory(data.analyses)
      } else {
        setHistory([])
      }
    } catch {
      setHistory([])
    }
  }

  /* ===== ANALYZE ROOF ===== */

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("Upload an image first")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("image", selectedFile)

      const res = await fetch(
        "http://127.0.0.1:8001/analyze-roof",
        {
          method: "POST",
          body: formData,
        }
      )

      if (!res.ok) {
        const errText = await res.text()
        console.error("AI ERROR:", errText)
        throw new Error("Analyze failed")
      }

      const data = await res.json()

      setAnalysis(data)
      await loadHistory()

    } catch (err) {
      console.error(err)
      alert("Analysis failed.")
    } finally {
      setLoading(false)
    }
  }

  /* ===== LOAD OLD ANALYSIS ===== */

  const loadAnalysis = async (id: string) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8001/analysis/${id}`
      )

      if (!res.ok) return

      const data = await res.json()
      setAnalysis(data)
    } catch (err) {
      console.error(err)
    }
  }

  /* ===== GRAPH DATA ===== */

  const graphHeights = analysis?.energy?.monthly
    ? [0.6, 0.8, 0.7, 1.0, 0.9].map(multiplier =>
        Math.min((analysis.energy.monthly * multiplier) / 1000, 100)
      )
    : [30, 50, 40, 70, 60]

  /* ================= UI ================= */

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-black text-white overflow-hidden flex">

      {/* LEFT COLUMN */}
      <div className="w-[20%] h-full flex flex-col gap-6 p-6">

        <div className="flex-1 bg-neutral-900 rounded-2xl p-6 border border-white/5 shadow-sm">
          <h2 className="text-lg font-semibold mb-6">System Output</h2>

          <div className="space-y-8">
            <Metric label="Panels Installed" value={analysis?.panel_count ?? 0} />
            <AnimatedEnergy label="Monthly Energy" value={analysis?.energy?.monthly ?? 0} suffix="kWh" />
            <AnimatedEnergy label="Yearly Energy" value={analysis?.energy?.yearly ?? 0} suffix="kWh" />
          </div>
        </div>

        <div className="h-[35%] bg-neutral-900 rounded-2xl p-6 flex flex-col border border-white/5 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">History</h2>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {history.length > 0 ? (
              history.map((item: any) => (
                <HistoryItem
                  key={item.analysis_id}
                  title={`Analysis ${item.analysis_id?.slice(0, 6)}`}
                  onClick={() => loadAnalysis(item.analysis_id)}
                />
              ))
            ) : (
              <p className="text-sm text-neutral-500">No analysis yet</p>
            )}
          </div>
        </div>
      </div>

      {/* CENTER */}
      <div className="w-[55%] h-full flex flex-col p-6">

        <div className="flex-1 bg-neutral-900 rounded-2xl flex flex-col border border-white/5 shadow-sm overflow-hidden">

          <div className="flex-1 relative flex items-center justify-center overflow-hidden">

            {analysis?.overlay_image_url ? (
              <Image
                src={`http://127.0.0.1:8001${analysis.overlay_image_url}`}
                alt="Analyzed Roof"
                fill
                className="object-cover rounded-2xl"
                unoptimized
              />
            ) : (
              <>
                <Image
                  src="/images/imagesolar.jpg"
                  alt="Roof"
                  fill
                  className="object-cover rounded-2xl opacity-40"
                  priority
                />

                <label className="relative z-10 cursor-pointer bg-neutral-800/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 hover:bg-neutral-700 transition">
                  <span className="text-sm font-medium">
                    Click to Upload Roof Image
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      e.target.files && setSelectedFile(e.target.files[0])
                    }
                  />
                </label>
              </>
            )}
          </div>

          <div className="px-6 pb-6 pt-4">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze the Roof"}
            </button>
          </div>

        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[25%] h-full flex flex-col p-6">

        <div className="flex-1 bg-neutral-900 rounded-2xl p-6 border border-white/5 shadow-sm flex flex-col">

          <h2 className="text-lg font-semibold mb-6">Energy Graph</h2>

          <div className="flex-1 flex items-end gap-4 px-2 pb-6 pt-4">
            {graphHeights.map((value, i) => (
              <div
                key={i}
                className="flex-1 bg-yellow-500 rounded-xl transition-all duration-700 ease-out"
                style={{ height: `${value}%` }}
              />
            ))}
          </div>

        </div>
      </div>

    </div>
  )
}