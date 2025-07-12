import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/cart')
            .then(res => res.json())
            .then(data => setCart(data));
    }, []);


    const addItem = async (item) => {
        const res = await fetch('http://localhost:4000/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
        const data = await res.json();
        if (!res.ok) return { success: false, message: data.message || '장바구니 추가 실패' };
        setCart(data);
        return { success: true };
      };

    const removeItem = async (id) => {
        await fetch(`http://localhost:4000/cart/${id}`, { method: 'DELETE' });
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQty = async (id, qty) => {
        const res = await fetch(`http://localhost:4000/cart/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ qty }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || '수량 업데이트 실패');
        setCart(data);
    };

    const clearCart = async () => {
        const res = await fetch('http://localhost:4000/cart', {
            method: 'DELETE'
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || '장바구니 비우기 실패');
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ items:cart, addItem, removeItem, updateQty, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
