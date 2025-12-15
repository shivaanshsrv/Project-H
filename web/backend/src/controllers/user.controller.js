// Basic User Controller Template

export const getUsers = async (req, res) => {
    try {
        return res.status(200).json({
            status: 200,
            message: "User endpoint working!",
            data: []
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
};
