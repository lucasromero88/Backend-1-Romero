const express = require('express');
// const fs=require('fs')
const path=require('path')

// Se importa el archivo productManager.js para conectar las clases
const productManager = require("./productManager.js");

const port=8080

const app=express()

app.use(express.json());

// const manager = new productManager (path.join(__dirname, "archivos", "productos.json"))
const manager = new productManager(path.join(__dirname, "archivos", "productos.json"));
// let productos = [
//     [
//         {
//           "id": 1,
//           "nombre": "Laptop Pro",
//           "categoria": "Electrónica",
//           "precio": 1200.50,
//           "stock": 15,
//           "imagen": "url_a_la_imagen_laptop.jpg"
//         },
//         {
//           "id": 2,
//           "nombre": "Smartphone X",
//           "categoria": "Electrónica",
//           "precio": 799.99,
//           "stock": 30,
//           "imagen": "url_a_la_imagen_smartphone.jpg"
//         },
//         {
//           "id": 3,
//           "nombre": "Auriculares Inalámbricos",
//           "categoria": "Accesorios",
//           "precio": 150.00,
//           "stock": 50,
//           "imagen": "url_a_la_imagen_auriculares.jpg"
//         },
//         {
//           "id": 4,
//           "nombre": "Teclado Mecánico",
//           "categoria": "Accesorios",
//           "precio": 95.75,
//           "stock": 40,
//           "imagen": "url_a_la_imagen_teclado.jpg"
//         },
//         {
//           "id": 5,
//           "nombre": "Monitor 4K 27 pulgadas",
//           "categoria": "Electrónica",
//           "precio": 450.00,
//           "stock": 25,
//           "imagen": "url_a_la_imagen_monitor.jpg"
//         }
//       ]
// ]
// app.get("/productos", (req, res)=>{
//     fs.writeFileSync(rutaArchivo, JSON.stringify(productos, null, 5))
//     res.send
// })

app.get("/", (req, res)=>{
    res.send("Prueba 1 sin modulo HTTP")
})

app.get("/carrito", (req, res)=>{
    res.send("Carrito de compras")
})

app.get("/productos", async (req, res) => {
    try {
        // const data = await fs.promises.readFile(rutaArchivo, "utf-8");
        const data = await manager.getProducts();

        /// const productos = JSON.parse(data);

        res.json(data);

    } catch (error) {
        res.status(500).json({ error:"Error al obtener los productos" });
    }
});

app.post("/productos", async (req, res) => {
    // try {
        
    // }catch (error) {
    
    // }
    try {
        const nuevoProducto = req.body;
        // if(!id || !nombre || !categoria || !precio || !stock || !imagen)
        // Se pone nuevoProducto.stock === undefined para que tome 0 como valido y evitar que salte el error por que el js lo toma como falsy
        // hay que ver si se aplica tambien en nuevoProducto.precio (revisar)
        if(!nuevoProducto.nombre || !nuevoProducto.categoria || !nuevoProducto.precio || nuevoProducto.stock === undefined || !nuevoProducto.imagen)
        {
            return res.status(400).json({ error: "Faltan datos del producto" });
        }
        // const data = await fs.promises.readFile(rutaArchivo, "utf-8");
        // const productos = JSON.parse(data);

        // res.status(400).json({error: `${nuevoProducto.nombre}`})

        const productoAgregado =await manager.addProduct(nuevoProducto);

        // const newId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;

        // nuevoProducto.id = newId;
        // productos.push(nuevoProducto);
        // await fs.promises.writeFile(rutaArchivo, JSON.stringify(productos, null, 5));

        res.status(201).json({ message: "Producto agregado con éxito", producto: productoAgregado });

    } catch (error) {
        console.error("Error al cargar el producto", error);
        res.status(500).json({ error: "Error en el servidor" });
    }

});

app.listen(port, ()=>{
    console.log(`Escuchando el puerto ${port}`)
})