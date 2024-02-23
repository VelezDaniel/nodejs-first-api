import { useForm } from "react-hook-form";
import  logoImg from '../../assets/imgs/helarticologo2.png';
import './login.css'
import { togglePasswordVisibility } from "./login";
// import '../styles/register.css';

function LoginPage() {
  const {register, handleSubmit} = useForm();
  return (
    <div>
      <div className="contenedor-padre">
      <div className="contenedor_fondo"></div>
      <div className="contenedor-hijo">
        <a className="btn-volver" href="#"><i className="bi bi-arrow-left-short"></i></a>
        <img className="logo-register" src={logoImg} alt="" />
        <form className="form-register" onSubmit={handleSubmit(values => {
          console.log(values);
        })}>
          <div className="input-group">
            <label htmlFor="nombres"><i className="bi bi-person"></i></label>
            {/* <input type="text" name="nombres" id="nombres" placeholder="Nombres" /> */}
            <input type="text" {...register("Usuario", {required: true})} placeholder="Usuario" id="usuario" />
          </div>
          <div className="input-group">
            <label htmlFor="contraseña"><i className="bi bi-lock"></i></label>
            {/* <input type="text" name="apellidos" id="apellidos" placeholder="Apellidos"/> */}
            <input type="password" {...register("contraseña", {required: true})} placeholder="Contraseña" id="contraseña"/>
            <i class="bi bi-eye" id="eye-icon" onClick={togglePasswordVisibility}></i>
          </div>
          <input className="btn-Ingresar" type="submit" value="Ingresar"/>
          <input className="btn-Registrarse" type="submit" value="Registrarse"/>
          <input className="btn-Olvido" type="submit" value="¿Olvidaste tu contraseña?"/>
        </form>
      </div>
    </div>
    </div>
  )
}

export default LoginPage