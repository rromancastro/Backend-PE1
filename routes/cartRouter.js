import { Router } from "express";
import { manager } from "../managers/cartManager.js";

const router = Router();

router.post('/', (req, res) => {
    manager.createCart()
    .then(() => {
        console.log('Cart created');
        res.send('Cart created');
    }).catch((error) => {
        console.log(error);
        res.send('Error - Cart not created');
    });
})

router.get('/:cid', (req, res) => {
    const {cid} = req.params;

    manager.getCartInfo(cid)
    .then((cart) => {
        res.json(cart);
    }).catch((error) => {
        console.log(error);
        res.status(404).send('Error - Cart not found');
    });
});

router.post('/:cid/product/:pid', (req, res) => {
    const {cid, pid} = req.params;
    manager.addProductToCart(pid, cid)
    .then(() => {
        console.log('Product added to cart');
        res.send('Product added to cart');
    }).catch((error) => {
        console.log(error);
        res.send('Error - Product not added to cart');
    });
});

export default router;
