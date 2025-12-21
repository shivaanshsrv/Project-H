(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/web/frontend/project-h-frontend/app/analyse/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AnalysePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/web/frontend/project-h-frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/frontend/project-h-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/frontend/project-h-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/web/frontend/project-h-frontend/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AnalysePage() {
    _s();
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleAnalyze = async ()=>{
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
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`${("TURBOPACK compile-time value", "http://127.0.0.1:8000")}/ai/analyze`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setResult(res.data.analysis || res.data);
        } catch  {
            setError("Analysis failed. Please try again.");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            backgroundColor: "#0f0f0f",
            padding: "40px"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                maxWidth: "720px",
                margin: "auto",
                backgroundColor: "#1a1a1a",
                padding: "32px",
                borderRadius: "8px",
                border: "1px solid #333"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "24px"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                color: "#fff"
                            },
                            children: "Project‑H Analysis"
                        }, void 0, false, {
                            fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                            lineNumber: 83,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                localStorage.removeItem("token");
                                window.location.href = "/login";
                            },
                            style: {
                                background: "transparent",
                                border: "none",
                                color: "#aaa",
                                cursor: "pointer"
                            },
                            children: "Logout"
                        }, void 0, false, {
                            fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                            lineNumber: 84,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                    lineNumber: 76,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    style: {
                        color: "#ddd",
                        fontWeight: "bold"
                    },
                    children: "Upload Roof Image"
                }, void 0, false, {
                    fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                    lineNumber: 101,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "file",
                    accept: "image/*",
                    onChange: (e)=>setFile(e.target.files?.[0] || null),
                    style: {
                        display: "block",
                        margin: "12px 0 20px",
                        color: "#ddd"
                    }
                }, void 0, false, {
                    fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                    lineNumber: 104,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: handleAnalyze,
                    disabled: loading,
                    style: {
                        padding: "12px 20px",
                        background: "#fff",
                        color: "#000",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        cursor: "pointer"
                    },
                    children: loading ? "Analyzing..." : "Analyze Roof"
                }, void 0, false, {
                    fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                    lineNumber: 115,
                    columnNumber: 17
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        color: "#ff6b6b",
                        marginTop: "12px"
                    },
                    children: error
                }, void 0, false, {
                    fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                    lineNumber: 132,
                    columnNumber: 21
                }, this),
                result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: "32px",
                        color: "#ddd"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                color: "#fff"
                            },
                            children: "Results"
                        }, void 0, false, {
                            fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                            lineNumber: 140,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: "Panel Count:"
                                }, void 0, false, {
                                    fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                                    lineNumber: 142,
                                    columnNumber: 28
                                }, this),
                                " ",
                                result.panel_count
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                            lineNumber: 142,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: "System Size:"
                                }, void 0, false, {
                                    fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                                    lineNumber: 143,
                                    columnNumber: 28
                                }, this),
                                " ",
                                result.system_size_kw,
                                " kW"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                            lineNumber: 143,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: "Monthly Energy:"
                                }, void 0, false, {
                                    fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                                    lineNumber: 144,
                                    columnNumber: 28
                                }, this),
                                " ",
                                result.energy?.monthly,
                                " kWh"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                            lineNumber: 144,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: "Yearly Energy:"
                                }, void 0, false, {
                                    fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                                    lineNumber: 145,
                                    columnNumber: 28
                                }, this),
                                " ",
                                result.energy?.yearly,
                                " kWh"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                            lineNumber: 145,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: "Confidence:"
                                }, void 0, false, {
                                    fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                                    lineNumber: 146,
                                    columnNumber: 28
                                }, this),
                                " ",
                                result.confidence
                            ]
                        }, void 0, true, {
                            fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                            lineNumber: 146,
                            columnNumber: 25
                        }, this),
                        result.overlay_image_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: "20px"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$web$2f$frontend$2f$project$2d$h$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: `${("TURBOPACK compile-time value", "http://127.0.0.1:5001")}${result.overlay_image_url}`,
                                alt: "Overlay",
                                style: {
                                    width: "100%",
                                    border: "1px solid #444",
                                    borderRadius: "4px"
                                }
                            }, void 0, false, {
                                fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                                lineNumber: 150,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                            lineNumber: 149,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
                    lineNumber: 139,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
            lineNumber: 65,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/web/frontend/project-h-frontend/app/analyse/page.tsx",
        lineNumber: 58,
        columnNumber: 9
    }, this);
}
_s(AnalysePage, "86IjkviN7mVzrZaJbBnFUHbAFsU=");
_c = AnalysePage;
var _c;
__turbopack_context__.k.register(_c, "AnalysePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=web_frontend_project-h-frontend_app_analyse_page_tsx_5a7f0417._.js.map