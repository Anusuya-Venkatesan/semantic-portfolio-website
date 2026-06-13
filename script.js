let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(currentFilter === "active"){
            return !task.completed;
        }

        if(currentFilter === "completed"){
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <div>
                <button class="toggle-btn"
                    data-id="${task.id}">
                    ✓
                </button>

                <button class="edit-btn"
                    data-id="${task.id}">
                    Edit
                </button>

                <button class="delete-btn"
                    data-id="${task.id}">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

taskList.addEventListener("click", (e) => {

    const id = Number(
        e.target.dataset.id
    );

    if(e.target.classList.contains("delete-btn")){

        tasks = tasks.filter(
            task => task.id !== id
        );
    }

    if(e.target.classList.contains("toggle-btn")){

        tasks = tasks.map(task => {

            if(task.id === id){
                task.completed =
                !task.completed;
            }

            return task;
        });
    }

    if(e.target.classList.contains("edit-btn")){

        const newText = prompt(
            "Edit Task"
        );

        if(newText){

            tasks = tasks.map(task => {

                if(task.id === id){
                    task.text = newText;
                }

                return task;
            });
        }
    }

    saveTasks();
    renderTasks();
});

document
.querySelectorAll("[data-filter]")
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            currentFilter =
            button.dataset.filter;

            renderTasks();
        }
    );
});

renderTasks();
