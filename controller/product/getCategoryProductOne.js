const productModel = require("../../models/productModel")


const getCategoryProduct = async (req, res) => {
    try {
        const productCategory = await productModel.distinct("category")

        console.log("category", productCategory)

        //Array para almacenar productos de cada categoría
        const productByCategory = []

        for (const category of productCategory) {
            const product = await productModel.findOne({ category })

            if (product) {
                productByCategory.push(product)
            }
        }

        res.json({
            message: "Categoría del Producto",
            data: productByCategory,
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

module.exports = getCategoryProduct