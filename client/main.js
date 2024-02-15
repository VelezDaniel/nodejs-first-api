import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// import {setupFooterInteractions} from './public/js/footer.js';
// setupFooterInteractions();
// Cargar header.html y footer.html dinámicamente
const loadHtmlFile = async (filePath) => {
  const response = await fetch(filePath);
  return response.text();
};

// Insertar HTML en el elemento con el id "app"
const insertHtml = async (filePath) => {
  const htmlContent = await loadHtmlFile(filePath);
  document.getElementById('app').innerHTML = htmlContent;
};

// Cargar header.html y footer.html al cargar la página
window.onload = async () => {
  // await insertHtml('/views/components/header.html');
  await insertHtml('/views/components/footer.html');
};