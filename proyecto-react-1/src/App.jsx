import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart'; 

// 1. IMPORTAMOS EL CHECKOUT (NUEVO)
import Checkout from './components/Checkout';

import { CartProvider } from './context/CartContext'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
            <Header />
            <Routes>
              <Route path="/" element={<ItemListContainer greeting="Todos los productos" />} />
              <Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos filtrados" />} />
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              
              {/* 2. AGREGAMOS LA RUTA CHECKOUT */}
              <Route path="/checkout" element={<Checkout />} />
              
              <Route path="*" element={<h2>404 Not Found</h2>} />
            </Routes>
            <Footer />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
} 

export default App;