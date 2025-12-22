import Item from './Item'

const ItemList = ({ products }) => {
    return (
        <div className="container">
            <div className="ListGroup">
                {products.map(prod => (
                    <Item key={prod.id} {...prod} />
                ))}
            </div>
        </div>
    )
}

export default ItemList