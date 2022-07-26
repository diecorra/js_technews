const urlLastIds = "https://hacker-news.firebaseio.com/v0/newstories.json";

async function lastIds() {
  let response = await fetch(urlLastIds);
  let lastIds = await response.json();
  lastIds = lastIds.slice(lastIds.length - 10);
  //console.log(lastIds);
  infoItemIds(lastIds);
}

async function infoItemIds(object) {
  for (const item in object) {
    let idItem = object[item];
    const urlItemInfo =
      "https://hacker-news.firebaseio.com/v0/item/" + idItem + ".json";
    let response = await fetch(urlItemInfo);
    let itemInfo = await response.json();
    console.log(itemInfo);
  }
}

lastIds();
