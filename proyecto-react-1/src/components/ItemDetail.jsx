import ItemCount from './ItemCount'

const ItemDetail = ({ id, name, img, category, description, price, stock }) => {
    return (
        <article style={{ border: '1px solid #ccc', padding: '20px', margin: '20px', maxWidth: '400px' }}>
            <header>
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
                
                <ItemCount 
                    initial={1} 
                    stock={stock} 
                    onAdd={(quantity) => console.log('Cantidad agregada: ', quantity)} 
                />
            </footer>
        </article>
    )
}

export default ItemDetail