import { Link } from 'react-router-dom';

const Header = () => {
    return (
    <header>
        <Link to="/">
            <h1>Mi Tienda</h1>
        </Link>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/category/ropa">Ropa</Link>
            <Link to="/category/electronica">Electronica</Link>
        </nav>
    </header>
    )
}

export default Header;