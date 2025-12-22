import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartWidget = () => {
    const { cart } = useContext(CartContext);

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div style={{ 
            display: totalQuantity > 0 ? 'flex' : 'none', 
            alignItems: 'center', 
            color: 'white', 
            gap: '5px' 
        }}>
            <span style={{fontSize: '1.5rem'}}>🛒</span>
            <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{totalQuantity}</span>
        </div>
    );
}

export default CartWidget;