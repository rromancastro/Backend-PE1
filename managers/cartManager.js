import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const id = uuidv4();

class CartManager {
    constructor(path) {
        this.path = path;
    }

    async createCart() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify({
                id: id,
                products: []
            }, null, 2));
        }

         catch (error) {
            throw new Error(error);
        }
    }

    async getCartInfo(cid) {
        try {
            const cartInfo = await fs.promises.readFile(`./data/cartID-${cid}.json`, 'utf-8');
            return JSON.parse(cartInfo);
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProductToCart(pid, cid) {
        try {
            let cart = await this.getCartInfo(cid);
            let productExists = cart.products.find(p => p.id === pid);
            if (productExists) {
                cart.products = cart.products.map(p => {
                    if (p.id === pid) {
                        p.quantity++;
                    }
                    return p;
                });
            } else {
                cart.products.push({
                    id: pid,
                    quantity: 1
                });
            }
            await fs.promises.writeFile(`./data/cartID-${cid}.json`, JSON.stringify(cart, null, 2));
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const manager = new CartManager(`./data/cartID-${id}.json`);
