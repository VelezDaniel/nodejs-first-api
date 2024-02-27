import { useForm } from "react-hook-form";
import "./register.css";
import logoImg from "../../assets/imgs/helarticologo2.png";
import { registerRequest, createPassword } from "../../api/auth";

function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

  const pass = watch('password');
	return (
		<div className="contenedor-padre">
			<div className="contenedor_fondo"></div>
			<div className="contenedor-hijo">
				<a className="btn-volver" href="/">
					<i className="bi bi-arrow-left-short"></i>
				</a>
				<img className="logo-register" src={logoImg} alt="" />
				<form
					className="form-register"
					onSubmit={handleSubmit(async (values) => {
						console.log(values);
						// const userInfo = {...values};
						// userInfo.id = 0;
						const res = await registerRequest(values);
						console.log(res);
					})}
				>
					<div className="input-group">
						<label htmlFor="name">
							<i className="bi bi-person"></i>
						</label>
						{/* <input type="text" name="nombres" id="nombres" placeholder="Nombres" /> */}
						<input
							type="text"
							{...register("name", { required: true })}
							placeholder="Nombres"
							id="nombres"
						/>
					</div>
					<div className="input-group">
						<label htmlFor="lastName">
							<i className="bi bi-person"></i>
						</label>
						{/* <input type="text" name="apellidos" id="apellidos" placeholder="Apellidos"/> */}
						<input
							type="text"
							{...register("lastName", { required: true })}
							placeholder="Apellidos"
							id="apellidos"
						/>
					</div>
					<div className="input-group">
						<label htmlFor="identity">
							<i className="bi bi-person-vcard"></i>
						</label>
						{/* <input type="number" name="documento" id="documento" placeholder="Documento"/> */}
						<input
							type="text"
							{...register("identity", { required: true })}
							placeholder="Documento"
							id="documento"
						/>
					</div>
					<div className="input-group">
						<label htmlFor="email">
							<i className="bi bi-envelope"></i>
						</label>
						{/* <input type="email" name="correo" id="correo" placeholder="Correo"/> */}
						<input
							type="text"
							{...register("email", { required: true })}
							placeholder="correo"
							id="correo"
						/>
					</div>
					<div className="input-group">
						<label htmlFor="phone">
							<i className="bi bi-phone"></i>
						</label>
						{/* <input type="number" name="celular" id="celular" placeholder="Celular"/> */}
						<input
							type="text"
							{...register("phone", { required: true })}
							placeholder="Celular"
							id="celular"
						/>
					</div>
					<label htmlFor="birth">
						<i className="bi bi-calendar3"></i> Fecha de Nacimiento
					</label>
					{/* <input type="date" name="nacimiento" id="nacimiento"/> */}
					<input
						type="date"
						{...register("birth", { required: true })}
						id="nacimiento"
					/>
					<input
						className="btn-enviar"
						type="submit"
						value="Registrarse"
					></input>
				</form>
			</div>
			{/* Password Form */}
			<div className="contenedor-hijo create-password">
				<a className="btn-volver" href="/">
					<i className="bi bi-arrow-left-short"></i>
				</a>
				<img className="logo-register" src={logoImg} alt="logo helartico" />
				<form
					className="form-register"
					onSubmit={handleSubmit(async (values) => {
						console.log(values);

						// const userInfo = {...values};
						// ! ORGANIZAR ESTO userInfo.id = 0;
						const res = await createPassword(values);
						console.log(res);
					})}
				>
					<div className="input-group">
						<label htmlFor="password">
							<i className="bi bi-lock"></i>
						</label>
						{/* <input type="text" name="nombres" id="nombres" placeholder="Nombres" /> */}
						<input
							type="password"
							{...register("password", { required: true })}
							placeholder="Contraseña"
							id="password"
						/>
            {errors.password && <p>{errors.password.message}</p>}
					</div>
					<div className="input-group">
						<label htmlFor="confirmPassword">
							<i className="bi bi-lock"></i>
						</label>
						{/* <input type="text" name="apellidos" id="apellidos" placeholder="Apellidos"/> */}
						<input
							type="password"
							{...register("confirmPassword", { required: true, validate: (value) => value === pass || 'Contraseñas no coinciden', })}
							placeholder="Confirmar contraseña"
							id="confirmPassword"
						/>
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
					</div>
					<input
						className="btn-enviar"
						type="submit"
						value="Confirmar"
					></input>
				</form>
			</div>
		</div>
	);
}

export default RegisterPage;
