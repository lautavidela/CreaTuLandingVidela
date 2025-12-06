import { useState } from 'react'

const ItemCount = ({ stock, initial, onAdd }) => {
    const [quantity, setQuantity] = useState(initial)

    const increment = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1)
        }
    }

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button onClick={decrement}>-</button>
                <h4>{quantity}</h4>
                <button onClick={increment}>+</button>
            </div>
            <button onClick={() => onAdd(quantity)} disabled={!stock}>
                Agregar al Carrito
            </button>
        </div>
    )
}

export default ItemCount