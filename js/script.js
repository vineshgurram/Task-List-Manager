let taskInput = document.querySelector("#taskName");
let taskDate = document.querySelector("#taskDate");
let taskTime = document.querySelector("#taskTime")
let taskForm = document.querySelector("#taskForm");
let taskEditForm = document.querySelector("#taskEditForm");
let loaderBox = document.querySelector("table-wrap");
let deleteBtn = document.querySelector(".delete-btn");
let deleteAllBtn = document.querySelector(".delete-all-btn");
let unique = NaN;
let modalPopupParagraph = document.querySelector(".common-modal p");
let commonModal = document.querySelector(".overlay");
let tableRow = document.querySelectorAll(".tr");
let taskDescription = document.querySelector("#taskDescription");
let notificationText = document.querySelector(".task-completed-box p");
const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function displayModal(message) {
    modalPopupParagraph.innerHTML = message;
    deleteAllBtn.addEventListener("click", function () {
        document.querySelector('.overlay').classList.toggle("active");
    });
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(allTask));
}

// function generateUniqueId() {
//    return Math.floor(Math.random()*100)
// }

function addTask() {
    let taskInputValue = taskInput.value;
    let taskDateObj = new Date(taskDate.value)
    let taskDayValue = day[taskDateObj.getDay()];
    let taskDateValue = taskDateObj.getDate();
    console.log(taskDateObj)
    let taskMonthValue = month[taskDateObj.getMonth()];
    let taskDescriptionValue = taskDescription.value;
    let taskFullDate = `${taskMonthValue} -- ${taskDateObj.getFullYear()} -- ${taskDateValue} -- ${taskDayValue}`
    console.log(taskFullDate)
    // console.log(taskDescriptionValue)
    let taskObj = {
        id: allTask.length,
        taskName: taskInputValue,
        taskStatus: "Incompleted",
        taskDescription: taskDescriptionValue,
        taskDate: {
            fullDate: `${taskDayValue.slice(0, 3)}, ${taskDateValue} ${month[taskDateObj.getMonth()]}, ${taskDateObj.getFullYear()}`,
            day: taskDayValue,
            date: taskDateValue,
            month: month[taskDateObj.getMonth()],
            year: taskDateObj.getFullYear()
        }
    }


    allTask.push(taskObj);
    saveTasksToLocalStorage();
    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
    taskDescription.value = "";
    completeBox = document.querySelector(".task-completed-box");
    notificationText.innerText = "Your task has been added successfully..";
    completeBox.classList.add('active');
    setTimeout(function () {
        completeBox.classList.remove('active');
        // notificationText.innerText = "Notification Message";
    }, 1500);
    showTask(allTask);
}

// Function to get tasks from local storage
function getTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        allTask = JSON.parse(storedTasks);
        showTask(allTask);
    }
}

function showTask(array) {
    let display = "";
    array.forEach(function (el, id) {
        display += `<div class="task-box" data-id="${id}">
        <div class="flex">
            <div class="action-box">
                <input type="checkbox" class="checkbox" onclick="checkRemove(${id})"
                    data-id="${id}">
            </div>
            <div class="task-box-info">
                <h3>${el.taskName}</h3>
                <p>${el.taskDate.fullDate}</p>
            <p class="task-status ${(el.taskStatus == "Completed") ? 'completed' : 'pending'
            }"><i class="fa-solid ${(el.taskStatus == "Completed") ? 'fa-circle-check' : 'fa-hourglass-half'}"></i>${(el.taskStatus == "Completed") ? "Done" : "Pending"}</p>
            </div>
            <div class="action-box-end">
                <div class="complete-delete">
                    <button class="task-completed-btn ${(el.taskStatus == "Completed") ? 'd-none' : ''
            }" onclick="completedTask(${el.id})" title="Complete">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <button class="task-delete-btn" title="Delete" onclick="removeTask(id)">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                <button class="get-details" onclick="fetchDetails(${el.id})">
                    <i class="fa-solid ${(el.taskStatus == "Completed") ? 'fa-note-sticky' : 'fa-pencil'}""></i><span class="txt">${(el.taskStatus == "Completed") ? 'View' : 'Edit'}</span>
                </button>
            </div>
        </div>
    </div>`;
    });
    displayLoader();
    document.querySelector(".task-grid").classList.remove("active");
    document.querySelector(".task-grid").innerHTML = display;

    if (array.length == 0) {
        document.querySelector(".task-grid").innerHTML = `<div class="h2"><i class="fa-solid fa-face-meh"></i><div><h2>No tasks have been added yet</h2>`;
        document.querySelector(".task-grid").classList.add("active");

    }
    // let taskStatusElement = document.querySelector(".task-status");
    // if (taskStatusElement.innerText == "Done") {
    //     taskStatusElement.style.color = "#0174BE";
    // }

}


