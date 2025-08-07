<template>
  <div>
    <h1>Task Description Page</h1>

    <h2>{{ task.title }}</h2>
    <p>{{ task.description }}</p>
    <p>Status: {{ task.isDone ? 'Done' : 'Pending' }}</p>

    <button @click="showForm = true">Edit Task</button>

    <button @click="task.isDone = !task.isDone">
      {{ task.isDone ? 'Mark as Pending' : 'Mark as Done' }}
    </button>

    <button @click="$router.push({ name: 'Home' })">Back to Home</button>

    <!-- The Modal -->
    <div v-if="showForm" id="myModal" class="modal">
      <div class="modal-content">
        <button @click="showForm = false">&times;</button>
        <form class="task-form" @submit.prevent="updateTask">
          <input type="text" v-model="currentTask.title" :placeholder="task.title" />
          <textarea v-model="currentTask.description" :placeholder="task.description"></textarea>
          <button type="submit">Edit Task</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '../stores/task'

const route = useRoute()
const id = route.params.id
const taskStore = useTaskStore()
const showForm = ref(false)

const task = computed(() => taskStore.tasks.find((task) => task.id === parseInt(id)))

if (!task.value) {
  console.error(`Task with id ${id} not found`)
}

const currentTask = ref({
  title: task.value.title,
  description: task.value.description,
})

function updateTask() {
  taskStore.updateTask(task.value.id, currentTask.value)
  showForm.value = false
}
</script>

<style scoped>
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.task-form {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
</style>
