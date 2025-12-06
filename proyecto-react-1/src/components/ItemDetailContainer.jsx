import { useState, useEffect } from 'react'
import { getProductById } from '../asyncMock'
import { useParams } from 'react-router-dom'
import ItemDetail from './ItemDetail'

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const { itemId } = useParams()

    useEffect(() => {
        setLoading(true)
        
        getProductById(itemId)
            .then(response => {
                setProduct(response)
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [itemId])

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {loading ? 
                <h3>Cargando producto...</h3> : 
                <ItemDetail {...product} />
            }
        </div>
    )
}

export default ItemDetailContainer