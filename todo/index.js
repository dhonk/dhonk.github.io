const dateInput = document.getElementById("date");
const taskInput = document.getElementById("task");
const statusInput = document.getElementById("status");

const incompleteTable = document.getElementById("items");
const completedTable = document.getElementById("doneitems");

let taskId = 0;

class Task {
    constructor(taskDate, taskName, taskStatus) {
        this.taskDate = taskDate;
        this.taskName = taskName;
        this.taskStatus = taskStatus;
        this.taskId = taskId;
        taskId++;
    }
}

let incompleteTasks = [];
let completeTasks = [];

// Format using 'en-US' locale
const formattedDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1; // getMonth() is zero-based (0=Jan, 11=Dec)
    const year = date.getFullYear();

    // Add leading zero if day or month is a single digit
    if (day < 10) {
        day = `0${day}`;
    }
    if (month < 10) {
        month = `0${month}`;
    }

    return `${year}-${month}-${day}`;
}

document.addEventListener('keydown', (event) => {
    const keyname = event.key;
    if (keyname === "Enter") {
        if (addItem()) {
            debugCheck();
            dateInput.value = "";
            taskInput.value = "";
            statusInput.checked = false;
        }
    }
})

const addItem = () => {
    let currDate = dateInput.value;
    let currTask = taskInput.value;
    let currStatus = statusInput.checked;
    
    if (currTask === "") {
        return false;
    }

    if (currDate === "") {
        let tdy = new Date()
        currDate = formattedDate(tdy);
    } 

    let newTask = new Task(currDate, currTask, currStatus);

    if (currStatus) {
        completeTasks.push(newTask);
        addNewToTable(newTask, completedTable);
    } else {
        incompleteTasks.push(newTask);
        addNewToTable(newTask, incompleteTable);
    }

    save();
    return true;
}

const addNewToTable = (task, table) => {
    const newTaskRow = document.createElement('tr');
    const newTaskDate = document.createElement('td');
    const newTaskName = document.createElement('td');
    const newTaskStatus = document.createElement('td');

    const newDateInput = document.createElement('input');
    newDateInput.type = 'date';
    newDateInput.name = 'date';
    newDateInput.value = task.taskDate;
    newDateInput.id = `date_${task.taskId}`;

    const newNameInput = document.createElement('input');
    newNameInput.type = 'text';
    newNameInput.name = 'task';
    newNameInput.value = task.taskName;
    newNameInput.id = `task_${task.taskId}`;

    const newStatusInput = document.createElement('input');
    newStatusInput.type = 'checkbox';
    newStatusInput.name = 'status';
    newStatusInput.checked = task.taskStatus;
    newStatusInput.id = `status_${task.taskId}`;

    if (newStatusInput.checked) {
        newDateInput.className = 'complete';
        newNameInput.className = 'complete';
        newStatusInput.className = 'complete';
    } else {
        newDateInput.className = 'incomplete';
        newNameInput.className = 'incomplete';
        newStatusInput.className = 'incomplete';
    }

    table.appendChild(newTaskRow);
    newTaskRow.appendChild(newTaskDate);
    newTaskRow.appendChild(newTaskName);
    newTaskRow.appendChild(newTaskStatus);

    newTaskDate.appendChild(newDateInput);
    newTaskName.appendChild(newNameInput);
    newTaskStatus.appendChild(newStatusInput);
}

const updateTable = (arr, table) => {
    table.replaceChildren();
    for (let i=0; i<arr.length; i++) {
        addNewToTable(arr[i], table);
    }
}

// Moving between tables
const statusUpdate = (e) => {
    const changedId = Number(e.target.id.slice(7));
    let task = incompleteTasks.find(e => e.taskId == changedId);
    let idx = incompleteTasks.indexOf(task);

    console.log(task);
    if (task == null) {
        task = completeTasks.find(e => e.taskId == changedId);
        idx = completeTasks.indexOf(task); 
    }

    task.taskStatus = !(task.taskStatus);

    if (task.taskStatus) {
        incompleteTasks.splice(idx, 1);
        completeTasks.push(task);
    } else {
        completeTasks.splice(idx, 1);
        incompleteTasks.push(task);
    }

    console.log('Change Detected: ' + e.target.id + ' aka ' + changedId);
    taskLogger(task);

    updateTable(incompleteTasks, incompleteTable);
    updateTable(completeTasks, completedTable);

    save();
}

incompleteTable.addEventListener('change', statusUpdate);
completedTable.addEventListener('change', statusUpdate);


// Load/save from localStorage
const save = () => {
    localStorage.setItem('incomplete', JSON.stringify(incompleteTasks));
    localStorage.setItem('complete', JSON.stringify(completeTasks));
    localStorage.setItem('taskId', taskId)
}

const load = () => {
    try {        
        const incomplete = localStorage.getItem('incomplete');
        const complete = localStorage.getItem('complete');
        taskId = Number(localStorage.getItem('taskId'));
        
        if (incomplete != null) {
            incompleteTasks = JSON.parse(incomplete);
        }

        if (complete != null) {        
            completeTasks = JSON.parse(complete);   
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
    
    updateTable(incompleteTasks, incompleteTable);
    updateTable(completeTasks, completedTable);
}

document.addEventListener('DOMContentLoaded', load);

const debugCheck = () => {
    for (let i=0; i<incompleteTasks.length; i++) {
        let temp = incompleteTasks[i];
        taskLogger(temp);
    }
}

const taskLogger = (task) => {
    console.log("Id: " + task.taskId + " Task: " + task.taskName + " Date: " + task.taskDate + " Status: " + task.taskStatus);
}