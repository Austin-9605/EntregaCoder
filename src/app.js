
const express = require("express");
const { router: productosRouter } = require('./routes/productosRouter.js');
const { router: carritosRouter } = require('./routes/carritosRouter.js');

const PORT = 8080
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productosRouter)
app.use("/api/carts", carritosRouter)

app.get("/", (req, res) => {
    res.setHeader("content-Type", "text/plain");
    res.status(200).send("OK");
})

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`)
})

