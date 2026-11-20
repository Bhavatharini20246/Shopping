
import React, { useState } from "react";

const products = [
  { id: 1, name: "Wireless Headphones", price: 1499, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
  { id: 2, name: "Smart Watch", price: 2499, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
  { id: 3, name: "Running Shoes", price: 1999, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
  { id: 4, name: "Backpack", price: 999, category: "Fashion", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500" },
  { id: 5, name: "Digital Camera", price: 15999, category: "Electronics", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500" },
  { id: 6, name: "Sunglasses", price: 799, category: "Fashion", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500" },
  { id: 7, name: "Laptop", price: 45999, category: "Electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500" },
  { id: 8, name: "Sports Shoes", price: 2299, category: "Fashion", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + amount }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || product.category === category)
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  return (
    <div>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: Arial, sans-serif;
          background: #f5f5f5;
          color: #222;
        }

        .navbar {
          background: #25213d;
          color: white;
          padding: 20px 8%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .logo {
          font-size: 28px;
          color: #b9a5ff;
        }

        nav {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        nav a {
          text-decoration: none;
          color: white;
          font-weight: bold;
        }

        button {
          cursor: pointer;
          border: none;
          border-radius: 5px;
        }

        .cart-btn {
          background: #7654e8;
          color: white;
          padding: 11px 18px;
        }

        .hero {
          min-height: 400px;
          background: linear-gradient(120deg, #e5ddff, #dceaff);
          display: flex;
          align-items: center;
          padding: 60px 10%;
        }

        .hero h1 {
          font-size: 48px;
          color: #25213d;
          margin-bottom: 15px;
        }

        .hero p {
          margin-bottom: 25px;
          color: #555;
        }

        .shop-btn {
          display: inline-block;
          background: #6741d9;
          color: white;
          text-decoration: none;
          padding: 13px 25px;
          border-radius: 5px;
        }

        .products {
          padding: 55px 8%;
          text-align: center;
        }

        .products h2 {
          font-size: 30px;
        }

        .subtitle {
          color: #888;
          margin: 12px 0 25px;
        }

        .search {
          width: 100%;
          padding: 14px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
          margin-bottom: 20px;
        }

        .categories {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .categories button {
          padding: 10px 22px;
          border: 1px solid #6741d9;
          color: #6741d9;
          background: white;
        }

        .categories button.active {
          background: #6741d9;
          color: white;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }

        .product-card {
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 3px 12px #ddd;
          transition: 0.3s;
          text-align: left;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .product-info {
          padding: 18px;
        }

        .product-info small {
          color: #888;
        }

        .product-info h3 {
          margin: 10px 0;
        }

        .product-info h4 {
          font-size: 20px;
          margin-bottom: 15px;
        }

        .add-btn {
          background: #6741d9;
          color: white;
          padding: 11px 18px;
          width: 100%;
        }

        .cart-section {
          background: white;
          margin: 20px 8%;
          padding: 30px;
          border-radius: 10px;
        }

        .cart-heading {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
          border-bottom: 1px solid #eee;
          gap: 15px;
        }

        .quantity {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .quantity button {
          padding: 8px 12px;
          background: #eee;
        }

        .remove {
          color: red;
          background: transparent;
        }

        .total {
          margin: 25px 0;
        }

        .checkout {
          background: #6741d9;
          color: white;
          padding: 13px 22px;
        }

        footer {
          background: #25213d;
          color: white;
          text-align: center;
          padding: 35px;
          line-height: 2;
        }

        @media(max-width: 900px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media(max-width: 550px) {
          .navbar {
            padding: 15px;
            flex-direction: column;
            gap: 15px;
          }

          nav {
            gap: 12px;
          }

          .hero h1 {
            font-size: 34px;
          }

          .product-grid {
            grid-template-columns: 1fr;
          }

          .cart-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .cart-section {
            margin: 15px;
            padding: 20px;
          }
        }
      `}</style>

      <header className="navbar">
        <h2 className="logo">ShopEasy.</h2>
        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
            🛒 Cart ({cartCount})
          </button>
        </nav>
      </header>

      <section className="hero" id="home">
        <div>
          <h1>Discover Your<br />Perfect Products</h1>
          <p>Shop the latest collections at amazing prices.</p>
          <a href="#products" className="shop-btn">Shop Now</a>
        </div>
      </section>

      <section className="products" id="products">
        <h2>Our Products</h2>
        <p className="subtitle">Explore our latest collections</p>

        <input
          className="search"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="categories">
          {["All", "Electronics", "Fashion"].map(cat => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <small>{product.category}</small>
                <h3>{product.name}</h3>
                <h4>₹{product.price.toLocaleString("en-IN")}</h4>
                <button className="add-btn" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && <p>No products found.</p>}
      </section>

      {showCart && (
        <section className="cart-section">
          <div className="cart-heading">
            <h2>Shopping Cart 🛒</h2>
            <button onClick={() => setShowCart(false)}>✖ Close</button>
          </div>

          {cart.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            <>
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <h4>{item.name}</h4>
                    <p>₹{item.price.toLocaleString("en-IN")}</p>
                  </div>

                  <div className="quantity">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    <button className="remove" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <h3 className="total">
                Total: ₹{total.toLocaleString("en-IN")}
              </h3>

              <button
                className="checkout"
                onClick={() => alert("Checkout demo! Payment gateway not connected.")}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </section>
      )}

      <footer>
        <h2>ShopEasy.</h2>
        <p>Shopping made simple and easy.</p>
        <p>© 2026 ShopEasy. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
