import './header.css';
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <Link className='logo' to="/">PrimeFlix</Link>
      <nav>
        <Link className='home' to="/">Home</Link>
        <Link className='favoritos' to="/favoritos">Meus Filmes</Link>
      </nav>
    </header>
  );
}

export default Header;
