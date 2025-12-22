import { useState, useContext } from "react"
import { CartContext } from "../context/CartContext"
import { db } from "../firebaseConfig"
import { collection, addDoc, Timestamp } from "firebase/firestore"

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState('')

    const { cart, clearCart } = useContext(CartContext)

    // Estado para los datos del comprador
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: ''
    })

    // Función para manejar el cambio en los inputs
    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    // Función para crear la orden
    const createOrder = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // 1. Armamos el objeto de la orden
            const objOrder = {
                buyer: userData,
                items: cart,
                total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
                date: Timestamp.fromDate(new Date())
            }

            // 2. Creamos la referencia a la colección "orders" (se crea sola si no existe)
            const orderRef = collection(db, 'orders')

            // 3. Guardamos en Firebase
            const orderAdded = await addDoc(orderRef, objOrder)

            // 4. Guardamos el ID que nos dio Firebase y limpiamos el carrito
            setOrderId(orderAdded.id)
            clearCart()

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <h1>Se está generando su orden...</h1>
    }

    if (orderId) {
        return <h1>El id de su orden es: {orderId}</h1>
    }

    return (
        <div style={{padding: '20px'}}>
            <h1>Checkout</h1>
            <form onSubmit={createOrder} style={{display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px'}}>
                <label>
                    Nombre:
                    <input type="text" name="name" value={userData.name} onChange={handleInputChange} required style={{width: '100%'}}/>
                </label>
                <label>
                    Teléfono:
                    <input type="text" name="phone" value={userData.phone} onChange={handleInputChange} required style={{width: '100%'}}/>
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={userData.email} onChange={handleInputChange} required style={{width: '100%'}}/>
                </label>

                <button type="submit" style={{padding: '10px', backgroundColor: 'blue', color: 'white'}}>Generar Orden</button>
            </form>
        </div>
    )
}

export default Checkout