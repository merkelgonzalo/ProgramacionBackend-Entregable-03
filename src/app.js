import express from 'express';
import ProductManager from './ProductManager.js';

const PORT = '8080';
const app = express();
const productManager = new ProductManager("/src/products.json");

app.use(express.urlencoded({extended: true}));

app.listen(PORT, ()=>{
    console.log("Server running on port " + PORT);
});

app.get('/', async (req,res)=>{
    res.send('Home Page')
});

app.get('/products', async (req,res)=>{
    const products = await productManager.getProducts();
    res.send(products);
});

app.get('/products/:pid', async (req,res)=>{
    const idProduct = req.params.pid;
    const product = await productManager.getProductById(idProduct);
    res.send(product);
});