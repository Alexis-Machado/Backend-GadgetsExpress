const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function updateProductController(req, res) {
    try {
        if (!uploadProductPermission(req.userId)) {
            throw new Error("¡Oops! No tienes Permisos para Esto, lo Siento 😥")
        }

        const { _id, ...resBody } = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.json({
            message: "¡El Producto se ha Actualizado Exitosamente! ✅",
            data: updateProduct,
            success: true,
            error: false
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = updateProductController