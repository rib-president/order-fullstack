const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const products = [
    { id: 1, name: "상품 A", price: 10000, desc: '멋진 상품 A 설명', 
        images: ['https://cdn.pixabay.com/photo/2025/05/07/19/42/vase-9585892_1280.jpg',
            'https://cdn.pixabay.com/photo/2025/01/07/17/05/buck-9317347_1280.png'],
        stock: 10 },
    { id: 2, name: "상품 B", price: 20000, desc: '멋진 상품 B 설명', 
        images: ['https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
        ], stock: 20 },
    { id: 3, name: "상품 C", price: 30000, desc: '멋진 상품 C 설명', 
        images: ['https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80',
        'https://cdn.pixabay.com/photo/2025/06/20/10/47/dog-9670619_1280.jpg'],
        stock: 30 },
    { id: 4, name: "상품 D", price: 40000, desc: '멋진 상품 D 설명', 
    images: ['https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'],
    stock: 40  },
    { id: 5, name: "상품 E", price: 50000, desc: '멋진 상품 E 설명', 
    images: ['https://images.unsplash.com/photo-1496128858413-b36217c2ce36?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80'],
    stock: 50 },
    { id: 6, name: "상품 F", price: 60000, desc: '멋진 상품 F 설명', 
    images: ['https://cdn.pixabay.com/photo/2025/06/27/17/19/woman-9684224_1280.jpg',
        'https://cdn.pixabay.com/photo/2025/06/05/16/39/desert-9643279_1280.jpg'],
    stock: 60 },
    { id: 7, name: "상품 G", price: 70000, desc: '멋진 상품 G 설명', 
    images: [
        'https://cdn.pixabay.com/photo/2025/06/11/21/09/alpaca-9655132_1280.jpg',
        'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80'
      ], stock: 70 },
    { id: 8, name: "상품 H", price: 80000, desc: '멋진 상품 H 설명', 
    images: [
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80'
      ], stock: 80 },
    { id: 9, name: "상품 I", price: 90000, desc: '멋진 상품 I 설명', 
    images: [
        'https://cdn.pixabay.com/photo/2025/06/15/21/04/golden-retriever-puppy-amber-9661916_1280.jpg',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'
      ], stock: 90 },
    { id: 10, name: "상품 J", price: 100000, desc: '멋진 상품 J 설명', 
    images: [
        'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80'
      ], stock: 100 },
    { id: 11, name: "상품 K", price: 110000, desc: '멋진 상품 K 설명', 
    images: [
        'https://cdn.pixabay.com/photo/2025/06/22/14/12/rusty-tailed-9674318_1280.jpg',
        'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=800&q=80'
      ], stock: 110 },
    { id: 12, name: "상품 L", price: 120000, desc: '멋진 상품 L 설명', 
    images: [
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'
      ], stock: 120 },
    { id: 13, name: "상품 M", price: 130000, desc: '멋진 상품 M 설명', 
    images: [
        'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'
      ], stock: 130 },
    { id: 14, name: "상품 N", price: 140000, desc: '멋진 상품 N 설명', 
    images: [
        'https://cdn.pixabay.com/photo/2023/12/26/11/46/cake-8470012_1280.jpg',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
      ], stock: 140 }
];

let cart = [];

app.get('/products', (req, res) => {
    const { keyword = '', page = 1, size = 10, sort = 'default' } = req.query;

    let filtered = products.filter(product =>
        product.name.toLowerCase().includes(keyword.toLowerCase())    
    );

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

app.get('/products/:id', (req, res) => {
    const p = products.find((v) => v.id == req.params.id);
    if(!p) return res.status(404).json({ error: 'NOT_FOUND' });
    res.json(p);
})

app.post('/cart', (req, res) => {
    const { id, name, price, qty } = req.body;
    if (!id || !name || !price || !qty) {
        return res.status(400).json({ message: '필수 항목 누락'});
    }

    const product = products.find((item) => item.id === Number(id));
    if(!product) return res.status(404).json({ message: '상품 없음' });
    
    const existing = cart.find(item => item.id === id);
    const newQty = (existing?.qty || 0) + Number(qty);

    if(product.stock < newQty) {
        return res.status(400).json({ message: '재고보다 큰 수량 입력으로 실패' });
    }

    if (existing) {
        existing.qty = newQty;
    } else {
        cart.push({ id, name, price, qty });
    }

    res.status(201).json({ message: '장바구니에 추가됨', cart });
})

app.get('/cart', (req, res) => {
    res.json(cart);
});

app.patch('/cart/:id', (req, res) => {
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
        res.json(cart);
    } else {
        res.status(404).json({ message: '장바구니에 상품 없음' });
    }
});


app.delete('/cart/:id', (req, res) => {
    cart = cart.filter(item => item.id !== req.params.id);
    res.json(cart);
});


app.listen(PORT, () => {
    console.log(`서버 실행됨: http://localhost:${PORT}`)
});