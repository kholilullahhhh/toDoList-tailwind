// Array to store tasks
let tasks = [];

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    displayTasks();
  }
}

// Function to display tasks
function displayTasks() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className =
      "flex items-center justify-between p-2 bg-gray-50 rounded-lg";

    // Task text
    const taskText = document.createElement("span");
    taskText.className = `flex-grow ${
      task.completed ? "line-through text-gray-500" : "text-gray-700"
    }`;
    taskText.textContent = task.text;
    li.appendChild(taskText);

    // Buttons container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "flex space-x-2";

    // Done/Undone button
    const doneButton = document.createElement("button");
    doneButton.className = `px-2 py-1 rounded ${
      task.completed
        ? "bg-yellow-500 hover:bg-yellow-600"
        : "bg-green-500 hover:bg-green-600"
    } text-white`;
    doneButton.textContent = task.completed ? "Undo" : "Done";
    doneButton.onclick = () => toggleCompleted(index);
    buttonsContainer.appendChild(doneButton);

    // Edit button
    const editButton = document.createElement("button");
    editButton.className =
      "px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded";
    editButton.textContent = "Edit";
    editButton.onclick = () => editTask(index);
    buttonsContainer.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.className =
      "px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(index);
    buttonsContainer.appendChild(deleteButton);

    li.appendChild(buttonsContainer);
    todoList.appendChild(li);
  });
}

// Function to toggle task completion
function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
}

// Function to edit a task
function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    displayTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    displayTasks();
  }
}

// Initial display of tasks
displayTasks();
