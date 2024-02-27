import { useNavigate } from 'react-router-dom';

function Banner() {
    const navigate = useNavigate ();

    const handleClick = () => {
        navigate('/register');
    };

  return (
    <div className="welcome-menu">
        <h3>Lorem ipsum im lor de prise effect track</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id corrupti consectetur porro eum odit possimus
            dolores quasi. Magnam.</p>
        <div className="container-btn">
            <button className="btn btn-portfolio" onClick={handleClick}>Registrarse
                <i className="bi bi-arrow-right-short arrow"></i>
            </button>
        </div>
    </div>
  )
}

export default Banner;