 // Array to store tasks
 let tasks = [];
 let currentEditIndex = null; // Track the task being edited

 // Function to add a new task
 function addTask() {
   const taskInput = document.getElementById('task-input');
   const taskText = taskInput.value.trim();

   if (taskText !== "") {
     tasks.push({ text: taskText, completed: false });
     taskInput.value = "";
     displayTasks();
   }
 }

 // Function to display tasks
 function displayTasks() {
   const todoList = document.getElementById('todo-list');
   todoList.innerHTML = "";

   tasks.forEach((task, index) => {
     const li = document.createElement('li');
     li.className = "task-item flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all";

     // Task text
     const taskText = document.createElement('span');
     taskText.className = `flex-grow text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`;
     taskText.textContent = task.text;
     li.appendChild(taskText);

     // Buttons container
     const buttonsContainer = document.createElement('div');
     buttonsContainer.className = "flex space-x-3";

     // Done/Undone button
     const doneButton = document.createElement('button');
     doneButton.className = `px-3 py-1 rounded-lg ${task.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-all`;
     doneButton.textContent = task.completed ? "Undo" : "Done";
     doneButton.onclick = () => toggleCompleted(index);
     buttonsContainer.appendChild(doneButton);

     // Edit button
     const editButton = document.createElement('button');
     editButton.className = "px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all";
     editButton.textContent = "Edit";
     editButton.onclick = () => openEditModal(index);
     buttonsContainer.appendChild(editButton);

     // Delete button
     const deleteButton = document.createElement('button');
     deleteButton.className = "px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all";
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

 // Function to open the edit modal
 function openEditModal(index) {
   currentEditIndex = index;
   const taskText = tasks[index].text;
   document.getElementById('edit-task-input').value = taskText;
   document.getElementById('edit-modal').classList.add('open');
 }

 // Function to close the edit modal
 function closeEditModal() {
   document.getElementById('edit-modal').classList.remove('open');
 }

 // Function to save the edited task
 function saveEditedTask() {
   const newText = document.getElementById('edit-task-input').value.trim();
   if (newText !== "") {
     tasks[currentEditIndex].text = newText;
     displayTasks();
     closeEditModal();
   }
 }

 // Function to delete a task using SweetAlert
 function deleteTask(index) {
   Swal.fire({
     title: "Are you sure?",
     text: "You won't be able to revert this!",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, delete it!",
   }).then((result) => {
     if (result.isConfirmed) {
       tasks.splice(index, 1);
       displayTasks();
       Swal.fire("Deleted!", "Your task has been deleted.", "success");
     }
   });
 }

 // Initial display of tasks
 displayTasks();