import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import ItemDetail from '../components/ItemDetail';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const { itemId } = useParams();

    useEffect(() => {
        setLoading(true);

        const docRef = doc(db, 'productos', itemId);

        getDoc(docRef)
            .then(response => {
                const data = response.data();

                const productAdapted = {
                    id: response.id,
                    name: data.nombre,
                    img: data.imagen,
                    price: data.precio,
                    category: data.categoria,
                    description: data.descripcion,
                    stock: data.stock
                };

                setProduct(productAdapted);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [itemId]);

    if (loading) {
        return <h3>Cargando detalle...</h3>;
    }

    if (!product) {
        return <h3>El producto no existe</h3>;
    }

    return (
        <div>
            <ItemDetail {...product} />
        </div>
    );
};

export default ItemDetailContainer;