const submitBtn = document.getElementById("submitBtn");
const userInput = document.getElementById("input");
const todoList = document.getElementById("todoList");
const clearData = document.getElementById("clearData");

let tasks = [];

// Load from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const stored = localStorage.getItem("todoList");
  if (stored) {
    tasks = JSON.parse(stored);
    tasks.forEach((task) => {
      createTaskElement(task);
    });
  }
});

// Add task on button click
submitBtn.addEventListener("click", () => {
  const taskText = userInput.value.trim();
  if (taskText !== "") {
    tasks.push(taskText);
    createTaskElement(taskText);
    localSave();
    userInput.value = "";
  }
});

// Add task with Enter key
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    submitBtn.click();
  }
});

// Create a new task item in the list with a delete button
function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.addEventListener("click", () => {
    todoList.removeChild(li);
    tasks = tasks.filter((task) => task !== taskText);
    localSave();
  });

  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

// Save to localStorage
function localSave() {
  localStorage.setItem("todoList", JSON.stringify(tasks));
}

// Clear all tasks and localStorage
clearData.addEventListener("click", () => {
  tasks = [];
  localStorage.clear();
  todoList.innerHTML = "";
});
