import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../firebaseConfig'

import ItemList from '../components/ItemList'

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    
    const { categoryId } = useParams()

    useEffect(() => {
        setLoading(true)

        const collectionRef = collection(db, 'productos')

        const q = categoryId 
            ? query(collectionRef, where('categoria', '==', categoryId))
            : collectionRef

        getDocs(q)
            .then(response => {
                const productsAdapted = response.docs.map(doc => {
                    const data = doc.data()
                    
                    return { 
                        id: doc.id, 
                        name: data.nombre,
                        img: data.imagen,
                        price: data.precio,
                        category: data.categoria,
                        description: data.descripcion,
                        stock: data.stock
                    }
                })
                setProducts(productsAdapted)
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [categoryId])

    if(loading) {
        return <h2>Cargando productos...</h2>
    }

    return (
        <div>
            <h1>{greeting}</h1>
            {products.length > 0 
                ? <ItemList products={products} />
                : <p>No se encontraron productos.</p>
            }
        </div>
    )
}

export default ItemListContainer