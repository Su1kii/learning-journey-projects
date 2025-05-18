const addBtn = document.getElementById("addBtn");
const userInput = document.getElementById("userInput");
const userTip = document.getElementById("userTip");
const people = document.getElementById("userAmount");
const myList = document.getElementById("myList");

// Load existing tips from localStorage or start with an empty array
let array = JSON.parse(localStorage.getItem("tips")) || [];

// Render saved tips on page load
window.addEventListener("DOMContentLoaded", renderList);

// Listens for a click
addBtn.addEventListener("click", solveInput);

// Function to calculate the Tip and split Evenly
function solveInput() {
  let value = Number(userInput.value);
  let tipValue = Number(userTip.value / 100);
  let tip = tipValue * value;
  let split = Number(people.value);

  if (!value || !tipValue || !split) return;

  let total = Math.ceil(value + tip);
  let perPerson = Math.ceil(total / split);

  // Push to array and save
  array.push({ total, perPerson });
  localStorage.setItem("tips", JSON.stringify(array));

  // Re-render list
  renderList();

  // Clear input fields
  userInput.value = "";
  userTip.value = "";
  people.value = "";
}

// Render the list based on localStorage data
function renderList() {
  myList.innerHTML = ""; // Clear existing list

  array.forEach((item, index) => {
    // Create list item
    let list = document.createElement("li");
    list.className =
      "flex justify-between items-center border border-black rounded-xl p-4 mb-4 bg-white shadow text-left transition-opacity duration-500";

    // Create text
    let text = document.createElement("span");
    text.textContent = `Total: $${item.total} | Per Person: $${item.perPerson}`;

    // Create delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className =
      "ml-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded";

    // Add event to delete this specific list item
    deleteBtn.addEventListener("click", function () {
      list.classList.add("opacity-0"); // fade out
      setTimeout(() => {
        list.remove(); // remove from DOM
        array.splice(index, 1); // remove from array
        localStorage.setItem("tips", JSON.stringify(array)); // update localStorage
        renderList(); // re-render list to rebind correct index values
      }, 500);
    });

    // Append text and button to the list item
    list.appendChild(text);
    list.appendChild(deleteBtn);

    // Append the list item to the UL
    myList.appendChild(list);
  });
}
