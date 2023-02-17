//select main element
let inputText = document.querySelector('input[type="text"]');
let addNewTask = document.querySelector("#to-add-task");
let tasksContainer = document.querySelector(".tasks-container");


// create completed Tasks Header
let completedTasksHeader = document.createElement("div");
completedTasksHeader.className = "completed-container-header ";
completedTasksHeader.innerHTML =
  '<i class="fa-solid fa-angle-down arrow-rotate"></i> Completed';
//create done tasks container
let completedTasksContainer = document.createElement("div");
completedTasksContainer.className = "completed-tasks-container";
// line for decoration
  let lineDecoration = document.createElement("div")
  lineDecoration.className = "for-decoration";
// events
addNewTask.addEventListener("click", createNewTask); //button event
document.addEventListener("click", (event) => {
  //
  makeTasksCompleted(event);
  deleteTask(event);
  makeTasksIncomplete(event);
});

completedTasksHeader.addEventListener("click", () => {
  completedTasksHeader.firstElementChild.classList.toggle("arrow-rotate");
  completedTasksContainer.classList.toggle('hide-ctc')
});
// hide header which the completed tasks container is empty
document.addEventListener("click", () => {
  if (completedTasksContainer.children.length === 0) {
    completedTasksHeader.remove();
    lineDecoration.remove()
  }
});
// functions
function createNewTask() {
  //insert tasks into tasks container
  if(inputText.value.trim() !== ""){
    tasksContainer.innerHTML += `
      <div class="added-task">
        <div>
        ${inputText.value}
        </div>
        <div class="operations-container">
          <input type="checkbox" class="checkbox"/>
          <i title="Delete" class="fa-solid fa-xmark delete" ></i>
        </div>
      </div>`;
    //make the input empty and focus on it after adding one task
    inputText.value = "";
    inputText.focus();
  }
}
function makeTasksCompleted(e) {
  //deal with checkbox to make task done and put it in done-section
  if (e.target.className === "checkbox") {
    //put completed style on the task
    e.target.parentElement.parentElement.classList.toggle("done-parent");
    e.target.parentElement.previousElementSibling.classList.toggle("done");
    //make clone of the completed task
    let cloned = e.target.parentElement.parentElement.cloneNode(true);
    //add new class name to deal with to and prevent repeating the code above
    cloned.lastElementChild.firstElementChild.className = "cloned-checkbox";
    // appending cloned task to the element which we created above
    completedTasksContainer.appendChild(cloned);
    // add to the page
    tasksContainer.appendChild(completedTasksContainer);
    //delete the real task
    e.target.parentElement.parentElement.remove();
    if (completedTasksContainer.children.length !== 0) {
      completedTasksHeader.className = "completed-container-header";
      tasksContainer.append(completedTasksHeader);
      tasksContainer.append(lineDecoration);
      
      // console.log(completedTasksHeader.classList);
    }
  }
}
function deleteTask(e) {
  // remove selected task
  if (e.target.className === "fa-solid fa-xmark delete") {
    e.target.parentElement.parentElement.remove();
  }
}
function makeTasksIncomplete(e) {
  if (e.target.className === "cloned-checkbox") {
    let cancelClonedTask = e.target.parentElement.parentElement.cloneNode(true);
    cancelClonedTask.lastElementChild.firstElementChild.className = "checkbox";
    cancelClonedTask.classList.toggle("done-parent");
    cancelClonedTask.firstElementChild.classList.toggle("done");
    tasksContainer.prepend(cancelClonedTask);
    e.target.parentElement.parentElement.remove();
  }
}
