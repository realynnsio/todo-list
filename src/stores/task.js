import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])

  let nextId = 1

  const taskCount = computed(() => tasks.value.length)
  const pendingTasks = computed(() => tasks.value.filter((task) => !task.isDone))

  function addTask(task) {
    tasks.value.push({ ...task, id: nextId++, isDone: false })
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  return {
    tasks,
    taskCount,
    pendingTasks,
    addTask,
    deleteTask,
  }
})
