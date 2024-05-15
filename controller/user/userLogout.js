async function userLogout(req, res) {
    try {
        res.clearCookie("token")

        res.json({
            message: "😥¡Adiós por Ahora! Has cerrado sesión con éxito✅¡Hasta la próxima!😃",
            error: false,
            success: true,
            data: []
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userLogout