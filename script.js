const good = qs("#good");
const hour = qs("#hour");
const date = qs("#date");
const settings = qs("#settings");
const settingsMenu = qs("#settings-menu");
const closeBtn = qs("#close");
const addFav = qs("#add-fav");

const searchBtn = qs("#search");
const searchSel = qs("#search-eng-sel");
const searchBox = qs("#search-box");

const settingsOpts = qsAll("ul li a");

const contents = qsAll(".cnt");
const clones = qsAll(".clone *")

var settingsOn = false;
var favorites = [];

//const goods = ["Good Morning.", "Good Afternoon.", "Good Evening."];
const daysWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

setup();
update();

function setup() {
  contents.forEach((b, i) => {
    if (i == 0) return;
    
    contents[i].classList.add("d-none");
  });
}

function update() {
  var d = new Date();

  hour.innerHTML = (d.getHours() < 10 ? "0" : "") + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes() + ":" + (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();
  //date.innerHTML = (d.getDate() < 10 ? "0" : "") + d.getDate() + "/" + (d.getMonth() + 1 < 10 ? "0" : "") + (d.getMonth() + 1) + "/" + d.getFullYear();
  date.innerHTML = daysWeek[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  
  let hnow = d.getHours(); // hour now

  if (hnow >= 0 && hnow <= 12)
   good.innerHTML = "Good morning.";

  if (hnow >= 12 && hnow <= 18)
   good.innerHTML = "Good afternoon.";

  if (hnow >= 18)
   good.innerHTML = "Good evening.";
   
   setTimeout(function () { update(); }, 1000);
}

settings.onclick = (e) => {
  toggleSettings(e);
};

closeBtn.onclick = (e) => {
  toggleSettings(e);
};

settingsOpts.forEach((b, i) => {
  b.onclick = (e) => {
    e.preventDefault();
    
    // clear
    settingsOpts.forEach((bb, ii) => {
      bb.classList.remove("selected");
      contents[ii].classList.add("d-none");
    });
    
    b.classList.add("selected");
    contents[i].classList.remove("d-none");
  };
});

searchBtn.onclick = (e) => {
  e.preventDefault();
  
  search(searchBox.value, searchSel.value);
};

addFav.onclick = (e) => {
  e.preventDefault();
};

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    search(searchBox.value, searchSel.value);
  }
  else if (e.keyCode === 27) {
    settingsMenu.classList.remove("set-active");
  }
});

function toggleSettings(e) {
  e.preventDefault();
  
  settingsMenu.classList.toggle("set-active");
}

function search(query, engine) {
  if (query === "") return;
  
  switch (engine) {
    case "google":
      window.open("https://google.com/search?q=" + query);
      break;
    case "ddg":
      break;
    case "bing":
      break;
    case "brave":
      break;
  }
}

function qs(q) {
  return document.querySelector(q);
}

function qsAll(q) {
  return document.querySelectorAll(q);
}