export function togglePasswordVisibility() {
  var passwordInput = document.getElementById("contraseña");
  var eyeIcon = document.getElementById("eye-icon");

  // Cambiar el tipo de input entre "password" y "text"
  passwordInput.type = (passwordInput.type === "password") ? "text" : "password";

  // Cambiar el ícono del ojo basado en el tipo de contraseña
  eyeIcon.classList.toggle("bi-eye");
  eyeIcon.classList.toggle("bi-eye-slash");
}