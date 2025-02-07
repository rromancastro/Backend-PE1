import { Router } from "express";
import { manager } from "../managers/productsManager.js";
import { productValidator } from "../middlewares/index.js";

const router = Router();

router.get('/', (req, res) => {
    const { limit } = req.query;
    if(limit){
        manager.getAllProducts(limit)
        .then((products) => {
            console.log(products);
            res.json(products);
        }).catch((error) => {
            console.log(error);
        });
    } else {
        manager.getAllProducts()
        .then((products) => {
            console.log(products);
            res.json(products);
        }).catch((error) => {
            console.log(error);
        });
    }
});

router.get('/:pid', (req, res) => {
    const {pid} = req.params;
    manager.getProductById(pid)
    .then((product) => {
        res.json(product);
    }).catch((error) => {
        console.log(error);
    });
});

router.post('/', [productValidator], (req, res, next) => {
    manager.addProduct(req.body)
    .then(() => {
        console.log('Product added')
        res.send('Product added');
    })
    .catch((error) => {
        console.log(error);
        next(error);
    });
});

router.put('/:pid', async (req, res) => {
    const {pid} = req.params;
    const productExists = await manager.getProductById(pid);
    console.log(productExists);

    if (!productExists) {
        return res.status(404).send('Product not found');
    }

    manager.updateProduct(req.body, pid)
    .then(() => {
        console.log('Product updated');
        res.send('Product updated');
    })
    .catch((error) => {
            console.log(error);
            res.status(404).send('Product not found');
    });
});

router.delete('/:pid', async (req, res) => {
    const {pid} = req.params;
    const productExists = await manager.getProductById(pid);
    console.log(productExists);

    if (!productExists) {
        return res.status(404).send('Product not found');
    }

    manager.deleteProduct(pid)
    .then(() => {
        console.log('Product deleted');
        res.send('Product deleted');
    })
    .catch((error) => {
        console.log(error);
        res.status(404).send('Product not found');
    });

});

export default router;