function removeTask(id) {
    console.log(trashItems);
    let removedTask = allTask.splice(id, 1);
    console.log(trashItems);
    trashItems.push(removedTask[0]);
    saveTasksToLocalStorage();
    showTask(allTask);
    completeBox = document.querySelector(".task-completed-box");
    notificationText.innerText = "Your task has been removed successfully..";
    completeBox.classList.add('active');
    setTimeout(function () {
        completeBox.classList.remove('active');
        // notificationText.innerText = "Notification Message";
    }, 1500);
}


function filterCompleted() {
    let completed = allTask.filter(function (el) {
        return el.taskStatus == "Completed";
    });
    displayLoader();
    console.log(completed)
    showTask(completed);
}


function filterIncompleted() {
    let incompleted = allTask.filter(function (el) {
        return el.taskStatus == 'Incompleted';
    });
    displayLoader();
    showTask(incompleted);
}


function completedTask(id) {
    console.log(allTask[id].taskStatus)
    allTask[id].taskStatus = "Completed";
    console.log(allTask[id].taskStatus);
    saveTasksToLocalStorage();
    showTask(allTask);
    completeBox = document.querySelector(".task-completed-box");
    notificationText.innerText = "Nailed it! That task is done!👏";
    completeBox.classList.add('active');
    completeBox.classList.add('alert');
    setTimeout(function () {
        completeBox.classList.remove('active');
        // notificationText.innerText = "Notification Message";
    }, 1500);
    completeBox.classList.remove('alert');
}


function displayLoader() {
    var myElement = document.querySelector(".loader-wrap");
    myElement.classList.add('active');
    setTimeout(function () {
        myElement.classList.remove('active');
    }, 300);
}


function deleteAll() {
    if (allTask.length !== 0) {
        if (confirm("Are you sure you want to delete all task ?") == true) {
            checkBoxes = document.querySelectorAll('.checkbox');
            checkBoxes.forEach(checkbox => {
                checkbox.checked = true;
            });
            allTask.splice(0, allTask.length);
            document.querySelector('.operation-box').classList.remove("active");
            setTimeout(function () {
                saveTasksToLocalStorage();
                showTask(allTask);
            }, 500);
        }
    }
    else if (selectArray.length === 0) {
        alert("Please add task.");
        return;
    }
}


function toggleDeleteButton(btn) {
    // alert()
    if (btn.style.display === "none") {
        btn.style.display = "inline-block";
    } else {
        btn.style.display = "none";
    }
}



document.querySelector(".add-task-btn").addEventListener("click", function () {
    document.querySelector('.form-popup').classList.add("active");
    document.querySelector('.overlay').classList.add("active");
})


document.querySelector(".overlay").addEventListener("click", function () {
    document.querySelector('.form-popup').classList.remove("active");
    document.querySelector('.task-expand').classList.remove("active");
    this.classList.remove("active");
})


document.querySelector(".task-expand .back-btn").addEventListener("click", function () {
    document.querySelector('.task-expand').classList.remove("active");
    document.querySelector('.overlay').classList.remove("active");
})


document.querySelector(".add-top-action .back-btn").addEventListener("click", function () {
    document.querySelector('.form-popup').classList.remove("active");
    document.querySelector('.overlay').classList.remove("active");
})

// document.querySelectorAll(".get-details").forEach(el => {
//     el.addEventListener("click", function () {
//         let dataValue = this.closest(".task-box").getAttribute('data-id');
//         document.querySelector('.task-expand').classList.add("active");
//         document.querySelector('.overlay').classList.add("active");
//         fetchDetails(dataValue);
//     });
// });

function fetchDetails(id) {
    document.querySelector('#task-name').innerText = allTask[id].taskName;
    document.querySelector('#task-day').innerText = allTask[id].taskDate.day;
    document.querySelector('#task-description').value = allTask[id].taskDescription;
    document.querySelector('#task-date').innerText = `${(allTask[id].taskDate.month).slice(0, 3)} ${allTask[id].taskDate.date}, ${allTask[id].taskDate.year}`;
    document.querySelector('.task-expand').classList.add("active");
    document.querySelector('.overlay').classList.add("active");
    document.querySelector('#task-description').removeAttribute("disabled");
    document.querySelector("#taskEditForm .button-box button").classList.remove("d-none");
    if (allTask[id].taskStatus === "Completed") {
        document.querySelector('#task-description').setAttribute("disabled", "true");
        document.querySelector("#taskEditForm .button-box button").classList.add("d-none");
    }
    taskEditForm.addEventListener("submit", function (e) {
        e.preventDefault();
        allTask[id].taskDescription = document.querySelector('#task-description').value;
        localStorage.setItem('tasks', JSON.stringify(allTask));
        document.querySelector('.task-expand').classList.remove("active");
        document.querySelector('.overlay').classList.remove("active");
        completeBox = document.querySelector(".task-completed-box");
        notificationText.innerText = "Your task has been updated successfully..";
        completeBox.classList.add('active');
        setTimeout(function () {
            completeBox.classList.remove('active');
            // notificationText.innerText = "Notification Message";
        }, 1500);
        // console.log(allTask);
    });
}

