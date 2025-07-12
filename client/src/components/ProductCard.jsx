import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    return (
        <Link to={`/products/${product.id}`} className="block">
            <div className="border rounded-lg p-4 rounded shadow-sm hover:shadow-md transition">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-3 rounded"
                />
                <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
                <p className="text-gray-700 font-medium">{product.price.toLocaleString()}원</p>
            </div>
        </Link>
    );
}