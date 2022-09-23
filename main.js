let selectbox = document.querySelector(".selectbox");
let selectXbtn = document.querySelector(".selectXbtn");
let selectObtn = document.querySelector(".selectObtn");
let play = document.querySelector(".play-bord");
let players = document.querySelector(".players");
let allbox = document.querySelectorAll("section span");
let winner = document.querySelector(".winner");
let winh = document.querySelector(".winner h2");
let replay = document.querySelector(".replay");
let cnt = 0;
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
    cnt = 0;
  };
  selectXbtn.onclick = () => {
    selectbox.classList.add("hide");
    play.classList.add("show");
  };
  selectObtn.onclick = () => {
    selectbox.classList.add("hide");
    play.classList.add("show");
    players.setAttribute("class", "players active player");
  };

  for (let i = 0; i < allbox.length; i++) {
    allbox[i].setAttribute("onclick", "check(this)");
  }
};
let xIcon = "fas fa-times";
let oIcon = "far fa-circle";
function check(element) {
  if (players.classList.contains("player")) {
    element.innerHTML = `<i class="${oIcon}"></i>`;
    players.classList.remove("active");
    element.setAttribute("id", "O");
  } else {
    element.innerHTML = `<i class="${xIcon}"></i>`;
    players.classList.add("active");
    element.setAttribute("id", "X");
  }
  cnt++;
  element.style.pointerEvents = "none";
  let rand = (Math.random() * 1000 + 200).toFixed();
  let id = win();
  if (id) {
    play.classList.remove("show");
    play.classList.add("hide");
    winner.classList.add("show");
    winh.innerHTML = `Player ${id} won the game!`;
  } else if (cnt === 9) {
    play.classList.remove("show");
    play.classList.add("hide");
    winner.classList.add("show");
    winh.innerHTML = `No one won the game!`;
  }
  setTimeout(() => {
    bot();
    cnt++;
    let id = win();
    if (id) {
      play.classList.remove("show");
      play.classList.add("hide");
      winner.classList.add("show");
      winh.innerHTML = `Player ${id} won the game!`;
    } else if (cnt === 9) {
      play.classList.remove("show");
      play.classList.add("hide");
      winner.classList.add("show");
      winh.innerHTML = `No one won the game!`;
    }
  }, rand);
}
function bot() {
  let arr = [];
  for (let i = 0; i < allbox.length; i++) {
    if (!allbox[i].hasAttribute("id")) {
      arr.push(i);
    }
  }
  if (arr.length > 0) {
    let ran = arr[Math.floor(Math.random() * arr.length)];
    if (players.classList.contains("player")) {
      allbox[ran].innerHTML = `<i class="${xIcon}"></i>`;
      players.classList.add("active");
      allbox[ran].setAttribute("id", "X");
    } else {
      allbox[ran].innerHTML = `<i class="${oIcon}"></i>`;
      players.classList.remove("active");
      allbox[ran].setAttribute("id", "O");
    }
    allbox[ran].style.pointerEvents = "none";
  }
}
function win() {
  let s1 = document.querySelectorAll(".one span");
  let s2 = document.querySelectorAll(".two span");
  let s3 = document.querySelectorAll(".three span");

  if (
    s1[0].id === s2[0].id &&
    s1[0].id === s3[0].id &&
    s1[0].id !== "" &&
    s2[0].id !== "" &&
    s3[0].id !== ""
  ) {
    return s1[0].id;
  } else if (
    s1[1].id === s2[1].id &&
    s1[1].id === s3[1].id &&
    s1[1].id !== "" &&
    s2[1].id !== "" &&
    s3[1].id !== ""
  ) {
    return s1[1].id;
  } else if (
    s1[2].id === s2[2].id &&
    s1[2].id === s3[2].id &&
    s1[2].id !== "" &&
    s2[2].id !== "" &&
    s3[2].id !== ""
  ) {
    return s1[2].id;
  } else if (
    s1[0].id === s2[1].id &&
    s1[0].id === s3[2].id &&
    s1[0].id !== "" &&
    s2[1].id !== "" &&
    s3[2].id !== ""
  ) {
    return s1[0].id;
  } else if (
    s1[2].id === s2[1].id &&
    s1[2].id === s3[0].id &&
    s1[2].id !== "" &&
    s2[1].id !== "" &&
    s3[0].id !== ""
  ) {
    return s1[2].id;
  } else if (
    s1[0].id === s1[1].id &&
    s1[0].id === s1[2].id &&
    s1[0].id !== "" &&
    s1[1].id !== "" &&
    s1[2].id !== ""
  ) {
    return s1[0].id;
  } else if (
    s2[0].id === s2[1].id &&
    s2[0].id === s2[2].id &&
    s2[0].id !== "" &&
    s2[1].id !== "" &&
    s2[2].id !== ""
  ) {
    return s2[0].id;
  } else if (
    s3[0].id === s3[1].id &&
    s3[0].id === s3[2].id &&
    s3[0].id !== "" &&
    s3[1].id !== "" &&
    s3[2].id !== ""
  ) {
    return s3[0].id;
  } else return false;
}
