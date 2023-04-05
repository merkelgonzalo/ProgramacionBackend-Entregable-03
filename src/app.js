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
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    if(!limit){
        res.send(products);
    }else{
        const productsLimit = products.filter(product => product.id <= limit);
        res.send(productsLimit);
    }
    
});

app.get('/products/:pid', async (req,res)=>{
    const idProduct = req.params.pid;
    const product = await productManager.getProductById(idProduct);
    res.send(product);
});