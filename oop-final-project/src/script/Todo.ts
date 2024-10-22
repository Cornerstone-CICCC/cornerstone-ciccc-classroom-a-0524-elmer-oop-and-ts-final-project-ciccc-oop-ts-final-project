export interface ITodoItem {
  id: number;
  title: string;
  description: string;
  status: string; // "todo", "inProgress", "done"
}

export default class Todo {
    static idCounter = 1;
    todos: Array<ITodoItem>;
    addBtn: HTMLButtonElement | null = null;
    todoList: HTMLUListElement | null = null;
    titleInput: HTMLInputElement | null = null;
    descriptionInput: HTMLInputElement | null = null;

    constructor() {
      this.todos = [
        {
          id: 1,
          title: 'Todo1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius distinctio, ducimus sed quisquam quaerat, numquam reprehenderit nulla dolores eveniet qui tenetur laborum, ipsum blanditiis debitis accusamus? Quasi perspiciatis et repellat?',
          status: 'todo'
        },
        {
          id: 2,
          title: 'Todo2',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius distinctio, ducimus sed quisquam quaerat, numquam reprehenderit nulla dolores eveniet qui tenetur laborum, ipsum blanditiis debitis accusamus? Quasi perspiciatis et repellat?',
          status: 'inProgress'
        },
        {
          id: 3,
          title: 'Todo3',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius distinctio, ducimus sed quisquam quaerat, numquam reprehenderit nulla dolores eveniet qui tenetur laborum, ipsum blanditiis debitis accusamus? Quasi perspiciatis et repellat?',
          status: 'done'
        }
      ];

      this.titleInput = document.querySelector("#title-input");
      this.descriptionInput = document.querySelector("#description-input");
      this.addBtn = document.querySelector("#todo-add-btn");

      // this.todoList = document.querySelector("#todo-list");

      this.addBtn?.addEventListener("click", () => this.addTodo());
      this.render();
    }

    addTodo() {
      const title = this.titleInput?.value;
      const description = this.descriptionInput?.value;
      if (title && description) {
        this.todos.push({
          id: Todo.idCounter++,
          title,
          description,
          status: 'todo'
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

  render() {
      const todos = this.todos.filter((todo) => todo.status === 'todo');
      const inProgress = this.todos.filter((todo) => todo.status === 'inProgress');
      const done = this.todos.filter((todo) => todo.status === 'done');

      const todoContainer: HTMLElement | null = document.querySelector("#todo-container");
      const inProgressContainer: HTMLElement | null = document.querySelector("#in-progress-container");
      const doneContainer: HTMLElement | null = document.querySelector("#done-container");

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

    renderStatusSection(container: HTMLElement, items: Array<ITodoItem>, title: string) {
      const sectionTitle = document.createElement("h3");
      sectionTitle.textContent = title;
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
        li.querySelector(".btn-edit")?.addEventListener("click", () =>
          this.editTodo(todo.id)
        );
        li.querySelector(".btn-delete")?.addEventListener("click", () =>
          this.deleteTodo(todo.id)
        );

        container.appendChild(li);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const app = new Todo();
  });
