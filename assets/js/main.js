const preloader = (() => {
  const preloaderElement = document.querySelector(".preload");
  const waitAnimation = () => {
    setInterval(() => {
      preloaderElement.classList.add("preload--hide");
    }, 2000);
  };
  return { waitAnimation };
})();

const Player = (sign, name, type) => {
  let _sign = sign;
  let _name = name;
  let _type = type;

  const getName = () => {
    return _name;
  };
  const getType = () => {
    return _type;
  };
  const getSign = () => {
    return _sign;
  };

  return { getName, getType, getSign };
};

const gameSettings = (() => {
  //Elements
  const gameSettingsElement = document.querySelector(".gameSettings");
  const button = document.querySelector(".btn");
  const playersId = document.querySelectorAll('[aria-data="person"]');
  const playerInputs = document.querySelectorAll(".player__name");

  let players = [];
  let validated;

  //Functions
  const showUp = () => {
    setTimeout(() => {
      gameSettingsElement.classList.add("gameSettings--active");
    }, 4200);
  };

  const hide = () => {
    gameSettingsElement.classList.remove("gameSettings--active");
  };

  const changeType = (player) => {
    const playerCurrentInput = player.target.nextElementSibling;

    if (playerCurrentInput.classList.contains("player__name--cpu")) {
      player.target.src = "assets/images/person.svg";
      player.target.setAttribute("aria-data", "person");
      playerCurrentInput.classList.remove("player__name--cpu");
      playerCurrentInput.placeholder = "Insert Name";
      playerCurrentInput.value = "";
    } else {
      player.target.setAttribute("aria-data", "cpu");
      player.target.src = "assets/images/cpu.svg";
      playerCurrentInput.classList.add("player__name--cpu");
      playerCurrentInput.placeholder = "CPU";
      playerCurrentInput.value = "CPU";
    }
  };

  const getValidated = () => {
    return validated;
  };

  const setValidated = (booleanValue) => {
    validated = booleanValue;
  };

  const validateInput = () => {
    if (playerInputs[0].value == "" || playerInputs[1].value == "") {
      setValidated(false);
    } else {
      setValidated(true);
    }

    return getValidated();
  };

  const setPlayer = (name, type) => {
    let newPlayer = Player(name, type);
    players.push(newPlayer);
  };

  const getPlayer = () => {
    return players;
  };

  const submit = () => {
    if (validateInput()) {
      setPlayer(
        "X",
        playerInputs[0].value,
        playersId[0].getAttribute("aria-data")
      );
      setPlayer(
        "O",
        playerInputs[1].value,
        playersId[1].getAttribute("aria-data")
      );
      hide();
    } else {
      alert("Name can't be empty");
      return;
    }
  };

  //Events
  button.addEventListener("click", submit);
  playersId.forEach((player) => {
    player.addEventListener("click", changeType);
  });

  return { showUp, button, getPlayer, getValidated };
})();

const gameController = (() => {
  const mainBoard = document.querySelector(".gameContainer__grid");
  const settings = gameSettings;
  const gridArray = new Array(9).fill("");
  const winMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 2],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let playerOne = "";
  let playerTwo = "";
  let actualPlayer = "";

  const start = () => {
    [playerOne, playerTwo] = settings.getPlayer();
    actualPlayer = playerOne;
  };

  const showUp = () => {
    mainBoard.parentElement.classList.add("gameContainer--active");
  };

  const getCurrentPlayerTurn = () => {
    return actualPlayer.getSign();
  };

  const setActualPlayerTurn = (playerSign) => {
    playerSign == "X" ? (actualPlayer = playerOne) : (actualPlayer = playerTwo);
  };

  const moveToArray = (box) => {
    let index = Array.from(box.parentNode.children).indexOf(box);
    gridArray[index] = box.innerHTML;
  };

  const setSign = (e) => {
    if (e.target.innerHTML !== "") return;
    e.target.innerHTML = getCurrentPlayerTurn();
    moveToArray(e.target);
    getCurrentPlayerTurn() == "X" ? setActualPlayerTurn("O") : setActualPlayerTurn("X");
  };

  mainBoard.addEventListener("click", setSign);

  return { showUp, start };
})();

const preload = preloader;
const container = document.querySelector(".gameContainer");
const settings = gameSettings;
const controller = gameController;
const submitButton = settings.button;

preload.waitAnimation();
settings.showUp();

submitButton.addEventListener("click", () => {
  if (settings.getValidated()) {
    controller.showUp();
    controller.start();
  }
});
