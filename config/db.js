const mongoose = require("mongoose")

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (err) {
        console.log("Error al Conectar a la Base de Datos 🚨", err)
    }
}

module.exports = connectDB