<template>
  <main>
    <!-- Heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="logo" />
      <h1>Pinia Tasks</h1>
    </header>
    <!-- new tak form -->
    <div class="new-task-form">
      <TaskForm />
    </div>
    <!-- Filter -->
    <nav class="filter">
      <button @click="filter= 'all'">All tasks</button>
      <button @click="filter= 'favs'">Fav tasks</button>
    </nav>
    <!-- task list  -->
    <div v-if="filter=== 'all'" class="task-list">
      <p>You have {{taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks">
        <TaskDetails :task="task"/>
      </div>
    </div>
    <div v-if="filter=== 'favs'" class="task-list">
      <p>You have {{taskStore.favCount }} favs left to do</p>
      <div v-for="task in taskStore.favs">
        <TaskDetails :task="task"/>
      </div>
    </div>
  </main>
</template>

<script>
import { useTaskStore } from "./stores/TaskStore";
import TaskDetails from './components/TaskDetails.vue'
import { ref } from "vue";
import TaskForm from "./components/TaskForm.vue";

export default {
  components: {
    TaskDetails,
    TaskForm
},
  setup() {
    const taskStore = useTaskStore();

    const filter = ref('all')

    return { taskStore, filter };
  },
};
</script>
