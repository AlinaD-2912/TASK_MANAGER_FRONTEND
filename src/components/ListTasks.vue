<script setup>
import { api } from '@/services/api.js'
import {onMounted, ref} from 'vue'

const tasks = ref([]) 
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
    try {
        const response = await api.getTasks()
        tasks.value = response.data
    } catch (error) {
        console.log(error)
        error.value = "Impossible de charger les tâches"
    } finally {
        loading.value = false
    }
})


</script>

<template>
    <h2>Liste des tâches</h2>

    <p v-if="loading">Chargement...</p>
    <p v-else-if="error">{{ error }}</p>


    <table v-else>
      <thead>
        <tr>
          <th>Titre</th>
          <th>Statut</th>
        </tr>
      </thead>
    <tbody>
        <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.description }}</td>
            <td>{{ task.status }}</td>
        </tr>
    </tbody>

    </table>

</template>

<style scoped></style>
