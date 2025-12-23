import { createContext, useState } from "react";

export const CartContext = createContext({
    cart: [],
    total: 0
});

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);


    const total = cart.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0);

    const addItem = (item, quantity) => {
        if (!isInCart(item.id)) {
            setCart(prev => [...prev, { ...item, quantity }]);
        } else {
            console.error("El producto ya fue agregado");
        }
    };

    const removeItem = (itemId) => {
        const cartUpdated = cart.filter(prod => prod.id !== itemId);
        setCart(cartUpdated);
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (itemId) => {
        return cart.some(prod => prod.id === itemId);
    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};