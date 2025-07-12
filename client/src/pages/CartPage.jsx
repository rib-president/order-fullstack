import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
    const [qtyMap, setQtyMap] = useState({});
    const { items, updateQty, removeItem, clearCart } = useCart();
    const [isOrderModalOpen, setOrderModalOpen] = useState(false);

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    const handleOrder = () => {
        setOrderModalOpen(true);
    };

    const handleCloseModal = () => {
        setOrderModalOpen(false);
        clearCart();
    };

    useEffect(() => {
        const initialMap = {};
        items.forEach(item => {
            initialMap[item.id] = item.qty;
        });
        setQtyMap(initialMap);
    }, [items]);

    if (items.length === 0) {
        return <p className="p-4 text-center text-gray-500">장바구니가 비어 있습니다.</p>;
    }

    return (
        <div className="max-w-screen-md mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">장바구니</h1>

            <ul className="space-y-4">
                {items.map(({ id, name, price, qty, image, stock}) => (
                    <li key={id} className="flex items-center gap-4 border p-4 rounded">
                        <img src={image} alt={name} className="w-20 h-20 object-cover rounded" /> 
                        <div className="flex-1">
                            <h2 className="font-semibold text-lg">{name}</h2>
                            <p className="text-gray-600">{price.toLocaleString()}원</p>

                            <div className="mt-2 flex items-center gap-2">                                
                                <input 
                                    type="number"
                                    min={1}
                                    max={stock}
                                    value={qtyMap[id] ?? qty}                                    
                                    onChange={(e) => {
                                        let value = e.target.value;

                                        if (!/^\d*$/.test(value)) return;

                                        let numericValue = parseInt(value, 10);

                                        if(numericValue > parseInt(stock, 10))  numericValue = stock;
                                        console.log(numericValue, stock);                                        
                                
                                        setQtyMap(prev => ({ ...prev, [id]: numericValue.toString() }));
                                        
                                    }}
                                    className="w-20 text-center border rounded"
                                />
                                <button
                                    onClick={() => {
                                        let val = parseInt(qtyMap[id], 10);                                        
                                        updateQty(id, val);
                                    }}
                                    className="ml-2 px-2 py-1 bg-blue-600 text-white rounded"
                                    disabled={parseInt(qtyMap[id], 10) > stock}
                                >
                                    변경
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col items-end">
                            <button
                                onClick={() => removeItem(id)}
                                className="text-red-500 hover:underline mb-2"
                            >
                                삭제
                            </button>
                            <p className="font-semibold">{(price * qty).toLocaleString()}원</p>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-6 flex justify-between items-center font-bold text-xl">
                <span>총 합계:</span>
                <span>{totalPrice.toLocaleString()}원</span>
            </div>

            <div className="mt-6 text-center">
                <button
                    onClick={handleOrder}
                    className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
                >
                    주문하기
                </button>
            </div>

            {isOrderModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded max-w-sm text-center">
                        <h2 className="text-2xl font-bold mb-4">주문 완료!</h2>
                        <p className="mb-6">감사합니다. 주문이 정상적으로 접수되었습니다.</p>
                        <button
                            onClick={handleCloseModal}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover-bg-blue-700"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}