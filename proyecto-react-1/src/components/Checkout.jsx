import { useState, useContext } from "react"
import { CartContext } from "../context/CartContext"
import { db } from "../firebaseConfig"
import { collection, addDoc, Timestamp, writeBatch, query, where, getDocs, documentId } from "firebase/firestore"

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState('')

    const { cart, clearCart } = useContext(CartContext)

    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: ''
    })

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const createOrder = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const objOrder = {
                buyer: userData,
                items: cart,
                total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
                date: Timestamp.fromDate(new Date())
            }

            const batch = writeBatch(db)
            const productsRef = collection(db, 'productos')
            const ids = cart.map(prod => prod.id)
            const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)))
            const { docs } = productsAddedFromFirestore

            let outOfStock = []

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock

                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart?.quantity

                if(stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc })
                }
            })

            if(outOfStock.length === 0) {
                await batch.commit()
                const orderRef = collection(db, 'orders')
                const orderAdded = await addDoc(orderRef, objOrder)
                setOrderId(orderAdded.id)
                clearCart()
            } else {
                console.error("Hay productos que no tienen stock disponible")
            }

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <h1 className="page-title">Se está generando su orden...</h1>
    }

    if (orderId) {
        return (
            <div className="container" style={{textAlign: 'center', padding: '50px'}}>
                <h1 className="page-title">¡Gracias por su compra!</h1>
                <p style={{fontSize: '1.2rem', marginBottom: '20px'}}>El id de su orden es: <b>{orderId}</b></p>

            </div>
        )
    }

    return (
        <div className="container">
            <h1 className="page-title">Finalizar Compra</h1>
            

            <form onSubmit={createOrder} className="FormContainer">
                <label style={{display: 'block', marginBottom: '15px'}}>
                    Nombre:
                    <input type="text" name="name" value={userData.name} onChange={handleInputChange} required placeholder="Juan Perez"/>
                </label>
                <label style={{display: 'block', marginBottom: '15px'}}>
                    Teléfono:
                    <input type="text" name="phone" value={userData.phone} onChange={handleInputChange} required placeholder="11 1234 5678"/>
                </label>
                <label style={{display: 'block', marginBottom: '20px'}}>
                    Email:
                    <input type="email" name="email" value={userData.email} onChange={handleInputChange} required placeholder="juan@email.com"/>
                </label>

                <button type="submit" className="Button" style={{width: '100%'}}>Generar Orden</button>
            </form>
        </div>
    )
}

export default Checkout