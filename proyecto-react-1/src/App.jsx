import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart'; 
import Checkout from './components/Checkout';
import { CartProvider } from './context/CartContext'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
            <Header />
            
            {/* AGREGAMOS ESTA ETIQUETA MAIN CON LA CLASE main-content */}
            <main className="main-content">
              <Routes>
                <Route path="/" element={<ItemListContainer greeting="Todos los productos" />} />
                <Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos filtrados" />} />
                <Route path="/item/:itemId" element={<ItemDetailContainer />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<h2>404 Not Found</h2>} />
              </Routes>
            </main>

            <Footer />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
} 

export default App;