import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>Mi Tienda</h1>
      </Link>

      <nav>

        <NavLink to="/category/ropa" className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Ropa</NavLink>
        <NavLink to="/category/electronica" className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Electronica</NavLink>
        <NavLink to="/category/calzado" className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}>Calzado</NavLink>
      </nav>
      

      <Link to="/cart" style={{color: 'white', fontWeight: 'bold'}}>🛒 Carrito</Link>
    </header>
  );
};

export default Header;