import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [keyword, setKeyword] = useState('');

    const handleSearch = () => {
        onSearch(keyword);
    };

    return (
        <div className="flex gap-2 p-4">
            <input
                className="border p-2 w-full"
                type="text"
                placeholder="상품명을 입력하세요"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                검색
            </button>
        </div>
    );
}