function getStringDateFromDateInSeconds(seconds) {
  const month = new Date().getUTCMonth(seconds * 1000) + 1;
  return (
    new Date().getUTCDate(seconds * 1000) +
    "/" +
    month +
    "/" +
    new Date().getUTCFullYear(seconds * 1000)
  );
}

function deleteRow(table, elements) {
  let tr = null;
  for (const element in elements) {
    table.deleteRow(elements.length - Number(element));
  }
}

function checkButtons(elements, start, end, prev_button, next_button) {
  if (start == 0) {
    prev_button.classList.remove("active-button");
    prev_button.classList.add("disabled-button");
  } else {
    prev_button.classList.add("active-button");
    prev_button.classList.remove("disabled-button");
  }

  if (end == elements) {
    next_button.classList.remove("active-button");
    next_button.classList.add("disabled-button");
  } else {
    next_button.classList.add("active-button");
    next_button.classList.remove("disabled-button");
  }
}

function createLinkImg(cell, elements, element, typeCol, col) {
  const a = document.createElement("a");
  const link = document.createElement("img");
  a.href = elements[element][typeCol[col]];
  a.target = "_blank";
  link.src = "img/external-link.svg";
  link.alt = "Link";
  cell.append(a);
  a.append(link);
}

async function getIds() {
  return await generalFetch(BASE_URL + "v0/newstories.json");
}

function writeData(elements) {
  checkButtons(ids.length, start, end, prev_button, next_button);
  let col = 0;
  loader.classList.add("no-display");
  table.classList.remove("no-display");
  prev_button.classList.remove("no-display");
  next_button.classList.remove("no-display");
  num_page.classList.remove("no-display");
  for (const element in elements) {
    let row = table.insertRow(Number(element) + 1);
    for (col = 0; col < 3; col++) {
      let cell = row.insertCell(col);
      num_page.textContent = start + 1 + " - " + end;
      if (!elements[element][typeCol[col]]) {
        cell.textContent = "NOT AVAILABLE";
      } else if (typeCol[col] === "url") {
        createLinkImg(cell, elements, element, typeCol, col);
      } else {
        cell.textContent = elements[element][typeCol[col]];
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
  deleteRow(table, infoItem);
  start -= 10;
  end -= 10;
  getArrayDataAndWrite(start, end);
});

next_button.addEventListener("click", function () {
  loader.classList.remove("no-display");
  table.classList.add("no-display");
  prev_button.classList.add("no-display");
  next_button.classList.add("no-display");
  num_page.classList.add("no-display");
  deleteRow(table, infoItem);
  start += 10;
  end += 10;
  getArrayDataAndWrite(start, end);
});
