import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import ItemCount from './ItemCount'

// Importamos el contexto
import { CartContext } from '../context/CartContext' 

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
    // Estado para saber si ya se agregó algo
    const [quantityAdded, setQuantityAdded] = useState(0)

    // Usamos el contexto
    const { addItem } = useContext(CartContext)

    const handleOnAdd = (quantity) => {
        setQuantityAdded(quantity)

        const item = {
            id, 
            name, 
            price,
            img 
        }

        // ¡Aquí es donde ocurre la magia!
        addItem(item, quantity)
    }

    return (
        <article style={{ border: '1px solid #ccc', padding: '20px', margin: '20px', maxWidth: '400px' }}>
            <header>
                {/* Nota: si en tu base de datos usas 'title' en vez de 'name', cambia esto a {title} */}
                <h2>{name}</h2> 
            </header>
            <picture>
                <img src={img} alt={name} style={{ width: '100%' }}/>
            </picture>
            <section>
                <p>Categoria: {category}</p>
                <p>Descripción: {description}</p>
                <p>Precio: ${price}</p>
            </section>
            <footer>
                <p>Stock disponible: {stock}</p>
                
                {/* Lógica: Si quantityAdded > 0 mostramos "Terminar compra", si no mostramos el contador */}
                {
                    quantityAdded > 0 ? (
                        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                            <Link to='/cart' className='Option' style={{backgroundColor: 'green', color: 'white', padding: '10px', textAlign: 'center', textDecoration: 'none'}}>Terminar compra</Link>
                            <Link to='/' className='Option' style={{textAlign: 'center'}}>Seguir comprando</Link>
                        </div>
                    ) : (
                        <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
                    )
                }
            </footer>
        </article>
    )
}

export default ItemDetail