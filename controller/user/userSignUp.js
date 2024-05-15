const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {

    try {
        const { email, password, name } = req.body
        const user = await userModel.findOne({ email })

        console.log("user", user);

        if (user) {
            throw new Error("El Usuario ya se Encuentra Registrado 🧑‍💻")
        }
        if (!name) {
            throw new Error("Por favor, ingrese su Nombre 🙋")
        }
        if (!email) {
            throw new Error("Por favor, indique su Correo Electrónico 📧")
        }
        if (!password) {
            throw new Error("Por favor, indique su Contraseña 🔑")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Algo no está Funcionando Correctamente 🚨")
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: `¡Tu Usuario ${name} se ha Creado Exitosamente! ✅`
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignUpController 