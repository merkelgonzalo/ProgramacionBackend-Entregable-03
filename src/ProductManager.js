import fs from 'fs';

export default class ProductManager{

    constructor(path){
        this.path = path;
    }

    addProduct = async (product) => {

        const products = await this.getProducts();

        if(products.length === 0){
            product.id = 1;
        }else{
            product.id = products[products.length-1].id+1;
        }

        products.push(product);

        await fs.promises.writeFile(`./${this.path}`, JSON.stringify(products, null, '\t'));

        return product;

    }

    getProducts = async() => {   
        if(fs.existsSync(`./${this.path}`)){
            const data = await fs.promises.readFile(`./${this.path}`, 'utf-8');
            const products = JSON.parse(data);
            return products;
        }else{
            return [];
        }
    }

    getProductById = async(aId) => {
        if(fs.existsSync(`./${this.path}`)){
            const data = await fs.promises.readFile(`./${this.path}`, 'utf-8');
            const products = JSON.parse(data);
            let productMatched = products.find(product => product.id == aId);

            if(productMatched == undefined){
                return 'ID not found'
            }else{
                return productMatched;
            }
        }else{
            return 'The file is empty';
        }
    }

    updateProduct = async (aId, product) => {

        const products = await this.getProducts();

        if(products.length === 0){
            return 'Empty file: Can not update a product'
        }else{
            let productById = await productManager.getProductById(aId);
            if(productById == 'ID not found'){
                return 'ID not found';
            }else{
                product.id = productById.id;
                products[productById.id-1] = product;
                await fs.promises.writeFile(`./${this.path}`, JSON.stringify(products, null, '\t'));
                return product;
            }
                
        }

    }

    deleteProductById = async(aId) => {
        if(fs.existsSync(`./${this.path}`)){
            const data = await fs.promises.readFile(`./${this.path}`, 'utf-8');
            const products = JSON.parse(data);
            let productMatched = products.find(product => product.id == aId);

            if(productMatched == undefined){
                return 'ID not found'
            }else{
                let newArrayProducts = products.filter(product => product.id !== aId);
                await fs.promises.writeFile(`./${this.path}`, JSON.stringify(newArrayProducts, null, '\t'));
                return newArrayProducts;
            }
        }else{
            return 'The file is empty';
        }
    }

}

// const productManager = new ProductManager("products.json");

// //COMENTAR SEGUN CORRESPONDA PARA SU PRUEBA
// const test = async() => {

//     //MUESTRA LOS PRODUCTOS AL PRINCIPIO
//     let products = await productManager.getProducts();
//     console.log("////////// All products: //////////");
//     console.log(products);

//     //CREA PRODUCTOS
//     console.log("Carga de producto...");
//     let product = {
//         title: "producto prueba",
//         description: "Este es un producto prueba",
//         price: 200,
//         thumbnail: "Sin imagen",
//         code: "abc123",
//         stock: 741
//     }
//     await productManager.addProduct(product);

//     //VUELVE A MOSTRAR LOS PRODUCTOS
//     products = await productManager.getProducts();
//     console.log("Mostrando productos:");
//     console.log(products);

//     //BUSCA UN PRODUCTO
//     let productById = await productManager.getProductById(4);
//     console.log("////////// Product by ID: //////////");
//     console.log(productById);
    
//     //ACTUALIZA UN PRODUCTO
//     console.log("Carga de producto a editar...");
//     let productUpdate = {
//         title: "blablabla",
//         description: "Este es un producto prueba",
//         price: 200,
//         thumbnail: "Sin imagen",
//         code: "abc123",
//         stock: 999
//     }
//     let productUpdateById = await productManager.updateProduct(4, productUpdate);
//     console.log("////////// Product update by ID: //////////");
//     console.log(productUpdateById);

//     //ELIMINA UN PRODUCTO
//     let productDelete = await productManager.deleteProductById(4);
//     console.log("////////// All products: //////////");
//     console.log(productDelete);

// } 
