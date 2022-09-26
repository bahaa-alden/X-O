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
let mode = document.querySelector(".mode");
let pp = document.querySelector(".pvp");
let pb = document.querySelector(".pvb");
let pvb = false;
let scores = {
  X: 1,
  O: -1,
  tie: 0,
};
let xIcon = "icon-close";
let oIcon = "icon-radio-unchecked";
let can = true;
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
window.onload = () => {
  replay.onclick = () => {
    for (let i = 0; i < allbox.length; i++) {
      allbox[i].innerHTML = "";
      allbox[i].style.pointerEvents = "all";
      allbox[i].removeAttribute("id");
    }
    mode.classList.toggle("hide");
    winner.classList.toggle("show");
    winner.classList.toggle("hide");
    play.classList.toggle("hide");
    can = true;
    pvb = false;
    players.classList.remove("player");
    players.classList.remove("active");
  };
  pp.onclick = function () {
    selectbox.classList.toggle("hide");
    mode.classList.toggle("hide");
    for (let i = 0; i < allbox.length; i++) {
      allbox[i].setAttribute("onclick", "checkpp(this)");
    }
  };
  pb.onclick = function () {
    selectbox.classList.toggle("hide");
    mode.classList.toggle("hide");
    pvb = true;
    for (let i = 0; i < allbox.length; i++) {
      allbox[i].setAttribute("onclick", "check(this)");
    }
  };
  selectXbtn.onclick = function () {
    // can = true;
    selectbox.classList.toggle("hide");
    play.classList.add("show");
    if (pvb) {
      scores.O = 1; // in pvb mode to let ai be O
      scores.X = -1;
      user.innerHTML = "User : X";
    }
  };
  selectObtn.onclick = function () {
    user.innerHTML = "User : O";
    if (!pvb) {
      can = false; //to let the O go first
    } else {
      scores.X = 1; // in pvb mode to let ai be X
      scores.O = -1;
    }
    selectbox.classList.add("hide");
    play.classList.add("show");
    players.setAttribute("class", "players active player");
    // go();
  };
};

// function go() {
//   bestmove();
//   can = true;
// }

//for P v P
function checkpp(element) {
  if (can) {
    //to add X
    element.innerHTML = `<i class="${xIcon}"></i>`;
    players.classList.add("active");
    element.setAttribute("id", "X");
    can = false;
  } //to add O
  else {
    element.innerHTML = `<i class="${oIcon}"></i>`;
    players.classList.remove("active");
    element.setAttribute("id", "O");
    can = true;
  }
  let id = checkWinner(); //to know if there is a winner

  if (id === "X" || id === "O") {
    //there is a winner
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
}

//For PvB
function check(element) {
  if (can) {
    if (players.classList.contains("player")) {
      //if human select O
      element.innerHTML = `<i class="${oIcon}"></i>`;
      players.classList.remove("active");
      element.setAttribute("id", "O");
    } else {
      //if human select X
      element.innerHTML = `<i class="${xIcon}"></i>`;
      players.classList.add("active"); //to move the blue slider
      element.setAttribute("id", "X"); //set the chosen sign to use it in check fun
    }
    element.style.pointerEvents = "none"; //hide from clicking
    can = false;
  }

  let id = checkWinner(); //to know if there is a winner

  if (id === "X" || id === "O") {
    //there is a winner
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
  // if mode player vs mode
  if (pvb) {
    setTimeout(() => {
      bestmove();
      can = true;
      let id = checkWinner();
      if (id === "X" || id === "O") {
        //there is a winner
        play.classList.remove("show");
        play.classList.add("hide"); //hide winner view
        winner.classList.add("show"); //show winner view
        winh.innerHTML = `Player ${id} won the game!`; //show winner view
      } else if (id === "tie") {
        //draw
        play.classList.remove("show");
        play.classList.add("hide");
        winner.classList.add("show");
        winh.innerHTML = `No one won the game!`;
      }
    }, 10);
  }
}
// minimax algorithm for bot move
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
        //call the minimax s
        let score = minimax(board, 0, false);
        board[i][j].innerHTML = ""; //after minmax call to remove changes
        board[i][j].id = ""; //after minmax call to remove changes
        if (score > bestScore) {
          bestScore = score; //get the best status
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
    //bot turn
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
    //human turn
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
//For checking if there is a winner
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
