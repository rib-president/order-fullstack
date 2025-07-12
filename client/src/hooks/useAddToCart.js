import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (item) => {
            const res = await fetch('http://localhost:4000/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(item),
            });

            const json = await res.json();
            console.log(json);
            if (!res.ok) throw new Error(json.message || '장바구니 담기 실패');
            return json;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
        }
    })
}