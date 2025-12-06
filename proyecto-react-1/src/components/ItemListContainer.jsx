import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProducts, getProductsByCategory } from '../asyncMock'

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    const { categoryId } = useParams()

    useEffect(() => {
        const asyncFunc = categoryId ? getProductsByCategory : getProducts

        asyncFunc(categoryId)
            .then(response => {
                setProducts(response)
            })
            .catch(error => {
                console.error(error)
            })
    }, [categoryId])

    return (
        <div>
            <h1>{greeting}</h1>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {products.map(prod => (
                    <div key={prod.id} style={{ border: '1px solid black', padding: '20px' }}>
                        <h3>{prod.name}</h3>
                        <p>Precio: ${prod.price}</p>
                        <p>Categoría: {prod.category}</p>
                        <Link to={`/item/${prod.id}`}>Ver Detalle</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ItemListContainer