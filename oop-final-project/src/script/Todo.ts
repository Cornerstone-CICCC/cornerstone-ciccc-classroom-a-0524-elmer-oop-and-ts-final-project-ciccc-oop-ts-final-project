export interface ITodoItem {
  id: number;
  title: string;
  description: string;
  status: string; // "todo", "inProgress", "done"
}

export default class Todo {
  static idCounter = 1;
  static filterLetter = "";
  todos: Array<ITodoItem>;
  addBtn: HTMLButtonElement | null = null;
  todoList: HTMLUListElement | null = null;
  titleInput: HTMLInputElement | null = null;
  descriptionInput: HTMLInputElement | null = null;
  searchbar: HTMLInputElement | null = null;
  createModalContainer: HTMLDivElement | null = null;
  modalBtn: HTMLButtonElement | null = null;

  constructor() {
    this.todos = [
      {
        id: 1,
        title: "Todo1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius distinctio, ducimus sed quisquam quaerat, numquam reprehenderit nulla dolores eveniet qui tenetur laborum, ipsum blanditiis debitis accusamus? Quasi perspiciatis et repellat?",
        status: "todo",
      },
      {
        id: 2,
        title: "Todo2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius distinctio, ducimus sed quisquam quaerat, numquam reprehenderit nulla dolores eveniet qui tenetur laborum, ipsum blanditiis debitis accusamus? Quasi perspiciatis et repellat?",
        status: "inProgress",
      },
      {
        id: 3,
        title: "Todo3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius distinctio, ducimus sed quisquam quaerat, numquam reprehenderit nulla dolores eveniet qui tenetur laborum, ipsum blanditiis debitis accusamus? Quasi perspiciatis et repellat?",
        status: "done",
      },
    ];

    this.addBtn = document.querySelector("#todo-add-btn");
    this.searchbar = document.querySelector("#search-input");
    this.modalBtn = document.querySelector(".modal_btn");
    this.createModalContainer = document.querySelector(
      "#createModal-container"
    );

    // this.todoList = document.querySelector("#todo-list");

    this.searchbar?.addEventListener("keyup", () => this.updateFilterLetter());
    this.render();
  }

  addTodo(status: any) {
    this.titleInput = document.querySelector("#title-input");
    this.descriptionInput = document.querySelector("#description-input");
    const title = this.titleInput?.value;
    const description = this.descriptionInput?.value;
    if (title && description) {
      this.todos.push({
        id: Todo.idCounter++,
        title,
        description,
        status,
      });

      if (this.titleInput) this.titleInput.value = "";
      if (this.descriptionInput) this.descriptionInput.value = "";
      this.render();
    }
  }

  editTodo(id: number) {
    // Fetch one object where todo id = id
    const todoToEdit = this.todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      const newDescription = prompt("Edit To-Do: ", todoToEdit.description);
      if (newDescription) {
        todoToEdit.description = newDescription;
        this.render();
      }
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id != id);
    this.render();
  }

  updateFilterLetter() {
    if (this.searchbar) {
      Todo.filterLetter = this.searchbar.value.toLowerCase();
      this.render();
    }
  }

  openCreateModal(title: string) {
    if (this.createModalContainer) {
      const createModalElement = document.createElement("div");
      createModalElement.classList.add("modal_background");
      createModalElement.innerHTML = `
        <div class="createModal-description">
            <div class="create_modal">
                <input type="text" name="title" id="title-input" />
                <input type="text" name="description" id="description-input" />
                <button id="todo-add-btn" class="${title}">Add To Do</button>
            </div>
        </div>
      `;
      const status = createModalElement
        .querySelector("#todo-add-btn")
        ?.getAttribute("class");
      let camelStatus = "";
      if (status === "To-Do") {
        camelStatus = "todo";
      } else if (status === "In Progress") {
        camelStatus = "inProgress";
      } else {
        camelStatus = "done";
      }
      createModalElement
        .querySelector("#todo-add-btn")
        ?.addEventListener("click", () => this.addTodo(camelStatus));
      this.createModalContainer.appendChild(createModalElement);
    }
  }

  render() {
    const filteredTodos = this.todos.filter((todo) =>
      Todo.filterLetter
        ? todo.title.toLowerCase().includes(Todo.filterLetter)
        : true
    );

    const todos = filteredTodos.filter((todo) => todo.status === "todo");
    const inProgress = filteredTodos.filter(
      (todo) => todo.status === "inProgress"
    );
    const done = filteredTodos.filter((todo) => todo.status === "done");

    const todoContainer: HTMLElement | null =
      document.querySelector("#todo-container");
    const inProgressContainer: HTMLElement | null = document.querySelector(
      "#in-progress-container"
    );
    const doneContainer: HTMLElement | null =
      document.querySelector("#done-container");

    if (todoContainer) {
      todoContainer.innerHTML = ""; // Clear the container
      this.renderStatusSection(todoContainer, todos, "To-Do");
    }
    if (inProgressContainer) {
      inProgressContainer.innerHTML = ""; // Clear the container
      this.renderStatusSection(inProgressContainer, inProgress, "In Progress");
    }
    if (doneContainer) {
      doneContainer.innerHTML = ""; // Clear the container
      this.renderStatusSection(doneContainer, done, "Done");
    }
  }

  renderStatusSection(
    container: HTMLElement,
    items: Array<ITodoItem>,
    title: string
  ) {
    const sectionTitle = document.createElement("h3");
    sectionTitle.innerHTML = `
    <div class="status_header">
      <h3>${title}</h3>
      <button class="modal_btn">+</button>
    </div>
    `;
    sectionTitle
      .querySelector(".modal_btn")
      ?.addEventListener("click", () => this.openCreateModal(title));
    container.appendChild(sectionTitle);

    items.forEach((todo) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <h3>${todo.title}</h3>
        <span>${todo.description}</span>
        <div class="btns">
          <button class="btn-edit">Edit</button>
          <button class="btn-delete">Delete</button>
        </div>
      `;

      // Add event listeners for edit and delete buttons
      li
        .querySelector(".btn-edit")
        ?.addEventListener("click", () => this.editTodo(todo.id));
      li
        .querySelector(".btn-delete")
        ?.addEventListener("click", () => this.deleteTodo(todo.id));

      container.appendChild(li);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new Todo();
});
