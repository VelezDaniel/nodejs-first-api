import './navbar.css';
import { useState } from 'react';

function NavBar() {
    const [scroll, setScroll] = useState(false);

    const changeColorNav = () => {
        if(window.scrollY >= 500) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };

    window.addEventListener('scroll', changeColorNav);

  return (
    <div>
      <nav className={scroll ? 'navbar active' : 'navbar'}>
        <div className="open-menu"><i className="fa fa-bars"></i></div>
        <ul className="main-menu hidden">
            <li><a href="#">Home</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Reservar</a></li>
            <div className="close-menu"><i className="fa fa-times"></i></div>
        </ul>
        <div className="logo h-content">
            <h1>HELARTICO</h1>
        </div>

        <div className="icons h-content">
            <a className="nav-item nav-icon" href=""><i className="bi bi-handbag"></i></a>
            <a className="nav-item nav-icon" href="login"><i className="bi bi-person icon-person"></i></a>
        </div>
        <div id="cover-sidebar" className="cover-sidebar"></div>
    </nav>
    </div>
  )
}

export default NavBar;