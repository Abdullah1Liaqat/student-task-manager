const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-description");
const list = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");
let query = "";

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";
  const visible = tasks.filter((t) =>
    (t.title + " " + t.description).toLowerCase().includes(query)
  );
  visible.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " done" : "");

    const info = document.createElement("div");
    info.className = "task-info";
    const h3 = document.createElement("h3");
    h3.textContent = task.title;
    const p = document.createElement("p");
    p.textContent = task.description;
    info.append(h3, p);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const doneBtn = document.createElement("button");
    doneBtn.textContent = task.done ? "Undo" : "Complete";
    doneBtn.className = "btn-complete";
    doneBtn.addEventListener("click", () => {
      task.done = !task.done;
      save();
      render();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "btn-delete";
    delBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      save();
      render();
    });

    actions.append(doneBtn, delBtn);
    li.append(info, actions);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;
  tasks.push({
    id: Date.now(),
    title,
    description: descInput.value.trim(),
    done: false,
  });
  save();
  form.reset();
  render();
});

searchInput.addEventListener("input", (e) => {
  query = e.target.value.trim().toLowerCase();
  render();
});

render();
