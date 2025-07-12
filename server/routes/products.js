const express = require('express');
const router = express.Router();
const products = require('../data/products');


router.get('/', (req, res) => {
    const { type, keyword, min, max, page = 1, size = 10, sort = 'default' } = req.query;
    let filtered = [...products];

    if (type === 'name' && keyword) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
    } else if (type === 'id' && keyword) {
        filtered = filtered.filter(p => String(p.id) === String(keyword));
    } else if (type === 'price') {                
        const minPrice = parseInt(min, 10);
        const maxPrice = parseInt(max, 10);
        
        if (!isNaN(minPrice)) {            
            filtered = filtered.filter(p => p.price >= minPrice);        
        }
        if (!isNaN(maxPrice)) {        
            filtered = filtered.filter(p => p.price <= maxPrice);            
        }        
    }

    if(sort === 'price_asc') {
        filtered = filtered.sort((a, b) => a.price - b.price);
    } else if(sort === 'price_desc') {
        filtered = filtered.sort((a, b) => b.price - a.price);
    } else if(sort === 'latest') {
        filtered = filtered.sort((a, b) => b.id - a.id);
    }

    const start = (page - 1) * size;
    const end = start + Number(size);
    const paged = filtered.slice(start, end);

    res.json({
        items: paged,
        total: filtered.length
    });
});

router.get('/:id', (req, res) => {
    const product = products.find((v) => v.id == req.params.id);
    if(!product) return res.status(404).json({ error: 'NOT_FOUND' });
    res.json(product);
});

module.exports = router;