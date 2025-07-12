const express = require('express');
const router = express.Router();
const products = require('../data/products');

router.post('/', (req, res) => {
    const orderItems = req.body.items;

    for (const orderItem of orderItems) {
        const product = products.find(p => p.id === Number(orderItem.id));
        if (!product) {
            return res.status(404).json({ message: `상품(${orderItem.name}) 없음`});
        }
        if (product.stock < orderItem.qty) {
            return res.status(400).json({ message: `상품(${product.name}) 재고 부족`});
        }

        product.stock -= orderItem.qty;
    }

    req.session.cart = [];

    res.status(200).json({ message: '주문 완료' });
});

module.exports = router;