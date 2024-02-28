import { useForm } from "react-hook-form";
import { useState } from "react";
import "./register.css";
import logoImg from "../../assets/imgs/helarticologo2.png";
import { registerRequest, createPassword } from "../../api/auth";
// import CreatePassword from "./CreatePassword";

function RegisterPage() {
	const { register, handleSubmit } = useForm();
	let insertId;

	// PASSWORD LOGIC
	// console.log("userId: ",userId);
	const [password, setPassword] = useState("");
	const [userId, setUserId] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const handleUserIdChange = (e) => {
		setUserId(e.target.value);
	};

	const handleSubmitPass = async (values) => {
		// e.preventDefault();

		try {
			console.log("Password:", password);
			console.log("Confirm Password:", confirmPassword);

			if (password !== confirmPassword) {
				setPasswordError("Contraseñas no coinciden");
				return;
			}

			const userInfo = {
				user: userId,
				password: password,
				confirmPassword: confirmPassword,
			};

			console.log("UserInfo:", userInfo);

			const result = await createPassword(userInfo);

			console.log("Response of createPassword:", result);
			console.log("Response data of createPassword:", result.data);
			console.log("Insert Id from createPassword:", result.insertId);

			console.log(
				`Insert Id (proviene de register form): ${insertId}, / UserInfo post query = ${userInfo}`
			);
		} catch (error) {
			console.log(error);
		}
	};

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
						try {
							// console.log(`values: ${values}`);
							const res = await registerRequest(values);
							console.log(`response of registerRequest: ${res}`);
							insertId = res;
							console.log(`Insert Id (register form): ${insertId}`);
						} catch (error) {
							console.log("Error durante el registro:", error);
						}
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
							value={userId}
							onChange={handleUserIdChange}
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
			{/* <CreatePassword insertId={insertId} /> */}
			<div className="contenedor-hijo create-password">
				<a className="btn-volver" href="/">
					<i className="bi bi-arrow-left-short"></i>
				</a>
				<img className="logo-register" src={logoImg} alt="logo helartico" />
				<form className="form-register" onSubmit={handleSubmitPass}>
					{/* <div className="input-group">
						<label htmlFor="userId">
							<i className="bi bi-lock"></i>
						</label>
						<input
							type="number"
							value={userId}
							onChange={handlePasswordChange}
							placeholder="user"
							id="password"
						/>
						{passwordError && <p>{passwordError}</p>}
					</div> */}
					<div className="input-group">
						<label htmlFor="password">
							<i className="bi bi-lock"></i>
						</label>
						<input
							type="password"
							value={password}
							onChange={handlePasswordChange}
							placeholder="Contraseña"
							id="password"
						/>
						{passwordError && <p>{passwordError}</p>}
					</div>
					<div className="input-group">
						<label htmlFor="confirmPassword">
							<i className="bi bi-lock"></i>
						</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={handleConfirmPasswordChange}
							placeholder="Confirmar contraseña"
							id="confirmPassword"
						/>
					</div>
					<input className="btn-enviar" type="submit" value="Confirmar"></input>
				</form>
			</div>
		</div>
	);
}

export default RegisterPage;
