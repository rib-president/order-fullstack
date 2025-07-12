import { useInfiniteQuery } from '@tanstack/react-query';

export function useProducts({ type, keyword, min, max, sort }) {
    return useInfiniteQuery({
        queryKey: ['products', type, keyword, min, max, sort],
        queryFn: async ({ pageParam = 1 }) => {
            const params = new URLSearchParams();
            params.set('page', pageParam);
            params.set('sort', sort);                        
            params.set('type', type);
            if (type === 'price') {
                if (min) params.set('min', min);
                if (max) params.set('max', max);
            } else {                                
                params.set('keyword', keyword);
            }
            const res = await fetch(`http://localhost:4000/products?${params}`);
            return res.json();
        },
        getNextPageParam: (lastPage, allPages) => {
            const loaded = allPages.flatMap(p => p.items).length;
            if (loaded < lastPage.total) {
                return allPages.length + 1;
            }
            return undefined;
        },
        enabled: keyword !== null,
    });
}