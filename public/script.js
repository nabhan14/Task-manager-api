const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

const API_URL = "/api/tasks";

// Fetch and display tasks
async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.title} - ${task.completed ? "✅" : "❌"}</span>
      <button onclick="deleteTask('${task._id}')">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Add new task
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  });

  taskForm.reset();
  fetchTasks();
});

// Delete task
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTasks();
}

// Initial load
fetchTasks();