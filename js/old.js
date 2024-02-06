let taskInput = document.querySelector("#taskName");
let taskDate = document.querySelector("#taskDate");
let taskTime = document.querySelector("#taskTime")
let taskForm = document.querySelector("#taskForm");
let loaderBox = document.querySelector("table-wrap");
let deleteBtn = document.querySelector(".delete-btn");
let deleteAllBtn = document.querySelector(".delete-all-btn");
let unique = NaN;
let modalPopupParagraph = document.querySelector(".common-modal p");
let commonModal = document.querySelector(".overlay");
let tableRow = document.querySelectorAll(".tr");
let taskDescription = document.querySelector("#taskDescription");
const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function displayModal(message) {
    modalPopupParagraph.innerHTML = message;
    deleteAllBtn.addEventListener("click", function () {
        document.querySelector('.overlay').classList.toggle("active");
    });
}


function addTask() {
    let taskInputValue = taskInput.value;
    let taskDateObj = new Date(taskDate.value)
    let taskDayValue = day[taskDateObj.getDay()];
    let taskDateValue = taskDateObj.getDate();
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
            fullDate: `${taskDayValue} ${taskDateValue} ${month[taskDateObj.getMonth()]}, ${taskDateObj.getFullYear()}`,
            day: taskDayValue,
            date: taskDateValue,
            month: month[taskDateObj.getMonth()],
            year: taskDateObj.getFullYear()
        }
    }


    allTask.push(taskObj);
    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
    showTask(allTask);
    console.log(allTask);

}


function showTask(array) {
    // let display = "";
    // array.forEach(function (el, id) {
    //     display += `<tr data-id="${id}" class="tr"><td><input type="checkbox" data-id="${id}" onclick="checkRemove(${id})" class="checkbox"></td><td>${el.taskName}</td><td>${el.taskDate.date}</td><td>${el.taskStatus}</td><td><button onclick="removeTask(${id})" class="btn delete-btn">Remove</button><button onclick="completedTask(${id})" class="btn complete-btn">Completed</button></td></tr>`;
    // });
    // displayLoader();
    // document.querySelector("#tbody").innerHTML = display;

    let display1 = "";
    array.forEach(function (el, id) {
        display1 += `<div class="task-box">
        <div class="flex">
            <div class="task-box-info">
            <h3>${el.taskName}</h3>  
            <p>${el.taskDate.fullDate}</p>
            <p class="task-status">${(el.taskStatus == "Completed") ? "Done" : "Pending"}</p>
            </div>
            <div class="action-box">
                <input type="checkbox" data-id="${id}" onclick="checkRemove(${id})" class="checkbox">
                <button onclick="fetchDetails(${el.id})" class="get-details">
                    <img src="img/right-up.png" alt="">
                </button>
            </div>
        </div>
    </div>`;
    });
    document.querySelector(".task-grid").innerHTML = display1;

    if (allTask.length == 0) {
        document.querySelector(".task-grid").innerHTML = `<h2>No Task Added Yet</td></h2>`;
    }

    let taskStatusElement = document.querySelector(".task-status");

    if (taskStatusElement.innerText == "Done") {
        taskStatusElement.style.color = "#0174BE";
    }

}


function removeTask(id) {
    allTask.splice(id, 1);
    showTask(allTask);
}


function filterCompleted() {
    let completed = allTask.filter(function (el) {
        return el.taskStatus == "Completed";
    });
    displayLoader();
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
    allTask[id].taskStatus = "Completed";
    showTask(allTask);
}


function displayLoader() {
    var myElement = document.querySelector(".loader-wrap");
    myElement.classList.add('active');
    setTimeout(function () {
        myElement.classList.remove('active');
    }, 300);
}


let selectArray = [];
function checkRemove(id) {
    console.log(id)
    var checkbox = document.querySelector(`.checkbox[data-id="${id}"]`);
    console.log(id)
    // unique = id;
    if (checkbox.checked == true) {
        if (!selectArray.includes(id)) {
            selectArray.push(id);
            // alert("checked")
            // alert(id)
        }
    }
    else if (checkbox.checked == false) {
        const index = selectArray.indexOf(id);
        console.log(id);
        if (index !== -1) {
            selectArray.splice(index, 1);
        }
    }
    console.log(selectArray)
    if (selectArray.length == 0) {
        document.querySelector(".operation-box").classList.remove('active');
    }
    else {
        document.querySelector(".operation-box").classList.add('active');
    }
}


function deleteButton() {
    if (selectArray.length === 0) {
        alert("Please select a task to delete.");
        return;
    }

    if (confirm("Are you sure you want to remove this task?")) {
        // Sort the array in descending order to avoid index issues
        selectArray.sort((a, b) => b - a);

        for (const index of selectArray) {
            if (index >= 0 && index < allTask.length) {
                allTask.splice(index, 1);
            }
        }

        showTask(allTask);
        console.log(allTask);
    } else {
        alert("Removal canceled.");
    }

    selectArray = [];
    document.querySelector('.operation-box').classList.remove("active");
}


function deleteAll() {
    if (allTask.length !== 0) {
        if (confirm("Are you sure you want to delete all task ?") == true) {
            checkBoxes = document.querySelectorAll('.checkbox');
            checkBoxes.forEach(checkbox => {
                checkbox.checked = true;
            });
            allTask.splice(0, allTask.length);
            setTimeout(function () {
                showTask(allTask);
                if (allTask.length == 0) {
                    document.querySelector("#tbody").innerHTML = `<tr><td colspan="5">No Task Added Yet</td></tr>`;
                }
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


showTask(allTask);


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


function fetchDetails(id) {
    document.querySelector('.task-expand').classList.add("active");
    document.querySelector('.overlay').classList.add("active");
    document.querySelector('.task-expand h2').innerText = allTask[id].taskName;
    document.querySelector('#task-day').innerText = allTask[id].taskDate.day;
    document.querySelector('#task-description').value = allTask[id].taskDescription;
    document.querySelector('#task-date').innerText = `${(allTask[id].taskDate.month).slice(0, 3)} ${allTask[id].taskDate.date}, ${allTask[id].taskDate.year}`;
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




// TASK BOX UI 
/* <!-- <div class="task-box" data-id="${id}">
                                <div class="flex">
                                    <div class="action-box">
                                        <input type="checkbox" class="checkbox" onclick="checkRemove(${id})"
                                            data-id="${id}">
                                    </div>
                                    <div class="task-box-info">
                                        <h3>${el.taskName}</h3>
                                        <p>${el.taskDate.fullDate}</p>
                                    <p class="task-status ${(el.taskStatus == " Completed") ? 'completed' : 'pending'
                                        }">${(el.taskStatus == "Completed") ? "Done" : "Pending"}</p>
                                    </div>
                                    <div class="action-box-end">
                                        <div class="mb-50">
                                            <button class="task-completed-btn">
                                                <i class="fa-solid fa-check"></i>
                                            </button>
                                            <button class="task-delete-btn" onclick="removeTask(id)">
                                                <i class="fa-solid fa-trash-can"></i>
                                            </button>
                                        </div>
                                        <button class="get-details" onclick="fetchDetails(${el.id})">
                                            <i class="fa-solid fa-pencil"></i><span class="txt">Edit</span>
                                        </button>
                                    </div>
                                </div>
                            </div> -->
                            <!-- <div class="task-box">
                                <div class="flex">
                                    <div class="task-box-info">
                                        <h3>Task Name</h3>
                                        <p>Tuesday 20th December 2023</p>
                                    </div>
                                    <button>
                                        <img src="img/right-up.png" alt="">
                                    </button>
                                </div>
                            </div> -->*/