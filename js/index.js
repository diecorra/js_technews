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
