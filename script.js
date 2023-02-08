// GLOBAL VARIABLES ================================================================

let allLi = document.querySelectorAll("li");
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
        let radioAdd = document.querySelector("input[name=add]:checked");
        if (radioAdd.value == "beggin") {
          ulTasks.prepend(liNewTask);
          array.unshift(liNewTask.textContent);
        } else {
          ulTasks.appendChild(liNewTask);
          array.push(liNewTask.textContent);
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
  });
};

loadListFromLocalStorage();

// ERASE TASKS FROM DOM AND LOCAL STORAGE =============================================

ulTasks.addEventListener("click", () => {
  allLi.forEach((el) => {
    el.style.display = "none";
  });
});

let eraseFromDOMandStorage = () => {
  ulTasks.addEventListener("click", (e) => {
    if (e.target.tagName == "LI") {
      e.target.remove();
      array = JSON.parse(localStorage.getItem("list"));
      for (i = 0; i < array.length; i++) {
        if (e.target.textContent == array[i]) {
          array.splice(i, 1);
        }
      }
      localStorage.setItem("list", JSON.stringify(array));
    }
  });
};

eraseFromDOMandStorage();
