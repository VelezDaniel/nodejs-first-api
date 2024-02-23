const $mainMenu = document.querySelector('.main-menu');
const $closeMenu = document.querySelector('.close-menu');
const $openMenu = document.querySelector('.open-menu');
const $bgSidebar = document.querySelector('#cover-sidebar');
const $hiddenContent = document.querySelector('.h-content');

const $navBar = document.querySelector('nav');

window.addEventListener("scroll", () => {
  $navBar.classList.toggle('sticky', window.scrollY > 680);
})

$openMenu.addEventListener('click', () => {
  $mainMenu.style.display = 'flex';
  $bgSidebar.style.display = "block";
  $hiddenContent.style.pointerEvents = 'none';
  $mainMenu.classList.remove('hidden');
} );

$closeMenu.addEventListener('click', () => {
  $mainMenu.classList.toggle('hidden');
  $bgSidebar.style.display = "none";
  $hiddenContent.style.pointerEvents = 'all';
})
