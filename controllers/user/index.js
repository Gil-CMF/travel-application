
const handleLogin = (req, res) => {
    res.json({
        message: 'login successful'
    })
}

const requestPasswordResetLink = (req, res) => {
    res.json({
        message: 'password reset link sent successful'
    })
}


const changePassword = (req, res) => {
    res.json({
        message: 'password updated successful'
    })
}


module.exports = {
    handleLogin,
    requestPasswordResetLink,
    changePassword
};