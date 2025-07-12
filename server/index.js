const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);

app.use('/cart', cartRoutes);

app.use('/order', orderRoutes);


app.listen(PORT, () => {
    console.log(`서버 실행됨: http://localhost:${PORT}`)
});