import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Header() {
    const { items } = useCart();
    const itemCount = items.length;

    return (
        <header className="h-16 bg-white border-b shadow-sm p-4 flex justify-between items-center">
            <Link to="/products?reset=1" className="text-xl font-bold text-gray-800">
                MAIN
            </Link>
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 font-semibold">
                장바구니
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {itemCount}
                    </span>
                )}
            </Link>
        </header>
    );
}