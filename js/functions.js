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

function checkButtons(
  elements,
  start,
  end,
  prev_button,
  next_button
) {
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

function createLinkImg(cell,elements, element, typeCol, col){
  const a = document.createElement("a");
  const link = document.createElement("img");
  a.href = elements[element][typeCol[col]];
  a.target = "_blank";
  link.src = "img/external-link.svg";
  link.alt = "Link";
  cell.append(a);
  a.append(link);
}
