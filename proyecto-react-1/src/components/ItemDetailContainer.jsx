import { useState, useEffect } from "react"
import ItemDetail from './ItemDetail';
import { useParams } from "react-router-dom"


import { getDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    const { itemId } = useParams()

    useEffect(() => {
        setLoading(true)


        const docRef = doc(db, "products", itemId)


        getDoc(docRef)
            .then((response) => {

                if (response.exists()) {
                    const data = response.data()
                    const productAdapted = { id: response.id, ...data }
                    setProduct(productAdapted)
                } else {
                    console.error("El producto no existe")
                    setProduct(null)
                }
            })
            .catch((error) => {
                console.error(error)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [itemId])

    if (loading) {
        return <h1>Cargando detalle...</h1>
    }

    if (!product) {
        return <h1>El producto no existe</h1>
    }

    return (
        <div>
            <ItemDetail {...product} />
        </div>
    )
}

export default ItemDetailContainer