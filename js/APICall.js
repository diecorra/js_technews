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
        title: itemInfo?.title ? itemInfo?.title : NOT_AVAILABLE,
        time: itemInfo?.time
          ? getStringDateFromDateInSeconds(itemInfo?.time)
          : NOT_AVAILABLE,
        url: itemInfo?.url ? itemInfo?.url : NOT_AVAILABLE,
      });
    }
  }
  return arrayResults;
}
