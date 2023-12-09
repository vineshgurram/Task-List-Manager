let taskInput = document.querySelector("#taskName");
let taskDate = document.querySelector("#taskDate");
let taskTime = document.querySelector("#taskTime")
let taskForm = document.querySelector("#taskForm");
let loaderBox = document.querySelector("table-wrap");
let deleteBtn = document.querySelector(".delete-btn");
let deleteAllBtn = document.querySelector(".delete-all-btn");
let unique=NaN;



function addTask() {
    let taskInputValue = taskInput.value;
    let taskObj = {
        id: allTask.length,
        taskName: taskInputValue,
        taskStatus: "Incompleted",
        taskAt: `${taskDate.value} at ${taskTime.value}`
    }
    allTask.push(taskObj);
    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
    showTask(allTask);
}


function showTask(array) {
    let display = "";
    array.forEach(function (el, id) {
        display += `<tr><td><input type="checkbox" onclick="checkRemove(${id})" data-id="${id}" class="checkbox"></td><td>${el.taskName}</td><td>${el.taskAt}</td><td>${el.taskStatus}</td><td><button onclick="removeTask(${id})" class="btn delete-btn">Remove</button><button onclick="completedTask(${id})" class="btn complete-btn">Completed</button></td></tr>`;
    });
    displayLoader();
    document.querySelector("#tbody").innerHTML = display;
    if (allTask.length == 0) {
        document.querySelector("#tbody").innerHTML = `<tr><td colspan="5">No Task Found</td></tr>`;
    }
}

function removeTask(id) {
    allTask.splice(id, 1);
    showTask(allTask);
}

function filterCompleted() {
    let completed = allTask.filter(function (el) {
        return el.taskStatus == 'Completed';
    });

    displayLoader();
    showTask(completed);
}

function filterIncompleted() {
    let incompleted = allTask.filter(function (el) {
        return el.taskStatus == 'Incompleted';
    });

    showTask(incompleted);
}

function completedTask(id) {
    allTask[id].taskStatus = "Completed";
    showTask(allTask);
}


function displayLoader() {
    var myElement = document.getElementById('myElement');
    myElement.classList.add('active');
    setTimeout(function () {
        myElement.classList.remove('active');
    }, 300);
}


function checkRemove(id) {
    var checkbox = document.querySelector(`.checkbox[data-id="${id}"]`);
    if (checkbox.checked) {
        unique = id;
        // alert(unique)
    } else {
        unique = NaN; // Reset unique if the checkbox is unchecked
    }
    toggleDeleteButton(deleteBtn);
}


function deleteButton() {
    // alert(unique)
    
    if (isNaN(unique)) {
        alert("Please select a task to delete.");
        return;
    }
    if (confirm("Are you sure you want to remove this task?") == true) {
        allTask.splice(unique, 1);
        showTask(allTask);
    }
    else {
        alert("Removal canceled.");
    }
    
}


function deleteAll() {
    checkBoxes = document.querySelectorAll('.checkbox');
    checkBoxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    allTask.splice(0, allTask.length);
    setTimeout(function () {
        showTask(allTask);
        if (allTask.length == 0) {
            document.querySelector("#tbody").innerHTML = `<tr><td colspan="5">No Task Found</td></tr>`;
        }
    }, 500);
}

function toggleDeleteButton(btn){
    // alert()
    if (btn.style.display === "none") {
        btn.style.display = "inline-block";
    } else {
        btn.style.display = "none";
    }
}

showTask(allTask);




