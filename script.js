// GLOBAL VARIABLES ================================================================

let ulTasks = document.querySelector("ul");
let inputTask = document.getElementById("task");
let array = [];

// INPUT NEW TASK ====================================================================

let inputNewTask = () => {
  inputTask.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      let inputTaskValue = inputTask.value;
      if (inputTaskValue != "") {
        let liNewTask = document.createElement("li");
        liNewTask.textContent += inputTaskValue;
        let removeBucket = document.createElement("i");
        removeBucket.innerHTML = "&#128465;";
        liNewTask.append(removeBucket);
        let radioAdd = document.querySelector("input[name=add]:checked");
        if (radioAdd.value == "beggin") {
          ulTasks.prepend(liNewTask);
          let trimmedTask = liNewTask.textContent.slice(0, -2);
          array.unshift(trimmedTask);
        } else {
          ulTasks.appendChild(liNewTask);
          let trimmedTask = liNewTask.textContent.slice(0, -2);
          array.push(trimmedTask);
        }

        localStorage.setItem("list", JSON.stringify(array));
        inputTask.value = "";
      }
    }
  });
};

inputNewTask();

// LOAD LIST FROM LOCAL STORAGE =====================================================

let loadListFromLocalStorage = () => {
  array = JSON.parse(localStorage.getItem("list")) || [];
  array.forEach((el) => {
    let liNewTask = document.createElement("li");
    liNewTask.textContent = el;
    ulTasks.appendChild(liNewTask);
    let removeBucket = document.createElement("i");
    removeBucket.innerHTML = "&#128465;";
    liNewTask.append(removeBucket);
  });
};

loadListFromLocalStorage();

// ERASE TASKS FROM DOM AND LOCAL STORAGE =============================================

let eraseFromDOMandStorage = () => {
  ulTasks.addEventListener("click", (e) => {
    if (e.target.tagName == "I") {
      e.target.parentElement.remove();
      array = JSON.parse(localStorage.getItem("list"));
      for (i = 0; i < array.length; i++) {
        if (e.target.parentElement.textContent.slice(0, -2) == array[i]) {
          array.splice(i, 1);
        }
      }
      localStorage.setItem("list", JSON.stringify(array));
    }
  });
};

eraseFromDOMandStorage();
