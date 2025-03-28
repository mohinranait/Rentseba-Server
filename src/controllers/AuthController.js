
const registerUser = async (req, res, next) => {
    try {
        const {name,email,password} = req.body;
        return res.status(201).send({
            message: "Registered",
            success: true,
            payload: 'User response',
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerUser,
}