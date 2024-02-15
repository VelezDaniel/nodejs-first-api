
// export const fetchDataAndInsertHtml = async (id, url) => {
//   try {
//     const res = await fetch(url);
//     const html = await res.text();

//     const container = document.getElementById(id);
//     if (container) {
//       container.innerHTML = html;

//       // ejecutar scripts
//       executeScripts(container);
//     }
//     // document.getElementById(id).innerHTML = html
//   } catch (error) {
//     console.log(error)
//   }
// }

// function executeScripts(container) {
//   const scripts = container.getElementsByTagName('script');
//   for (let i = 0; i < scripts.length; i++) {
//     const script = document.createElement('script');
//     script.type = scripts[i].type || 'text/javascript';
//     script.text = scripts[i].text || scripts[i].textContent || scripts[i].innerHTML;
//     container.appendChild(script).parentNode.removeChild(script);
//   }
// }

export async function fetchDataAndInsertHtml(id, url) {
  try {
    const response = await fetch(url);
    const data = await response.text();
    
    // Inserta el contenido en el elemento con el id proporcionado
    document.getElementById(id).innerHTML = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}