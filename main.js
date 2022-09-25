let selectbox = document.querySelector(".selectbox");
let selectXbtn = document.querySelector(".selectXbtn");
let selectObtn = document.querySelector(".selectObtn");
let play = document.querySelector(".play-bord");
let players = document.querySelector(".players");
let allbox = document.querySelectorAll("section span");
let winner = document.querySelector(".winner");
let winh = document.querySelector(".winner h2");
let replay = document.querySelector(".replay");
let user = document.querySelector(".user");
let scores = {
  X: 1,
  O: -1,
  tie: 0,
};
window.onload = () => {
  replay.onclick = () => {
    for (let i = 0; i < allbox.length; i++) {
      allbox[i].innerHTML = "";
      allbox[i].style.pointerEvents = "all";
      allbox[i].removeAttribute("id");
    }
    selectbox.classList.toggle("hide");
    winner.classList.toggle("show");
    winner.classList.toggle("hide");
    play.classList.toggle("hide");
    can = true;
  };
  selectXbtn.onclick = () => {
    selectbox.classList.add("hide");
    play.classList.add("show");
    scores.O = 1;
    scores.X = -1;
    user.innerHTML = "User : X";
  };
  selectObtn.onclick = () => {
    scores.X = 1;
    scores.O = -1;
    user.innerHTML = "User : O";

    selectbox.classList.add("hide");
    play.classList.add("show");
    players.setAttribute("class", "players active player");
  };

  for (let i = 0; i < allbox.length; i++) {
    allbox[i].setAttribute("onclick", "check(this)");
  }
};
let xIcon = "icon-close";
let oIcon = "icon-radio-unchecked";
let can = true;
function check(element) {
  if (can) {
    if (players.classList.contains("player")) {
      element.innerHTML = `<i class="${oIcon}"></i>`;
      players.classList.remove("active");
      element.setAttribute("id", "O");
    } else {
      element.innerHTML = `<i class="${xIcon}"></i>`;
      players.classList.add("active");
      element.setAttribute("id", "X");
    }
    element.style.pointerEvents = "none";
    can = false;
  }

  let id = checkWinner();

  if (id === "X" || id === "O") {
    play.classList.remove("show");
    play.classList.add("hide");
    winner.classList.add("show");
    winh.innerHTML = `Player ${id} won the game!`;
  } else if (id === "tie") {
    play.classList.remove("show");
    play.classList.add("hide");
    winner.classList.add("show");
    winh.innerHTML = `No one won the game!`;
  }
  setTimeout(() => {
    bestmove();
    can = true;
    let id = checkWinner();
    if (id === "X" || id === "O") {
      play.classList.remove("show");
      play.classList.add("hide");
      winner.classList.add("show");
      winh.innerHTML = `Player ${id} won the game!`;
    } else if (id === "tie") {
      play.classList.remove("show");
      play.classList.add("hide");
      winner.classList.add("show");
      winh.innerHTML = `No one won the game!`;
    }
    allbox.forEach((e) => console.log(e));
  }, 10);
}

let cnt2 = 0;
let board = [];
let row = [];
for (let i = 0; i < allbox.length; i++) {
  if (cnt2 < 3) {
    row.push(allbox[i]);
    cnt2++;
  } else {
    board.push(row);
    row = [];
    row.push(allbox[i]);
    cnt2 = 1;
  }
  if (i === allbox.length - 1) board.push(row);
}

function bestmove() {
  let bestScore = -Infinity;
  let move;
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      if (board[i][j].id === "") {
        if (players.classList.contains("player")) {
          board[i][j].innerHTML = `<i class="${xIcon}"></i>`;
          board[i][j].setAttribute("id", "X");
        } else {
          board[i][j].innerHTML = `<i class="${oIcon}"></i>`;
          board[i][j].setAttribute("id", "O");
        }
        let score = minimax(board, 0, false);
        board[i][j].innerHTML = "";
        board[i][j].id = "";
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  if (players.classList.contains("player")) {
    board[move.i][move.j].innerHTML = `<i class="${xIcon}"></i>`;
    players.classList.add("active");
    board[move.i][move.j].setAttribute("id", "X");
    board[move.i][move.j].style.pointerEvents = "none";
  } else {
    board[move.i][move.j].innerHTML = `<i class="${oIcon}"></i>`;
    players.classList.remove("active");
    board[move.i][move.j].setAttribute("id", "O");
    board[move.i][move.j].style.pointerEvents = "none";
  }
}

function minimax(board, depth, isMax) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }
  if (isMax) {
    let bestScore = -Infinity;
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        if (board[i][j].id === "") {
          if (players.classList.contains("player")) {
            board[i][j].innerHTML = `<i class="${xIcon}"></i>`;
            board[i][j].setAttribute("id", "X");
          } else {
            board[i][j].innerHTML = `<i class="${oIcon}"></i>`;
            board[i][j].setAttribute("id", "O");
          }
          let score = minimax(board, depth + 1, false);
          board[i][j].innerHTML = "";
          board[i][j].id = "";
          bestScore = Math.max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        if (board[i][j].id === "") {
          if (players.classList.contains("player")) {
            board[i][j].innerHTML = `<i class="${oIcon}"></i>`;
            board[i][j].setAttribute("id", "O");
          } else {
            board[i][j].innerHTML = `<i class="${xIcon}"></i>`;
            board[i][j].setAttribute("id", "X");
          }
          let score = minimax(board, depth + 1, true);
          board[i][j].innerHTML = "";
          board[i][j].id = "";
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
function equals3(a, b, c) {
  return a === b && b === c && a !== "";
}
function checkWinner() {
  let winner = null;
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0].id, board[i][1].id, board[i][2].id))
      winner = board[i][0].id;
  }
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i].id, board[1][i].id, board[2][i].id))
      winner = board[0][i].id;
  }
  if (equals3(board[0][0].id, board[1][1].id, board[2][2].id))
    winner = board[0][0].id;

  if (equals3(board[2][0].id, board[1][1].id, board[0][2].id))
    winner = board[2][0].id;

  let open = 0;
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      if (board[i][j].id === "") {
        open++;
      }
    }
  }
  if (winner === null && open === 0) {
    return "tie";
  } else {
    return winner;
  }
}
