<template>
  <v-layout
    column
    class="-x-view -x-view-content"
    fill-height
  >
    <v-layout
      v-if="processing"
      justify-center
      align-center
      column
      fill-height>
      <v-progress-circular
        :size="50"
        :width="2"
        color="secondary"
        indeterminate
      />
      <h2 class="mt-4 text-primary text-uppercase fw-100">Loading</h2>
    </v-layout>

    <v-layout
      v-if="!processing && this.$data.todos && !this.$data.todos.length"
      justify-center
      align-center
      column
      fill-height>

      <h2 class="mt-4 text-primary fw-100" >No data was provided.</h2>

      <v-btn
        outline
        i-flat
        color="primary"
        class="mt-2"
        @click="fetchTodoSet()">
        <span class="mr-2">Re-load</span>
        <v-icon>refresh</v-icon>
      </v-btn>

    </v-layout>

    <div v-if="!processing && this.$data.todos && this.$data.todos.length">
      <v-card
        v-for="todo in todos"
        :key="todo.id"
        class="mb-2">
        <v-card-title>
          <v-checkbox
            v-model="todo.done"
            :label="todo.label"
            :value="todo.done"
            color="primary"
          />
          <v-spacer/>
          <v-btn icon>
            <v-icon
              color="error"
              @click="removeTodo(todo)">delete</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon
              color="primary"
              @click="editTodo(todo)">edit</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </div>

    <v-btn
      fab
      class="fab-bottom"
      color="accent">
      <v-icon dark>add</v-icon>
    </v-btn>

  </v-layout>
</template>

<script>
const MODULE = 'Todo';

export default {
  name: 'TodoListView',

  data: () => ({
    todos: null,
  }),

  computed: {
    processing() {
      return this.$store.state.processingByTopic[`${MODULE}.fetchData`] || false;
    },
  },

  mounted() {
    this.fetchTodoSet();
  },

  methods: {
    fetchTodoSet() {
      this.$store
        .dispatch('$fetchData')
        .then((response) => {
          this.$data.todos = response;
          // this.$data.todos = [];
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editTodo(todo) {
      alert('editing...');
    },

    removeTodo(todo) {
      const todos = this.$data.todos;
      todos.splice(todos.indexOf(todo), 1);

      // this.$store
      //   .dispatch('$removeData', todo.id)
      //   .then((response) => {
      //     const todos = this.$data.todos;
      //     todos.splice(todos.indexOf(todo), 1);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },
  },
};
</script>
