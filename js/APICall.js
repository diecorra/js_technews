const BASE_URL = "https://hacker-news.firebaseio.com/";

async function getFirstNIds() {
  const response = await fetch(`${BASE_URL}v0/newstories.json`);
  return await response.json();
}

async function infoItemIds(arrayItemsIds) {
  const arrayResults = [];
  for (const item in arrayItemsIds) {
    const idItem = arrayItemsIds[item];
    const response = await fetch(`${BASE_URL}v0/item/${idItem}.json`);
    const itemInfo = await response.json();
    arrayResults.push({title: itemInfo.title, time: itemInfo.time, url: itemInfo.url});
  }
  return arrayResults;
}

async function getCiao(start = 0, end = 10){
  const ciao = await getFirstNIds();
  const prova = await infoItemIds(ciao.slice(start,end));
  console.log(prova);
}

getCiao();