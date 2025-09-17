const fs=require('fs');

class productManager {

    constructor(path) {
        this.path = path;
    }
    async getProducts(){
        try {
            if (!fs.existsSync(this.path)) {
                return [];
            }
            const data = await fs.promises.readFile(this.path, "utf-8");
            
            return JSON.parse(data);
            
                    // res.json(productos);
            
        } catch (error){
            console.error("Error al leer el archivo de productos:", error);
            // res.status(500).send({ error: "No se pudieroon obtener los productos" });
            throw new Error("No se pudieron obtener los productos.");
        }
    }

    // consultar en la clase del sabado por que no va el "static adelante de async"
    async addProduct(nuevoProducto){
        try {
            // const nuevoProducto = req.body;
            
            const productos = await this.getProducts();

            const newId = productos.length > 0 ? Math.max(...productos.map(d => d.id)) + 1 : 1;
    
            nuevoProducto.id = newId;


            
            productos.push(nuevoProducto);
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 5));
            
            return nuevoProducto
    
        } catch (error) {
            console.error("Error al cargar el producto", error);
            // res.status(500).send({ error: "Error en el server" });
            throw new Error("No se pudo agregar el producto.");
        }
    }
}

// Aca exporto el archivo asi lo uso en app.js
module.exports = productManager;