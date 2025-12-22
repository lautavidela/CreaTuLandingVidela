import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import ItemCount from './ItemCount'
import { CartContext } from '../context/CartContext' 

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
    const [quantityAdded, setQuantityAdded] = useState(0)
    const { addItem } = useContext(CartContext)

    const handleOnAdd = (quantity) => {
        setQuantityAdded(quantity)
        const item = { id, name, price, img }
        addItem(item, quantity)
    }

    return (
        <article className="ItemDetailContainer">
            <img src={img} alt={name} className="DetailImg"/>
            
            <section className="DetailInfo">
                <header>
                    <h2 style={{fontSize: '2.5rem', marginBottom: '10px'}}>{name}</h2>
                </header>
                
                <p style={{fontSize: '1.2rem', color: '#555'}}>{description}</p>
                <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#27ae60'}}>${price}</p>
                
                {
                    quantityAdded > 0 ? (
                        <div style={{display: 'flex', gap: '10px'}}>
                            <Link to='/cart' className='Button'>Terminar compra</Link>
                            <Link to='/' className='Button Secondary'>Seguir comprando</Link>
                        </div>
                    ) : (
                        <ItemCount initial={1} stock={stock} onAdd={handleOnAdd} />
                    )
                }
            </section>
        </article>
    )
}

export default ItemDetail