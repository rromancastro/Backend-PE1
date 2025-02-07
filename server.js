import express from 'express';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartRouter.js';

const app = express();

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.listen(8080, ()=>console.log('Server is running on port 8080'));