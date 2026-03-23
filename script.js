let people = [];

function addPerson() {
  let name = document.getElementById("personName").value;

  if (name === "") return;

  people.push({ name: name, amount: 0 });
  document.getElementById("personName").value = "";

  renderPeople();
  updateSplit();
}

function removePerson(index) {
  people.splice(index, 1);
  renderPeople();
  updateSplit();
}

function renderPeople() {
  let list = document.getElementById("peopleList");
  list.innerHTML = "";

  people.forEach((p, i) => {
    list.innerHTML += `
      <div class="person-chip">
        ${p.name}
        <span class="remove" onclick="removePerson(${i})">×</span>
      </div>
    `;
  });
}
function updateSplit() {
  let total = Number(document.getElementById("totalBill").value);
  let tipPercent = document.getElementById("tip").value;

  document.getElementById("tipValue").innerText = tipPercent + "%";

  let tipAmount = (total * tipPercent) / 100;
  let finalTotal = total + tipAmount;

  document.getElementById("totalWithTip").innerText =
    "Total Bill with Tip: ₹ " + finalTotal;

  let splitType = document.getElementById("splitType").value;

  if (people.length < 2) return;

  if (splitType === "equal") {
    let each = finalTotal / people.length;

    people.forEach(p => p.amount = each);

    renderResults();
  } else {
    renderCustomInputs(finalTotal);
  }
}
function renderCustomInputs(total) {
  let results = document.getElementById("results");
  results.innerHTML = "";

  people.forEach((p, i) => {
    results.innerHTML += `
      <div>
        ${p.name}
        <input type="number" onchange="updateCustom(${i}, this.value)">
      </div>
    `;
  });
}

function updateCustom(index, value) {
  people[index].amount = Number(value);

  let sum = people.reduce((a, p) => a + p.amount, 0);
  let total = Number(document.getElementById("totalBill").value);
  let tip = document.getElementById("tip").value;
  let finalTotal = total + (total * tip / 100);

  if (sum !== finalTotal) {
    document.getElementById("results").innerHTML +=
      `<p style="color:red;">Amounts do not match total!</p>`;
    return;
  }

  renderResults();
}
function renderResults() {
  let results = document.getElementById("results");
  results.innerHTML = "";

  people.forEach(p => {
    results.innerHTML += `
      <div class="result-card">
        ${p.name} owes ₹ ${p.amount.toFixed(2)}
      </div>
    `;
  });
}
function resetAll() {
  people = [];
  document.getElementById("totalBill").value = "";
  document.getElementById("results").innerHTML = "";
  document.getElementById("peopleList").innerHTML = "";
}
