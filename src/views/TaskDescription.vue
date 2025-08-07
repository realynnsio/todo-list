<template>
  <div>
    <h1>Task Description Page</h1>

    <h2>{{ task.title }}</h2>
    <p>{{ task.description }}</p>
    <p>Status: {{ task.isDone ? 'Done' : 'Pending' }}</p>

    <button @click="task.isDone = !task.isDone">
      {{ task.isDone ? 'Mark as Pending' : 'Mark as Done' }}
    </button>

    <button @click="$router.push({ name: 'Home' })">Back to Home</button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useTaskStore } from '../stores/task'

const route = useRoute()
const id = route.params.id
const taskStore = useTaskStore()

const task = taskStore.tasks.find((task) => task.id === parseInt(id))
if (!task) {
  console.error(`Task with id ${id} not found`)
}
</script>
