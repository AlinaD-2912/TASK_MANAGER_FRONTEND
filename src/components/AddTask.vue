<script setup>
import { api } from '@/services/api.js'
import {ref} from 'vue'

const title = ref("")
const message = ref("")

// onMounted(async () => {
//     const response = await api.addTask()
//     title.value = ref(response.data)
// })

const addTask = async () => {
  try {
    const response = await api.addTask({ description: title.value })
    message.value = `Tâche "${response.data.description}" ajoutée avec succès !`
  } catch (error) {
    message.value = "Erreur lors de l'ajout de la tâche."
  }
}


</script>

<template>
    <h2>Ajouter une tache</h2>
    
     <form @submit.prevent="addTask">
        <input type="text" v-model="title" placeholder="Entrez une nouvelle tâche">
        <button type="submit">Ajouter</button>
    </form>

    <p v-if="message">{{ message }}</p>
</template>

<style scoped></style>