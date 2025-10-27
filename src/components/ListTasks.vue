<template>
    <div>
        <h2>Liste des tâches</h2>

        <p v-if="loading">Chargement...</p>
        <p v-else-if="error">{{ error }}</p>

        <table v-else>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <th>Etat</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in tasks" :key="task.id">
                    <td>{{ task.id }}</td>
                    <td>{{ task.description }}</td>
                    <td>{{ task.status }}</td>
                    <td>
                        <button>Terminer</button>
                        <button>Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { api } from '@/services/api.js'

export default {
    name: 'ListTasks',

    data() {
        return {
            tasks: [], // tasks recived from api
            loading: true,
            error: null, // store error message
        }
    },

    async mounted() {
        try {
            const response = await api.getTasks()
            this.tasks = response.data
        } catch (err) {
            console.error(err)
            this.error = 'Impossible de charger les tâches'
        } finally {
            this.loading = false
        }
    },
}
</script>

<style scoped>
div h2 {
    text-align: center;
    margin-top: 25px;
}

div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>
