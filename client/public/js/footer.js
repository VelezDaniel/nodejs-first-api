
export const setupFooterInteractions =() => {

  function onDOMContentLoaded() {
    const $container = document.getElementById('container');
    // const $container = document.getElementById('footer');
    const $btn = document.getElementById('btn-test');

    if ($container) {
      $container.addEventListener('click', () => {
        console.log('TOCATE EL FOOTER')
        alert('Hola, tocaste el footer');
      })
      $btn.addEventListener('click', ()=> {
        console.log('tocate el boton ')
      })
    }
  }
  document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
}

// const $container = document.getElementById('container');
// // const $container = document.getElementById('footer');
// const $btn = document.getElementById('btn-test');

// if ($container) {
//   $container.addEventListener('click', () => {
//     console.log('TOCATE EL FOOTER')
//     alert('Hola, tocaste el footer');
//   })
//   $btn.addEventListener('click', () => {
//     console.log('tocate el boton ')
//   })
// }



// export default setupFooterInteractions;
