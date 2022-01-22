function waitAnimation(){
  const preloader = document.querySelector('.preload');
  setInterval(() => {preloader.classList.add('preload--hide')},2000);
}
window.addEventListener('load', waitAnimation);

