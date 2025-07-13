const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const PORT = 4000;

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

app.use(session({
    secret: 'test-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

app.listen(PORT, () => {
    console.log(`서버 실행됨: http://localhost:${PORT}`)
});