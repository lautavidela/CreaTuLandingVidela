import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>Tienda de Ropa</h1>
      </Link>

      <nav>
        <NavLink 
            to="/category/superior" 
            className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}
        >
            Prenda Superior
        </NavLink>
        
        <NavLink 
            to="/category/inferior" 
            className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}
        >
            Prenda Inferior
        </NavLink>
        
        <NavLink 
            to="/category/accesorios" 
            className={({isActive}) => isActive ? 'ActiveOption' : 'Option'}
        >
            Accesorios
        </NavLink>
      </nav>
      
      <Link to="/cart" style={{color: 'white', fontWeight: 'bold'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
            <span>Carrito</span>
            <CartWidget />
        </div>
      </Link>
    </header>
  );
};

export default Header;