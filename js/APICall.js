const BASE_URL = "https://hacker-news.firebaseio.com/";
const prev_button = document.getElementById("prev_button");
const next_button = document.getElementById("next_button");
const table = document.getElementById("table-news");
const loader = document.getElementById("loader");
const num_page = document.getElementById("num-page");
const typeCol = ["title", "time", "url"];
let infoItem = null;
let ids = null;
let start = 0,
  end = 10;

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
    loader.classList.add("no-display");
  }
}

async function infoItemIds(arrayItemsIds) {
  const arrayResults = [];
  for (const item in arrayItemsIds) {
    const itemInfo = await generalFetch(
      BASE_URL + "v0/item/" + arrayItemsIds[item] + ".json"
    );
    if (itemInfo) {
      arrayResults.push({
        title: itemInfo?.title,
        time: itemInfo?.time
          ? getStringDateFromDateInSeconds(itemInfo?.time)
          : "NOT AVAILABLE",
        url: itemInfo?.url,
      });
    }
  }
  return arrayResults;
}
