import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [type, setType] = useState('name');
    const [keyword, setKeyword] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (type === 'price') {            
            onSearch({ type, min: minPrice, max: maxPrice });
        } else {
            onSearch({ type, keyword });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-center">
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="border rounded px-2 py-1"
            >
                <option vale="name">상품명</option>
                <option value="id">상품 ID</option>
                <option value="price">금액 범위</option>
            </select>

            {type === 'price' ? (
                <>
                    <input
                        type="number"
                        placeholder="최소 금액"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="border rounded px-2 py-1 w-28"
                    />
                    <span>~</span>
                    <input
                        type="number"
                        placeholder="최대 금액"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="border rounded px-2 py-1 w-28"
                    />
                </>
            ) : (
                <input
                    type="text"
                    placeholder="검색어 입력"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="border rounded px-2 py-1 flex-1"
                />
            )}

            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
                검색
            </button>
        </form>
    );
}