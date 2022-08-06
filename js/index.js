const BASE_URL = "https://hacker-news.firebaseio.com/";
const prev_button = document.getElementById("prev_button");
const next_button = document.getElementById("next_button");
const table = document.getElementById("table-news");
const loader = document.getElementById("loader");
const num_page = document.getElementById("num-page");
const typeCol = ["title", "time", "url"];
const NOT_AVAILABLE = "NOT AVAILABLE";
let infoItem = null;
let ids = null;
let start = 0,
  end = 10;

async function getArrayDataAndWrite(start = 0, end = 10) {
  ids = await getIds();
  if (!ids) {
    alert("Error loading news, please try again later.");
  } else {
    infoItem = await infoItemIds(ids.slice(start, end));
    if (!infoItem) {
      alert("Error loading news, please try again later.");
    } else {
      writeData(infoItem);
    }
  }
}

getArrayDataAndWrite();
