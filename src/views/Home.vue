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
  <div class="background">
    <div class="content">
      <h1>To-Do List</h1>

      <form class="task-form" @submit.prevent="addNewTask">
        <input type="text" v-model="newTask.title" placeholder="Task title" />
        <textarea v-model="newTask.description" placeholder="Task description"></textarea>
        <button type="submit">Add Task</button>
      </form>

      <div class="task-stats-container">
        <div class="task-stats">
          <p>Total tasks: {{ taskStore.taskCount }}</p>
          <p>Completed tasks: {{ taskStore.taskCount - taskStore.pendingTasks.length }}</p>
        </div>

        <button @click="hideCompleted = !hideCompleted">
          {{ hideCompleted ? 'Show Completed' : 'Hide Completed' }}
        </button>
      </div>

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
    </div>
  </div>
</template>

<style scoped>
.task-form {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
}

.task-form input,
.task-form textarea {
  margin-bottom: 0.5rem;
  border: 1px solid #fff;
  border-radius: 4px;
  resize: none;
  align-self: stretch;
  position: relative;
}

.task-form input {
  height: 1.8rem;
}

.task-form textarea {
  min-height: 8rem;
}

.task-form button {
  padding: 0.5rem;
  background-color: #00cdc7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 5rem;
}

ul li {
  margin-bottom: 3rem;
}

.background {
  width: 100%;
  position: absolute;
  background: linear-gradient(180deg, #0f36c9, #4f9eff 48.56%, #ccefff 84.13%, #fff);
  min-height: 100vh;
  box-sizing: border-box;
}

.content {
  position: relative;
  width: fit-content;
  min-width: 75%;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
