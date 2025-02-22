import {Server} from 'socket.io';
import express from 'express';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views-router.js';
import path from 'path';
import fs from 'fs';

const app = express();

app.engine('handlebars', handlebars.engine());

app.set('views', path.join(`${process.cwd()}/src/views`));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(`${process.cwd()}/src/public`)));
app.use(express.json());
app.use('/', viewsRouter);

const httpServer = app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

const socketServer = new Server(httpServer);

let products = [];
fs.promises.readFile(path.join(`${process.cwd()}/src/data/products.json`), "utf-8")
.then((data) => {
  products = JSON.parse(data);
})
.catch((err) => {
  console.log(err);
});

socketServer.on('connection', (socket) => {
  console.log('A user connected');
  console.log(products)
  socket.emit('printProducts', products);
});