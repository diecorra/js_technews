const BASE_URL = "https://hacker-news.firebaseio.com/";

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
      arrayResults.push({
        id: itemInfo.id,
        title: itemInfo.title,
        time: itemInfo.time,
        url: itemInfo.url,
      });
    }
  }
  return arrayResults;
}

async function getArrayData(start = 0, end = 10) {
  const ids = await getIds();
  const infoItem = await infoItemIds(ids.slice(start, end));
  writeData(infoItem);
}

function createNewElement(element, text, className) {
  const new_element = document.createElement(element);
  text && (new_element.textContent = text);
  className && new_element.classList.add(className);
  return new_element;
}

function writeData(elements) {
  let index = 0;
  const loader = document.getElementById("loader");
  loader.style.display = "none";
  const table = document.getElementById("table-div");
  document.getElementById("table-div").style.removeProperty("display");
  for (const element in elements) {
    var row = table.insertRow(element);
    for (i = 0; i < 3; i++) {
      //var cell1 = row.insertCell(0);
      //var cell2 = row.insertCell(1);
      //var cell3 = row.insertCell(2);
    }
    const td = createNewElement("td", elements[element].title, "td");
    table.appendChild(td);
  }
}

getArrayData();
