import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import useScrollRestoration from '../hooks/useScrollRestoration';


export default function ProductListPage() {
    useScrollRestoration('product-list-scroll');

    const [keyword, setKeyword] = useState('');
    const [sort, setSort] = useState('default');
    const { 
        data, 
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading, 
        error } = useProducts(keyword, sort);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [keyword, sort]);

    return (
        <div className="px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-4">            
                <SearchBar onSearch={setKeyword} />

                <div className="w-full sm:w-auto">
                    <label htmlFor="sort" className="mr-2 font-semibold">정렬:</label>
                    <select
                        id="sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="border px-3 py-2 rounded w-full sm:w-auto"
                    >
                        <option value="default">기본순</option>
                        <option value="price_asc">가격 오름차순</option>
                        <option value="price_desc">가격 내림차순</option>
                        <option value="latest">최신순</option>
                    </select>
                </div>

                {isLoading && <p className="p-4">로딩 중...</p>}
                {error && <p className="p-4 text-red-500">에러 발생: {error.message}</p>}
            </div>
                
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
                {data?.pages.flatMap(page =>
                    page.items.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}                
            </div>

            {hasNextPage && (
                <div className="text-center pb-8">
                    <button
                        onClick={() => fetchNextPage()}
                        className="bg-gray-800 text-white px-6 py-2 rounded mt-4"
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage ? '로딩 중...' : '더 보기'}
                    </button>
                </div>
            )}
        </div>
    );
}