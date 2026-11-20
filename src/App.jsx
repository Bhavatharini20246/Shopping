
import React, { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 1999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    id: 4,
    name: "Travel Backpack",
    price: 999,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
  },
  {
    id: 5,
    name: "Digital Camera",
    price: 15999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
  },
  {
    id: 6,
    name: "Sunglasses",
    price: 799,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
  }
];

function App() {
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

  const changeQuantity = (id, amount) => {
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
    <div className="app">

      {/* Navigation */}
      <header className="navbar">
        <h2 className="logo">ShopEasy.</h2>

        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <button onClick={() => setShowCart(!showCart)}>
            🛒 Cart ({cartCount})
          </button>
        </nav>
      </header>

      {/* Hero section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Discover Your<br />Perfect Products</h1>
          <p>Shop the latest collections at amazing prices.</p>
          <a href="#products" className="shop-btn">
            Shop Now
          </a>
        </div>
      </section>

      {/* Products */}
      <section className="products" id="products">
        <h2>Our Products</h2>
        <p className="subtitle">
          Explore our latest collections
        </p>

        <input
          type="text"
          placeholder="Search products..."
          className="search"
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

                <h4>
                  ₹{product.price.toLocaleString("en-IN")}
                </h4>

                <button onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p>No products found.</p>
        )}
      </section>

      {/* Shopping cart */}
      {showCart && (
        <section className="cart-section">
          <div className="cart-heading">
            <h2>Shopping Cart 🛒</h2>
            <button onClick={() => setShowCart(false)}>Close</button>
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
                    <button onClick={() => changeQuantity(item.id, -1)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => changeQuantity(item.id, 1)}>
                      +
                    </button>

                    <button onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <h3>
                Total: ₹{total.toLocaleString("en-IN")}
              </h3>

              <button
                className="checkout"
                onClick={() => alert("Checkout demo! Payment is not connected.")}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </section>
      )}

      {/* Footer */}
      <footer>
        <h2>ShopEasy.</h2>
        <p>Shopping made simple and easy.</p>
        <p>© 2026 ShopEasy. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default App;
