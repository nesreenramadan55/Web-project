document.getElementById("toggleThemeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
  document.getElementById("addTaskBtn").addEventListener("click", addTask);
const taskList = document.getElementById("taskList");

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.classList.add("task");

  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  li.querySelector(".delete-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    li.classList.add("fade-out");
    setTimeout(() => {
      li.remove();
      checkEmptyMessage();
    }, 300);
  });


  taskList.appendChild(li);
  input.value = "";
}

document.querySelectorAll(".filters button").forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    filterTasks(filter);
  });
});

function filterTasks(filter) {
  const tasks = document.querySelectorAll("#taskList .task");
  tasks.forEach(task => {
    switch (filter) {
      case "all":
        task.style.display = "flex";
        break;
      case "completed":
        task.style.display = task.classList.contains("completed") ? "flex" : "none";
        break;
      case "pending":
        task.style.display = !task.classList.contains("completed") ? "flex" : "none";
        break;
    }
  });
}