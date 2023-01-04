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

const cancelBtn = qs("#cancel");

const settingsOpts = qsAll("ul li a");

const contents = qsAll(".cnt");
const clones = qsAll(".clone *")

const newTabChk = qs("#open-newtab");
const showSecChk = qs("#show-sec");
const dateFullChk = qs("#date-full");
const dayWeekChk = qs("#day-week");

var settingsOn = false;
var favorites = [];

readSettings();

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

  hour.innerHTML = (d.getHours() < 10 ? "0" : "") + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
  
  if (showSecChk.checked)
    hour.innerHTML += ":" + (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();
  
  if (dateFullChk.checked)
    date.innerHTML = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  else
    date.innerHTML = (d.getMonth() + 1 < 10 ? "0" : "") + (d.getMonth() + 1) + "/" + (d.getDate() < 10 ? "0" : "") + d.getDate() + "/" + d.getFullYear();
  
  if (dayWeekChk.checked)
    date.innerHTML = daysWeek[d.getDay()] + ", " + date.innerHTML;
  
  let hnow = d.getHours(); // hour now

  if (hnow >= 0 && hnow <= 12)
   good.innerHTML = "Good morning.";

  if (hnow >= 12 && hnow <= 18)
   good.innerHTML = "Good afternoon.";

  if (hnow >= 18)
   good.innerHTML = "Good evening.";
   
   updateCancel();
   
   setTimeout(function () { update(); }, 1000);
}

settings.onclick = (e) => {
  toggleSettings(e);
};

closeBtn.onclick = (e) => {
  toggleSettings(e);
};

cancel.onclick = () => {
  searchBox.value = "";
  
  updateCancel();
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
  updateCancel();
  
  if (e.keyCode === 13) {
    if (validURL(searchBox.value)) {
      let target = newTabChk.checked ? "_blank" : "_self";
      let ws = searchBox.value.includes("http") ? searchBox.value : "http://" + searchBox.value;
      
      window.open(ws, target);
      return;
    }
    
    search(searchBox.value, searchSel.value);
  }
  else if (e.keyCode === 27) {
    settingsMenu.classList.remove("set-active");
  }
});

function toggleSettings(e) {
  e.preventDefault();
  
  settingsMenu.classList.toggle("set-active");
  writeSettings();
}

function updateCancel() {
  if (searchBox.value === "")
    cancelBtn.style.display = "none";
  else
    cancelBtn.style.display = "initial";
}

function search(query, engine) {
  if (query === "") return;
  
  let target = newTabChk.checked ? "_blank" : "_self";
  
  switch (engine) {
    case "google":
      window.open("https://google.com/search?q=" + query, target);
      break;
    case "ddg":
      window.open("https://duckduckgo.com/?q=" + query, target);
      break;
    case "bing":
      window.open("https://bing.com/search?q=" + query, target);
      break;
    case "brave":
      window.open("https://search.brave.com/search?q=" + query, target);
      break;
  }
}

function qs(q) {
  return document.querySelector(q);
}

function qsAll(q) {
  return document.querySelectorAll(q);
}

function writeSettings() {
  localStorage["searcheng"] = searchSel.value;
  localStorage["open-nt"] = newTabChk.checked;
  
  localStorage["show-sec"] = showSecChk.checked;
  localStorage["date-full"] = dateFullChk.checked;
  localStorage["day-week"] = dayWeekChk.checked;
}

function readSettings() {
  if (!localStorage["searcheng"]) return;
  
  searchSel.value = localStorage["searcheng"];
  newTabChk.checked = localStorage["open-nt"] === "true";
  
  showSecChk.checked = localStorage["show-sec"] === "true";
  dateFullChk.checked = localStorage["date-full"] === "true";
  dayWeekChk.checked = localStorage["day-week"] === "true";
}

// StackOverflow
function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}