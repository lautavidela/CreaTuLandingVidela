import { Link } from 'react-router-dom'

const Item = ({ id, name, img, price, stock }) => {
    return (
        <article className="CardItem">
            <header className="Header">
                <h2 className="CardHeader">{name}</h2>
            </header>
            <picture>
                <img src={img} alt={name} className="CardImg"/>
            </picture>
            <section className="CardContent">
                <p className="CardPrice">${price}</p>
                <p style={{color: '#777', fontSize: '0.9rem'}}>Stock disponible: {stock}</p>
            </section>
            <footer className="CardContent">
                <Link to={`/item/${id}`} className="Button">Ver detalle</Link>
            </footer>
        </article>
    )
}

export default Item