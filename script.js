const Gameboard = (function () {
  const gameboardFields = [];

  function restartGameboard() {
    gameboardFields.length = 0;
  }

  function setGameboardFields() {
    for (let i = 0; i < 9; i++) {
      gameboardFields.push("");
    }
  }

  function getGameboardFields() {
    return gameboardFields;
  }

  function getPlayerTurn() {
    //count who has more X or O on the field and return the player with the less count
    let countX = 0;
    let countO = 0;
    let winner = "";

    if (!gameboardFields.includes("")) {
      return "DRAW";
    }

    //
    for (let i = 0; i < 9; i++) {
      if (gameboardFields[i] === "X") {
        countX += 1;
      } else if (gameboardFields[i] === "O") {
        countO += 1;
      }
    }

    if (countX === countO) {
      return "X";
    } else {
      return "O";
    }
  }
  function checkForWinner() {
    // check for a winner horizontally
    if (gameboardFields[0] !== "") {
      if (
        gameboardFields[0] === gameboardFields[1] &&
        gameboardFields[1] === gameboardFields[2]
      ) {
        return gameboardFields[0];
      }
    }
    if (gameboardFields[3] !== "") {
      if (
        gameboardFields[3] === gameboardFields[4] &&
        gameboardFields[4] === gameboardFields[5]
      ) {
        return gameboardFields[3];
      }
    }
    if (gameboardFields[6] !== "") {
      if (
        gameboardFields[6] === gameboardFields[7] &&
        gameboardFields[7] === gameboardFields[8]
      ) {
        return gameboardFields[6];
      }
    }

    // check for a winner vertically
    if (gameboardFields[0] !== "") {
      if (
        gameboardFields[0] === gameboardFields[3] &&
        gameboardFields[3] === gameboardFields[6]
      ) {
        return gameboardFields[0];
      }
    }
    if (gameboardFields[1] !== "") {
      if (
        gameboardFields[1] === gameboardFields[4] &&
        gameboardFields[4] === gameboardFields[7]
      ) {
        return gameboardFields[1];
      }
    }
    if (gameboardFields[2] !== "") {
      if (
        gameboardFields[2] === gameboardFields[5] &&
        gameboardFields[5] === gameboardFields[8]
      ) {
        return gameboardFields[2];
      }
    }
    // check for a winner diagonally

    if (gameboardFields[0] !== "") {
      if (
        gameboardFields[0] === gameboardFields[4] &&
        gameboardFields[4] === gameboardFields[8]
      ) {
        return gameboardFields[0];
      }
    }
    if (gameboardFields[2] !== "") {
      if (
        gameboardFields[2] === gameboardFields[4] &&
        gameboardFields[4] === gameboardFields[6]
      ) {
        return gameboardFields[2];
      }
    }
    return false;
  }

  return {
    setGameboardFields,
    getGameboardFields,
    getPlayerTurn,
    checkForWinner,
    restartGameboard,
  };
})();

const playerFactory = function (mark) {
  let _playerMark = mark;

  function getPlayerMark() {
    return _playerMark;
  }

  return { getPlayerMark };
};

const displayController = (function () {
  function renderGameBoard() {
    const boardGrid = document.querySelectorAll(".board-single-field");

    boardGrid.forEach((field) => {
      let index = Number(field.getAttribute("data-index"));
      field.textContent = Gameboard.getGameboardFields()[index];
    });
  }

  function renderPlayerMsg(message) {
    const msg = document.querySelector(".player-message");
    msg.textContent = message;
  }

  return { renderGameBoard, renderPlayerMsg };
})();

const Game = (function () {
  let playerX = playerFactory("X");
  let playerO = playerFactory("O");

  const clickEvent = function () {
    const fields = document.querySelectorAll(".board-single-field");
    const restart = document.querySelector(".restart");

    restart.addEventListener("click", () => {
      Gameboard.restartGameboard();
      Gameboard.setGameboardFields();
      displayController.renderGameBoard();
      displayController.renderPlayerMsg("Player X's turn");
    });

    fields.forEach((field) => {
      field.addEventListener("click", () => {
        if (Gameboard.checkForWinner()) {
          return;
        }
        let index = Number(field.getAttribute("data-index"));

        if (Gameboard.getGameboardFields()[index] === "") {
          Gameboard.getGameboardFields()[index] = Gameboard.getPlayerTurn();

          if (Gameboard.checkForWinner() === "X") {
            displayController.renderPlayerMsg("Player X has won!");
          } else if (Gameboard.checkForWinner() === "O") {
            displayController.renderPlayerMsg("Player O has won!");
          } else if (Gameboard.getPlayerTurn() === "O") {
            displayController.renderPlayerMsg("Player O's turn");
          } else if (Gameboard.getPlayerTurn() === "X") {
            displayController.renderPlayerMsg("Player X's turn");
          } else if (Gameboard.getPlayerTurn() === "DRAW") {
            displayController.renderPlayerMsg("It's a draw!");
          }
          displayController.renderGameBoard();
        }
      });
    });
  };

  const init = function () {
    Gameboard.setGameboardFields();
    displayController.renderGameBoard();
    clickEvent();
  };

  return { init };
})();

Game.init();
