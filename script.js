const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const saveTabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");
let myLeads = [];
const tabs = [];

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
        <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
    </li>`;
  }
  ulEl.innerHTML = listItems;
}

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

//save input
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = " ";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

//save tab
saveTabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

//delete all
deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
