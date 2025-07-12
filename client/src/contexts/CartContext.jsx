import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

function reducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const exists = state.find(i => i.id === action.item.id);
            if (exists) return state.map(i =>
                i.id === exists.id ? { ...i, qty: i.qty + action.item.qty } : i);
            return [...state, action.item];
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [cart, dispatch] = useReducer(reducer, []);
    const addItem = (item) => dispatch({ type: 'ADD', item });
    return (
        <CartContext.Provider value={{ cart, addItem }}>
            {children}
        </CartContext.Provider>
    );
}