let buttons = document.querySelectorAll('.all-btns .btn');
buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        buttons.forEach(function (btn) {
            btn.classList.remove('active');
        });

        this.classList.add('active');
    });
});

taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    document.querySelector('.form-popup').classList.remove("active");
    document.querySelector('.overlay').classList.remove("active");
    addTask();
})

document.querySelector("#completedTaskButton").addEventListener("click", () => {
    filterCompleted('complete');
})

document.querySelector("#incompletedTaskButton").addEventListener("click", () => {
    filterIncompleted('incomplete');
})

document.querySelector("#allTaskButton").addEventListener("click", () => {
    showTask(allTask);
});

document.querySelector("#deletedTaskButton").addEventListener("click", () => {
    // alert("Currently this feature is on Development stage.")
    filterDeleted("incomplete");
});


let selectArray = [];

function checkRemove(id) {
    var checkbox = document.querySelector(`.checkbox[data-id="${id}"]`);
    let deleteButton = document.querySelectorAll('.task-delete-btn');
    if (checkbox.checked == true) {
        if (!selectArray.includes(id)) {
            selectArray.push(id);
        }
    }
    else if (checkbox.checked == false) {
        const index = selectArray.indexOf(id);
        // console.log(id);
        if (index !== -1) {
            selectArray.splice(index, 1);
        }
    }
    console.log(selectArray)
    if (selectArray.length == 0) {
        document.querySelector(".operation-box").classList.remove('active');
        deleteButton.forEach(function (button) {
            button.classList.remove("active")
        });
    }
    else {
        document.querySelector(".operation-box").classList.add('active');
        deleteButton.forEach(function (button) {
            button.classList.add("active")
        });
    }
}

function deleteButton() {
    if (selectArray.length === 0) {
        alert("Please select a task to delete.");
        return;
    }

    // if (confirm("Are you sure you want to remove this task?")) {
    if (confirm("Are you sure you want to remove this task?")) {
        // Sort the array in descending order to avoid index issues
        selectArray.sort((a, b) => b - a);

        for (const index of selectArray) {
            if (index >= 0 && index < allTask.length) {
                const deletedTask = allTask.splice(index, 1)[0];
                trashItems.push[deletedTask];
                console.log(trashItems)
            }
        }
        saveTasksToLocalStorage();
        showTask(allTask);
        // console.log(allTask);
    } else {
        alert("Removal canceled.");
    }
    selectArray = [];
    document.querySelector('.operation-box').classList.remove("active");
}


getTasksFromLocalStorage();

// let taskBoxes = document.querySelectorAll(".task-box");
// taskBoxes.forEach((box) => {
//     box.addEventListener("dblclick", function () {
//         id = box.getAttribute("data-id");
//         fetchDetails(id);
//     })
// })


const hamburgerMenu = document.querySelector(".menu");
const closeHamburgerMenu = document.querySelector(".close-menu");
hamburgerMenu.addEventListener("click", function (event) {
    event.preventDefault();
    // hamburgerMenu.classList.toggle("active")
    hamburgerMenu.closest(".sidebar").classList.toggle("active");
    document.querySelector('.menu-overlay').classList.toggle("active");
});


function filterDeleted() {
    let deletedTask = trashItems.filter(function (el) {
        el.taskStatus == 'deleted';
    });
    displayLoader();
    showTask(deletedTask);
    alert("Currently this feature is on development stage.")
}

// let deleteTask = trashItems.map(function (el) {
//     return el.id
// })

// console.log(deleteTask)


document.addEventListener("DOMContentLoaded", function () {
    // Check if there are no tasks in local storage
    if (localStorage.getItem("tasks") === null || JSON.parse(localStorage.getItem("tasks")).length === 0) {
        // document.querySelector(".task-grid").innerHTML = `<div class="h2"><i class="fa-solid fa-face-meh"></i><div><h2>No tasks have been added yet</h2>`;
        // document.querySelector(".task-grid").classList.add("active");
        const tg = new tourguide.TourGuideClient({
            exitOnClickOutside: false
        })
        tg.start()  
    }
});