const { Router } = require('express');
const { CartManager } = require("../dao/cartManager.js")
const router = Router()

const cartManager = new CartManager("./src/data/carts.json")

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.addCart();
        res.status(201).json({message: "Nuevo carrito creado", newCart});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params; // Obtener el cid de los parámetros de la URL
    try {
        const cart = await cartManager.getCartById(Number(cid)); // Asegúrate de convertir el cid a número
        if (cart) {
            res.status(200).json(cart); // Devuelve el carrito completo con su ID y productos
        } else {
            res.status(404).json({ message: `Carrito con id ${cid} no encontrado.` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);

        // Validar que los IDs sean numéricos
        if (isNaN(cid) || isNaN(pid)) {
            return res.status(400).send({ message: "El id del carrito y el id del producto deben ser numéricos" });
        }

        // Agregar el producto al carrito
        const carritoActualizado = await cartManager.addProductToCart(cid, pid);
        res.status(200).json({ message: "Producto agregado al carrito", cart: carritoActualizado });
    } catch (error) {
        if (error.message.includes("no encontrado")) {
            return res.status(404).send({ message: error.message });
        }
        res.status(500).send({ message: error.message });
    }
});



// router.get("/:pid", async (req, res) => {

//     try {
//         const pid = parseInt(req.params.pid);
//         //let {id} = parseInt(req.params.id);
//         const product = await productManager.getProductById(pid);
//         if (isNaN(pid)) {
//             return res.status(400).send({ message: "El id debe ser numérico" });
//         }
//         if (!product) {
//             return res.status(404).send({ message: `No existen productos con id ${pid}` });
//         }
//         res.status(200).send(product);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// router.post("/", async (req, res) => {
//     try {
//         const nuevoCarrito = await cartManager.addCart();
//         res.status(201).json({ message: "Nuevo carrito creado", cart: nuevoCarrito });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// router.get("/:cid", async (req, res) => {
//     try {
//         const cid = parseInt(req.params.cid);

//         if (isNaN(cid)) {
//             return res.status(400).send({ message: "El id del carrito debe ser numérico" });
//         }

//         const cart = await cartManager.getCartById(cid);
//         if (!cart) {
//             return res.status(404).send({ message: `No existe un carrito con id ${cid}` });
//         }

//         res.status(200).json({ products: cart.products });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });



// router.post("/:cid/product/:pid", async (req, res) => {
//     try {
//         const cid = parseInt(req.params.cid);
//         const pid = parseInt(req.params.pid);

//         if (isNaN(cid) || isNaN(pid)) {
//             return res.status(400).send({ message: "El id del carrito y del producto deben ser numéricos" });
//         }

//         const updatedCart = await cartManager.addProductToCart(cid, pid);
//         res.status(200).json({ message: "Producto agregado al carrito", cart: updatedCart });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });



module.exports = { router }