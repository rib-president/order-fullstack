import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAddToCart } from '../hooks/useAddToCart';

export default function ProductDetailPage() {
    const { id } = useParams();
    const { addItem } = useCart();
    const [thumb, setThumb] = useState(0);
    const [qty, setQty] = useState("1");
    const { mutate, isPending, isSuccess, isError, error } = useAddToCart();

    const { data, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetch(`http://localhost:4000/products/${id}`).then(r => r.json())
    });

    if (isLoading) return <p className="p-4">로딩...</p>;
    if (!data) return <p className="p-4 text-red-500">데이터 없음</p>

    const { name, price, desc, images, stock } = data;

    const handleAdd = () => {
        const numericQty = parseInt(qty, 10);
        if (isNaN(numericQty) || numericQty < 1 || numericQty > stock) return;
        mutate({ id, name, price, qty: numericQty});
    };

    const handleQtyChange = (e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val)) {
            setQty(val);
        }
    };

    return (
        <div className="max-w-screen-md mx-auto p-4">
            <div className="w-full max-w-md mb-4 rounded overflow-hidden">
                <img src={images[thumb]} alt={name} className="w-96 h-96 object-cover mb-4 rounded" />
            </div>
            <div className="flex gap-2 mb-6">
                {images.map((src, i) => (
                    <img key={i}
                        src={src}
                        onClick={() => setThumb(i)}
                        className={`h-20 w-20 object-cover rounded cursor-pointer ${i===thumb? 'ring-2 ring-blue-400':''}`} />                        
                ))}
            </div>

            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-lg font-semibold mt-2">{price.toLocaleString()}원</p>
            <p className="mt-4">{desc}</p>
            <p className="mt-2 text-sm">{stock>0 ? `재고: ${stock}` : '품절'}</p>

            <div className="mt-6 flex items-center gap-4">
                <input type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"                    
                    max={stock}
                    value={qty}
                    onChange={handleQtyChange}
                    className="border px-2 py-1 w-24" />
                <button
                    disabled={stock===0 || qty>stock || isPending}
                    onClick={handleAdd}
                    className="bg-blue-600 text-white px-6 py-2 rounded disabled:bg-gray-400">
                        {isPending ? '추가 중...' : '장바구니 담기'}
                    </button>
            </div>
            {qty>stock && <p className="text-red-500 mt-2">재고보다 많은 수량입니다.</p>}
            {isSuccess && <p className="text-green-600 mt-2">장바구니에 추가되었습니다.</p>}
            {isError && <p className="text-red-500 mt-2">{error.message}</p>}
        </div>
    );
}