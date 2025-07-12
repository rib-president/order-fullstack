const express = require('express');
const router = express.Router();
const products = require('../data/products');

let cart = [];

router.get('/', (req, res) => {
    const data = cart.map(item => {
        const product = products.find(p => p.id === Number(item.id));
        return {
            ...item,
            stock: product?.stock ?? 0,
        };
    });

    res.json(data);
});

router.post('/', (req, res) => {
    const { id, name, price, qty } = req.body;
    if (!id || !name || !price || !qty) {
        return res.status(400).json({ message: '필수 항목 누락'});
    }

    const product = products.find((item) => item.id === Number(id));
    if(!product) return res.status(404).json({ message: '상품 없음' });
    
    const existing = cart.find(item => item.id === id);
    const newQty = (existing?.qty || 0) + Number(qty);

    if(product.stock < newQty) {
        return res.status(400).json({ message: '재고 부족' });
    }

    if (existing) {
        existing.qty = newQty;
    } else {
        cart.push({ id, name, price, image: product.images[0], qty });
    }

    const data = cart.map(item => {
        const product = products.find(p => p.id === Number(item.id));
        return {
            ...item,
            stock: product?.stock ?? 0,
        };
    });

    res.status(201).json({ message: '장바구니에 추가됨', cart: data });
});

router.patch('/:id', (req, res) => {
    const { qty } = req.body;
    const id = req.params.id;
    const product = products.find(p => p.id === Number(id));
    if(!product) return res.status(404).json({ message: '상품 없음' });

    if (qty > product.stock) {
        return res.status(400).json({ message: '재고보다 큰 수량 입력으로 실패' });
    }

    const item = cart.find(item => item.id === id);
    if (item) {
        item.qty = qty;

        const data = cart.map(item => {
            const product = products.find(p => p.id === Number(item.id));
            return {
                ...item,
                stock: product?.stock ?? 0,
            };
        });
        res.json(data);
    } else {
        res.status(404).json({ message: '장바구니에 상품 없음' });
    }
});

router.delete('/:id', (req, res) => {
    cart = cart.filter(item => item.id !== req.params.id);
    res.json(cart);
});

router.delete('/', (req, res) => {
    cart = [];
    res.json(cart);
});

module.exports = router;
