import './navbar.css';

function NavBar() {
  return (

    <div>
      <nav>
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
            <a className="nav-item nav-icon" href=""><i className="bi bi-person icon-person"></i></a>
        </div>
        <div id="cover-sidebar" className="cover-sidebar"></div>
    </nav>

    <div className="welcome-menu">
        <h3>Lorem ipsum im lor de prise effect track</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id corrupti consectetur porro eum odit possimus
            dolores quasi. Magnam.</p>
        <div className="container-btn">
            <button className="btn btn-portfolio">Registrarse
                <i className="bi bi-arrow-right-short arrow"></i>
            </button>
        </div>
    </div>
    </div>
  )
}

export default NavBar;