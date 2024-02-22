import { useForm } from "react-hook-form";

function RegisterPage() {

  const {register, handleSubmit} = useForm();
  return (
    <div className="contenedor-padre">
      <div className="contenedor_fondo"></div>
      <div className="contenedor-hijo">
        <a className="btn-volver" href="#"><i className="bi bi-arrow-left-short"></i></a>
        <img src="logo-register" alt="" />
        <form className="form-register" onSubmit={handleSubmit(values => {
          console.log(values);
        })}>
          <div className="input-group">
            <label htmlFor="nombres"><i className="bi bi-person"></i></label>
            {/* <input type="text" name="nombres" id="nombres" placeholder="Nombres" /> */}
            <input type="text" {...register("Nombres", {required: true})} />
          </div>
          <div className="input-group">
            <label htmlFor="apellidos"><i className="bi bi-person"></i></label>
            {/* <input type="text" name="apellidos" id="apellidos" placeholder="Apellidos"/> */}
            <input type="text" {...register("Apellidos", {required: true})}/>
          </div>
          <div class="input-group">
              <label for="documento"><i class="bi bi-person-vcard"></i></label>
              {/* <input type="number" name="documento" id="documento" placeholder="Documento"/> */}
              <input type="text" {...register("Documento", {required: true})}/>
            </div>
          <div className="input-group">
              <label for="correo"><i className="bi bi-envelope"></i></label>
              {/* <input type="email" name="correo" id="correo" placeholder="Correo"/> */}
              <input type="text" {...register("Email", {required:true})} />
          </div>
                <div className="input-group">
                    <label for="celular"><i class="bi bi-phone"></i></label>
                    {/* <input type="number" name="celular" id="celular" placeholder="Celular"/> */}
                    <input type="text" {...register("Celular", {required:true})} />
                </div>
                <label for="nacimiento"><i className="bi bi-calendar3"></i> Fecha de Nacimiento</label>
                <input type="date" name="nacimiento" id="nacimiento"/>
                <input className="btn-enviar" type="submit" value="Registrarse"></input>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage