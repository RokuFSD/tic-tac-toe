const gameBoard = (() => {
  const gameBoard = new Array(9);
  const setField = (position) => {
    gameBoard[position] = player.getSign();
  }
  const getField = () => {
  }
  const checkEmpty = () => {
  }

  return {
    setField,
    getField,
    checkEmpty
  };
})();

const displayController = (() => {
})();

const displaySettings = (() => {
})();

const player = (symbol) => {
  const getSign = () => {
  }

  const setSign = (character) => {
  }

  return {
    getSign,
    setSign
  };
}
