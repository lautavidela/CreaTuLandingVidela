import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, clearCart, removeItem } = useContext(CartContext);

    // Calculamos el total a pagar (esto también podría ir en el Context, pero aquí sirve)
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Caso 1: El carrito está vacío
    if (cart.length === 0) {
        return (
            <div style={{textAlign: 'center', padding: '50px'}}>
                <h1>No hay productos en el carrito</h1>
                <Link to='/' style={{fontSize: '20px'}}>Volver al inicio</Link>
            </div>
        )
    }

    // Caso 2: Hay productos
    return (
        <div style={{padding: '20px'}}>
            <h1>Tu Carrito</h1>
            
            {/* Listado de productos */}
            {cart.map(p => (
                <div key={p.id} style={{borderBottom: '1px solid #ccc', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        <h3>{p.name}</h3>
                        <p>Precio unit: ${p.price}</p>
                        <p>Cantidad: {p.quantity}</p>
                    </div>
                    <div>
                        <p style={{fontWeight: 'bold'}}>Subtotal: ${p.price * p.quantity}</p>
                        <button onClick={() => removeItem(p.id)} style={{backgroundColor: 'red', color: 'white'}}>
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}

            <h2 style={{textAlign: 'right'}}>Total a pagar: ${total}</h2>

            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '15px'}}>
                <button onClick={() => clearCart()} style={{padding: '10px'}}>Vaciar Carrito</button>
                <Link to='/checkout' style={{backgroundColor: 'green', color: 'white', padding: '10px', textDecoration: 'none'}}>Generar Orden</Link>
            </div>
        </div>
    )
}

export default Cart;