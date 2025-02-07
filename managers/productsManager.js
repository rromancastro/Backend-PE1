import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

class ProductsManager {
    constructor(path) {
        this.path = path;
    }
    
    async getAllProducts(limit) {
        try {
            const users = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(users).slice(0, limit);
        } catch (error) {
            throw new Error(error);
            console.log(error);
        }
    };

    async getProductById(id) {
        try {
            let products = await this.getAllProducts();
            products = products.filter(product => product.id === id);
            console.log(products)
            return products;
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProduct(product) {
        try {
            let products = await this.getAllProducts();
            products.push({
                id: uuidv4(),
                status: true,
                ...product
            });
            fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(productData, id) {
        try {
            let products = await this.getAllProducts();
            let productIndex = products.findIndex(p => p.id === id);
            if (productIndex === -1) {
                throw new Error('Product not found');
            }
            products[productIndex] = {
                ...products[productIndex],
                ...productData
            };
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.getAllProducts();
            products = products.filter(product => product.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const manager = new ProductsManager("./data/products.json");