import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// 1. ELIMINAMOS asyncMock E IMPORTAMOS LO DE FIREBASE
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../firebaseConfig' // <--- OJO: Ajusta la ruta si es necesario (ej: ../../firebaseConfig)

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true) // (Opcional) Agregamos estado de carga
    
    const { categoryId } = useParams()

    useEffect(() => {
        setLoading(true)

        // 2. DEFINIMOS LA COLECCIÓN Y LA CONSULTAS
        const collectionRef = collection(db, 'products')

        // Si hay categoría, filtramos. Si no, traemos todo.
        const q = categoryId 
            ? query(collectionRef, where('category', '==', categoryId))
            : collectionRef

        // 3. HACEMOS LA PETICIÓN A FIREBASE
        getDocs(q)
            .then(response => {
                // Adaptamos los datos: Unimos el ID del documento con sus campos (data)
                const productsAdapted = response.docs.map(doc => {
                    const data = doc.data()
                    return { id: doc.id, ...data }
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
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {products.map(prod => (
                    <div key={prod.id} style={{ border: '1px solid black', padding: '20px' }}>
                        {/* IMPORTANTE: Asegúrate de que los nombres de las propiedades 
                           (prod.name, prod.price) coincidan con lo que subiste a Firebase.
                           Si en tu mock se llamaban 'title', cámbialo aquí por prod.title 
                        */}
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