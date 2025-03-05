import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/cart/useCart';
import { Link } from 'react-router-dom';
import '../styles/ProductsPage.css';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
}

interface MercadoLibreResponse {
  results: {
    id: string;
    title: string;
    price: number;
    thumbnail: string;
    available_quantity: number;
    thumbnail_id: string;
  }[];
}

const ProductsPage: React.FC = () => {
  const { cart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=tecnologia`)
      .then(response => response.json())
      .then((data: MercadoLibreResponse) => {
        const mappedProducts = data.results.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price,
          description: item.title,
          image: `https://http2.mlstatic.com/D_${item.thumbnail_id}-O.jpg`,
          stock: item.available_quantity,
        }));
        setProducts(mappedProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="page-title">Productos de Tecnología</h1>

        {!cart && (
          <div className="no-cart-message">
            <p>
              Para comenzar a comprar, primero debes crear un carrito.
              <Link to="/cart-selection" className="create-cart-link">Crear Carrito</Link>
            </p>
          </div>
        )}

        {loading ? (
          <p className="loading-message">Cargando productos...</p>
        ) : products.length === 0 ? (
          <p className="no-products-message">No hay productos disponibles en este momento.</p>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
