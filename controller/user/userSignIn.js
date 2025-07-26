const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {

    try {
        const { email, password } = req.body

        if (!email) {
            throw new Error("Por favor, indique su Correo Electrónico 📧")
        }
        if (!password) {
            throw new Error("Por favor, indique su Contraseña 🔑")
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            throw new Error("¡Ops! Verifica tu Correo. El Usuario que Buscas no Existe en Nuestro Sistema 🚨")
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        console.log("checkPassword", checkPassword)

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            }

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                path: '/',
                maxAge: 8 * 60 * 60 * 1000 // 8 horas en milisegundos
            }

            res.cookie("token", token, tokenOption).json({
                message: "Inicio de Sesión Exitoso ¡BIENVENIDO! 🙋✅🎉",
                data: token,
                success: true,
                error: false
            })

        } else {
            throw new Error("Por favor, Verifica la Contraseña 📝")
        }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignInController