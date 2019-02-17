let app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todos: JSON.parse(localStorage.getItem('todolist')) || [],
    edit: {},
    editContent: '',
    visibility: 'all'
  },
  methods: {
    addTodo(){
      let value = this.newTodo.trim();
      let timestamp = Date.now();
      if(!value){ return };
      this.todos.push({
        id: timestamp,
        content: value,
        completed: false
      });
      this.newTodo = '';
      localStorage.setItem('todolist', JSON.stringify(this.todos));
    },
    romoveTodo(item){
      let index = this.todos.findIndex(function(element){
        return item.id === element.id;
      })
      this.todos.splice(index, 1);
      localStorage.setItem('todolist', JSON.stringify(this.todos));
    },
    editTodo(item){
      this.edit = item;
      this.editContent = item.content;
    },
    cancelEdit(){
      this.edit = {};
    },
    doneEdit(item){
      item.content = this.editContent;
      this.editContent = '';
      this.edit = {};
      localStorage.setItem('todolist', JSON.stringify(this.todos));
    },
    clearAll(){
      this.todos = [];
      localStorage.setItem('todolist', JSON.stringify(this.todos));
    }
  },
  computed: {
    filterTodos(){
      if(this.visibility === 'all'){
        return this.todos;
      } else if(this.visibility === 'active'){
        let newTodos = [];
        this.todos.forEach(element => {
          if(!element.completed){
            newTodos.push(element);
          }
        });
        return newTodos;
      } else if(this.visibility === 'complete'){
        let newTodos = [];
        this.todos.forEach(element => {
          if(element.completed){
            newTodos.push(element);
          }
        });
        return newTodos;
      }
    }
  }
});