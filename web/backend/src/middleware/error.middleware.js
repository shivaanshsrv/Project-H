export const errorMiddleware = (err, req, res, next) => {
    console.error("🚨 Error:", err.message);

    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        status: statusCode,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
};
