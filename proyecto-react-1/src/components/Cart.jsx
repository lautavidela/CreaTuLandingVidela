import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, clearCart, removeItem } = useContext(CartContext);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="container" style={{textAlign: 'center', padding: '100px'}}>
                <h1>No hay productos en el carrito</h1>
                <Link to='/' className="Button">Volver al inicio</Link>
            </div>
        )
    }

    return (
        <div className="container">
            <h1 className="page-title">Tu Carrito</h1>
            

            <div>
                {cart.map(p => (
                    <div key={p.id} className="CartItem">
                        <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>

                           {p.img && <img src={p.img} alt={p.name} style={{width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px'}}/>}
                           <div>
                                <h3>{p.name}</h3>
                                <p>Cantidad: {p.quantity}</p>
                           </div>
                        </div>
                        
                        <div style={{textAlign: 'right'}}>
                            <p style={{fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '10px'}}>${p.price * p.quantity}</p>
                            <button onClick={() => removeItem(p.id)} className="Button Danger">
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '30px', gap: '20px'}}>
                <h2 style={{fontSize: '1.5rem'}}>Total: ${total}</h2>
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px'}}>
                <button onClick={() => clearCart()} className="Button Secondary">Vaciar Carrito</button>
                <Link to='/checkout' className="Button">Terminar Compra</Link>
            </div>
        </div>
    )
}

export default Cart;