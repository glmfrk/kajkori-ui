const newTaskInput = document.getElementById('new_task');
const addTaskButton = document.getElementById('add_task');
const todoList = document.querySelector('.todo_list .items');
const completeList = document.querySelector('.complete_list .items');



function addTask(event) {
   event.preventDefault();

   const cleanedTask = newTaskInput.value.trim();

   if (!cleanedTask) {
      console.log(cleanedTask);
   
      newTaskInput.focus();
		return;
   }
   createTaskItem(cleanedTask);
}


addTaskButton.addEventListener('click', addTask);

function createTaskItem(cleanedTask) {
   const item = document.createElement('li');
   const checkbox = document.createElement('input');
   const label = document.createElement('label');
   const actionButton = document.createElement('button');

   checkbox.type = 'checkbox';
}