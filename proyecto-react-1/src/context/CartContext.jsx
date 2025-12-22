import { createContext, useState } from "react";

// 1. Creamos el Contexto (lo que se exporta para consumir)
export const CartContext = createContext({
    cart: []
});

// 2. Creamos el Proveedor (el componente que envolverá a tu App)
export const CartProvider = ({ children }) => {
    // Aquí guardamos los productos añadidos
    const [cart, setCart] = useState([]);

    console.log(cart); // Esto es para que veas en consola cuando se agrega algo

    // FUNCION 1: Agregar al carrito
    const addItem = (item, quantity) => {
        if (!isInCart(item.id)) {
            // Si no está, lo agregamos copiando lo anterior y sumando el nuevo
            setCart(prev => [...prev, { ...item, quantity }]);
        } else {
            console.error("El producto ya fue agregado");
        }
    };

    // FUNCION 2: Eliminar un producto por su ID
    const removeItem = (itemId) => {
        const cartUpdated = cart.filter(prod => prod.id !== itemId);
        setCart(cartUpdated);
    };

    // FUNCION 3: Limpiar todo el carrito
    const clearCart = () => {
        setCart([]);
    };

    // FUNCION AUXILIAR: Chequear si el producto ya está
    const isInCart = (itemId) => {
        return cart.some(prod => prod.id === itemId);
    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};