interface TodoItem {
  id: number;
  title: string;
  description: string;
}

export default class Todo {
    static idCounter = 1;
    todos: Array<TodoItem>;
    todoList: HTMLUListElement | null = null;

    constructor() {
      this.todos = [
        {
          id: 1,
          title: 'Todo1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius distinctio, ducimus sed quisquam quaerat, numquam reprehenderit nulla dolores eveniet qui tenetur laborum, ipsum blanditiis debitis accusamus? Quasi perspiciatis et repellat?'
        },
        {
          id: 2,
          title: 'Todo2',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius distinctio, ducimus sed quisquam quaerat, numquam reprehenderit nulla dolores eveniet qui tenetur laborum, ipsum blanditiis debitis accusamus? Quasi perspiciatis et repellat?'
        }
      ];

      // this.todoInput = document.querySelector("#todo-input");
      // this.addBtn = document.querySelector("#todo-add-btn");
      this.todoList = document.querySelector("#todo-list");

      // this.addBtn.addEventListener("click", () => this.addTodo());
      this.render();
    }

    // addTodo() {
    //   const description = this.todoInput.value;
    //   if (description) {
    //     this.todos.push({
    //       id: Todo.idCounter++,
    //       description,
    //     });

    //     this.todoInput.value = "";
    //     this.render();
    //   }
    // }

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
      if (this.todoList) {
        this.todoList.innerHTML = ""; // Clear the ul

        this.todos.forEach((todo) => {
          const li = document.createElement("li");
          li.innerHTML = `
        <h3>${todo.title}</h3>
        <span>${todo.description}</span>
        <div class="btns">
          <button class="btn-edit">Edit</button>
          <button class="btn-delete">Delete</button>
        </div>
      `;

          // Add event listeners to btns
          li.querySelector(".btn-edit")?.addEventListener("click", () =>
            this.editTodo(todo.id)
          );
          li.querySelector(".btn-delete")?.addEventListener("click", () =>
            this.deleteTodo(todo.id)
          );

          this.todoList?.appendChild(li);
        });
      }
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const app = new Todo();
  });
