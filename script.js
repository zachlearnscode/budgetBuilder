let $dashboardSpans = $('#dashboard').find("span");
let $plannedSpans = $('span.planned');
let $actualSpans = $('span.actual');

function placeDashes(sel) {
  for (s = 0; s < sel.length; s++) {
    if (sel[s].innerText === "") {
      sel[s].innerText = " --";
    } 
  }
}

//Add dashes where spans are empty
placeDashes($dashboardSpans);
placeDashes($plannedSpans);
placeDashes($actualSpans);

function dashboardAdd(el) {
  let currentTotal, newIncome;
  if (el.text() !== " --") {
    currentTotal = parseFloat(el.text());
  } else {
    currentTotal = 0;
  }
  newIncome = parseFloat($('#editFormAmount').val());
  return el.text(currentTotal + newIncome);
}

let categories, selected, rows, cell;
function findCell() {
  //Store selected category
  categories = $('#editFormCategory option')
  for (let s = 0; s < categories.length; s++) {
    if (categories[s].selected === true) {
      selected = categories[s];
    }
  }
  //Find cell that matches selected category
  rows = $('#budget').find('td.category');
  for (let r = 0; r < rows.length; r++) {
    if (rows[r].innerText === selected.innerText) {
      cell = rows[r].nextElementSibling.children;
    }
  }
  return cell[0];
}

function addToCell(el) {
  let currentTotal, newIncome;
  if (el.innerText !== " --") {
    currentTotal = parseFloat(el.innerText);
  } else {
    currentTotal = 0;
  }

  newIncome = parseFloat(document.getElementById('editFormAmount').value);
  return el.innerText = currentTotal + newIncome;
}

let editSave = function() {
  //if ($('#editFormAmount').val() !== undefined) {
    //Make input is a number sure it's a number
  //} 
  
  if ($('#editFormCategory').val() === "income") {
    dashboardAdd($('#pIncome'));
    dashboardAdd($("#remaining"));
  } else {
    dashboardAdd($("#pExpenses"));
    addToCell(findCell());
  }
  $('#editFormAmount').val("")
}

$("#editSave").on('click', editSave);