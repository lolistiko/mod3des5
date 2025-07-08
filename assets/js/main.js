const inputTodo = document.getElementById("inputTodo");
const btnAdd = document.querySelector(".btn-add");
const tableTodo = document.getElementById("tableTodo");
const tbody = tableTodo.querySelector("tbody");

let lastCorrelativeID = 3;

const todoList = [
  {
    id: 1,
    dataId: Date.now() + 1,
    name: "Hacer la cama",
    completed: false,
  },
  {
    id: 2,
    dataId: Date.now() + 2,
    name: "Aseo personal",
    completed: false,
  },
  {
    id: 3,
    dataId: Date.now() + 3,
    name: "Preparar el desayuno",
    completed: false,
  },
];

const generateTemplateTodo = (todo) => {
  return `
        <tr data-id="${todo.dataId}">
            <td>${todo.id}</td>
            <td class="${todo.completed ? "completed" : ""}">${todo.name}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="form-check me-3">
                        <input
                            id="task${todo.id}"
                            class="form-check-input todo-completed"
                            type="checkbox"
                            ${todo.completed ? "checked" : ""}
                        />
                    </div>
                    <button class="btn btn-remove">
                        <i class="fa-solid fa-trash btn"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
};
const updateDetails = () => {
  const totalTodosSpan = document.getElementById("totalTodos");
  const completedTodosSpan = document.getElementById("completedTodos");

  totalTodosSpan.innerHTML = todoList.length;
  completedTodosSpan.innerHTML = todoList.filter(
    (todo) => todo.completed
  ).length;
};

const generateAllTodos = () => {
  tbody.innerHTML = "";
  todoList.forEach((todo) => (tbody.innerHTML += generateTemplateTodo(todo)));
  updateDetails();
};

generateAllTodos();

console.log(todoList);

const addTodo = (todo) => {
  const todoObj = {
    id: ++lastCorrelativeID,
    dataId: Date.now(),
    name: todo,
    completed: false,
  };
  todoList.push(todoObj);
  tbody.innerHTML += generateTemplateTodo(todoObj);
  inputTodo.value = "";
  updateDetails();
};

const deleteTodo = (tr) => {
  const todoID = parseInt(tr.dataset.id);
  const todoIndex = todoList.findIndex((todo) => todo.dataId === todoID);

  if (todoIndex === -1) {
    alert("Sin datos");
    return;
  }

  todoList.splice(todoIndex, 1);
  tr.remove();
  generateAllTodos();
  updateDetails();
};

const completedTodo = (tr, checkCompleted) => {
  const todoID = parseInt(tr.dataset.id);

  const todoIndex = todoList.findIndex((todo) => todo.dataId === todoID);

  if (todoIndex === -1) {
    alert("Sin datos");
    return;
  }

  const tdNameTodo = tr.querySelector("td:nth-child(2)"); // td:nth-child(2) accedemos al segundo td
  todoList[todoIndex].completed = checkCompleted;
  tdNameTodo.classList.toggle("completed");
  updateDetails();
};

btnAdd.addEventListener("click", (event) => {
  const todo = inputTodo.value.trim();

  if (todo.length === 0) {
    alert("Ingresa una tarea");
    return;
  }

  return addTodo(todo);
});

tbody.addEventListener("click", (event) => {
  const trTodo = event.target.closest("tr");
  const btnRemove = event.target.closest(".btn-remove");
  const checkboxCompleted = event.target.closest(".todo-completed");

  if (btnRemove) return deleteTodo(trTodo);

  if (checkboxCompleted)
    return completedTodo(trTodo, checkboxCompleted.checked);
});
