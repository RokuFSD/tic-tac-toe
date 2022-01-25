const preloader = (() => {
  const preloaderElement = document.querySelector('.preload');
  const waitAnimation = () => {
    setInterval(() => {
      preloaderElement.classList.add('preload--hide');
    }, 2000)
  }
  return {waitAnimation};
})();

const Player = (name, type) => {
  let _name = name;
  let _type = type;

  const getName = () => {
    return _name; 
  }
  const getType = () => {
    return _type;
  }

  const changeType = (type) => {
    _type = type;
  }

  return {getName, getType, changeType};

}


const gameSettings = (() => {

  //Elements
  const gameSettingsElement = document.querySelector('.gameSettings');
  const button = document.querySelector('.btn');
  const playersId = document.querySelectorAll('.playerCard__img');
  const playerInputs = document.querySelectorAll('.player__name');

  //Functions
  const showUp = () => {
    setTimeout(() => {
      gameSettingsElement.classList.add('gameSettings--active');
    }, 4200)
  }

  const hide = () => {
    gameSettingsElement.classList.remove('gameSettings--active');
  }

  const changeType = (player) => {
    const playerCurrentInput = player.target.nextElementSibling;

    if(playerCurrentInput.classList.contains('player__name--cpu')){
      player.target.src = 'assets/images/person.svg';
      playerCurrentInput.classList.remove('player__name--cpu');
      playerCurrentInput.placeholder = "Insert Name"
      playerCurrentInput.value = "";
    } else {
      player.target.src = 'assets/images/cpu.svg';
      playerCurrentInput.classList.add('player__name--cpu');
      playerCurrentInput.placeholder = "CPU";
      playerCurrentInput.value = "CPU";
    }
  }

  const validateInput = () => {
  }

  const submit = () => {
  }

  //Events
  button.addEventListener("click", hide);
  playersId.forEach(player => {
    player.addEventListener("click", changeType);
  })

  return {showUp};
})();



preloader.waitAnimation();
gameSettings.showUp();


