<template>
    <main>
        <h1>Task Manager</h1>
        <HelloWorld />

        <div>
            <AddTask @task-added="refreshTasks" />
        </div>

        <div>
            <ListTasks ref="taskList" />
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import AddTask from './components/AddTask.vue'
import ListTasks from './components/ListTasks.vue'

const taskList = ref(null)

const refreshTasks = () => {
    if (taskList.value) {
        taskList.value.loadTasks()
    }
}
</script>

<style scoped>
main h1 {
    text-align: center;
}
</style>
