const inputBox = document.getElementById("input-box");
const button = document.querySelector("button");
const list = document.getElementById("list-container");


function addTask() {
    if (inputBox.value === '') {
        alert("you must write something!");
    } else {
        let li = document.createElement("li");
        list.appendChild(li);
        
        let task = document.createElement("p");
        task.innerHTML = inputBox.value;
        inputBox.value = '';
        
        let controls = document.createElement("div");
        controls.classList.add("controls");
        
        let edit = document.createElement("span");
        edit.innerHTML = '<i class="edit fa-regular fa-pen-to-square"></i>';
        controls.appendChild(edit);
        
        let remove = document.createElement("span");
        remove.innerHTML = '<i class="remove fa-solid fa-x"></i>';
        controls.appendChild(remove);

        li.appendChild(task);
        li.appendChild(controls);
    }
    saveData();
}
list.addEventListener("click", e => {
    if (e.target.tagName === "LI") {
        e.target.firstChild.classList.toggle("checked");
        e.target.classList.toggle("fill");
        saveData();
    } else if (e.target.tagName === "P") {
        e.target.classList.toggle("checked");
        e.target.parentElement.classList.toggle("fill");
        saveData();
    } else if (e.target.classList.contains("remove")) {
        e.target.parentElement.parentElement.parentElement.remove();
        saveData();
    } else if (e.target.classList.contains("edit")) {
        let element = e.target.parentElement.parentElement.parentElement.firstChild
        let value = prompt("Enter new task: ", element.innerText)
        if (value !== ''){
            element.innerText = value;
        }
        saveData();
    }
});

button.addEventListener("click", addTask);

function saveData() {
    localStorage.setItem("data", list.innerHTML);
}
function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        list.innerHTML = savedData;
    }
}
window.addEventListener("load", showTask);