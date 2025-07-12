import { useInfiniteQuery } from '@tanstack/react-query';

export function useProducts(keyword, sort) {
    return useInfiniteQuery({
        queryKey: ['products', keyword, sort],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await fetch(`http://localhost:4000/products?keyword=${keyword}&page=${pageParam}&size=10&sort=${sort}`);
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