import { useState } from "react";
import "./register.css";
import logoImg from "../../assets/imgs/helarticologo2.png";
import { createPassword } from "../../api/auth";

function CreatePassword({ insertId }) {
  const userId = insertId;
  console.log("userId: ",userId);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleConfirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const handleSubmitPass = async (e) => {
		e.preventDefault();

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

			const res = await createPassword(userInfo);

			console.log("Response of createPassword:", res);
			console.log("Response data of createPassword:", res.data);
			console.log("Insert Id from createPassword:", res.insertId);

			console.log(
				`Insert Id (proviene de register form): ${insertId}, / UserInfo post query = ${userInfo}`
			);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="contenedor-hijo create-password">
			<a className="btn-volver" href="/">
				<i className="bi bi-arrow-left-short"></i>
			</a>
			<img className="logo-register" src={logoImg} alt="logo helartico" />
			<form className="form-register" onSubmit={handleSubmitPass}>
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
	);
}

export default CreatePassword;
