const BASE_URL = "https://hacker-news.firebaseio.com/";
const prev_button = document.getElementById("prev_button");
const next_button = document.getElementById("next_button");
const table = document.getElementById("table-news");
const loader = document.getElementById("loader");
const num_page = document.getElementById("num-page");
let infoItem = null;
let ids = null;
let start = 0,
  end = 10;

async function getIds() {
  return await generalFetch(BASE_URL + "v0/newstories.json");
}

// TODO se passo una chiamata sbagliata, gestire meglio l'eccezione.. visualizzare errore per l'utente
async function generalFetch(url) {
  try {
    const response = await fetch(`${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    } else {
      return response.json();
    }
  } catch (fetchError) {
    console.log("Fetch error:" + fetchError);
  }
}

async function infoItemIds(arrayItemsIds) {
  const arrayResults = [];
  for (const item in arrayItemsIds) {
    const itemInfo = await generalFetch(
      BASE_URL + "v0/item/" + arrayItemsIds[item] + ".json"
    );
    if (itemInfo != null) {
      const titleInfo = getStringDateFromDateInSeconds(itemInfo.time);
      arrayResults.push({
        title: itemInfo.title,
        url: itemInfo.url,
        time: titleInfo,
      });
    }
  }
  return arrayResults;
}

async function getArrayData(start = 0, end = 10) {
  ids = await getIds();
  if (ids == null || ids == undefined) {
    alert("errore!!");
  } else {
    infoItem = await infoItemIds(ids.slice(start, end));
  }
  if (infoItem == null || infoItem == undefined) {
    alert("errore!!");
  } else {
    writeData(infoItem);
  }
}

function writeData(elements) {
  checkButtons(ids.length, start, end, prev_button, next_button, num_page);
  let col = 0;
  loader.classList.add("no-display");
  table.classList.remove("no-display");
  prev_button.classList.remove("no-display");
  next_button.classList.remove("no-display");
  num_page.classList.remove("no-display");
  const type = ["title", "url", "time"];
  for (const element in elements) {
    let row = table.insertRow(Number(element) + 1);
    for (col = 0; col < 3; col++) {
      let cell = row.insertCell(col);
      num_page.textContent = start + 1 + "-" + end;
      if (type[col] == null || type[col] == undefined) {
        console.log("dd" + type[col]);
        console.log("rpova");
        cell.textContent = "NOT AVAIBLE";
      } else if (type[col] == "url") {
        const a = document.createElement("a");
        const link = document.createElement("img");
        a.href = elements[element][type[col]];
        a.target = "_blank";
        link.src = "img/external-link.svg";
        link.alt = "Link";
        cell.append(a);
        a.append(link);
      } else {
        cell.textContent = elements[element][type[col]];
      }
    }
  }
}

prev_button.addEventListener("click", function () {
  loader.classList.remove("no-display");
  table.classList.add("no-display");
  prev_button.classList.add("no-display");
  next_button.classList.add("no-display");
  num_page.classList.add("no-display");
  deleteRow(infoItem);
  start -= 10;
  end -= 10;
  getArrayData(start, end);
});

next_button.addEventListener("click", function () {
  loader.classList.remove("no-display");
  table.classList.add("no-display");
  prev_button.classList.add("no-display");
  next_button.classList.add("no-display");
  num_page.classList.add("no-display");
  deleteRow(infoItem);
  start += 10;
  end += 10;
  getArrayData(start, end);
});

getArrayData();
