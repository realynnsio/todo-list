<script setup>
defineOptions({ name: 'TodoHome' })
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/task'

const taskStore = useTaskStore()
const hideCompleted = ref(false)
const newTask = ref({
  title: '',
  description: '',
})

const filteredTasks = computed(() => {
  return hideCompleted.value ? taskStore.pendingTasks : taskStore.tasks
})

function addNewTask() {
  taskStore.addTask(newTask.value)
  newTask.value = {
    title: '',
    description: '',
  }
}
</script>

<template>
  <h1>To-Do List</h1>
  <p>Total tasks: {{ taskStore.taskCount }}</p>
  <p>Pending tasks: {{ taskStore.pendingTasks.length }}</p>

  <form class="task-form" @submit.prevent="addNewTask">
    <input type="text" v-model="newTask.title" placeholder="Task title" />
    <textarea v-model="newTask.description" placeholder="Task description"></textarea>
    <button type="submit">Add Task</button>
  </form>

  <ul>
    <li v-for="task in filteredTasks" :key="task.id">
      <input type="checkbox" v-model="task.isDone" />
      <span>
        <router-link :to="{ name: 'TaskDescription', params: { id: task.id } }">
          {{ task.title }}
        </router-link>
        <p>{{ task.description }}</p>
      </span>
      <button @click="taskStore.deleteTask(task.id)">Delete</button>
    </li>
  </ul>

  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show Completed' : 'Hide Completed' }}
  </button>
</template>

<style scoped>
.task-form {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

ul li {
  margin-bottom: 3rem;
}
</style>
