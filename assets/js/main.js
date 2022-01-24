const preloader = (() => {
  const preloaderElement = document.querySelector('.preload');
  const waitAnimation = () => {
    setInterval(() => {
      preloaderElement.classList.add('preload--hide');
    }, 2000)
  }
  return {waitAnimation};
})();

const gameSettings = (() => {
  const gameSettingsElement = document.querySelector('.gameSettings');
  const button = document.querySelector('.btn');

  const showUp = () => {
    setTimeout(() => {
      gameSettingsElement.classList.add('gameSettings--active');
    }, 4200)
  }

  const hide = () => {
    gameSettingsElement.classList.remove('gameSettings--active');
  }

  button.addEventListener("click", hide);
  return {showUp};
})();


preloader.waitAnimation();
gameSettings.showUp();

