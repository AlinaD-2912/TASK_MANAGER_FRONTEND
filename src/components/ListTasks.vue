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
                        <button
                            @click="completeTask(task.id)"
                            :disabled="task.status === 'terminé'"
                        >
                            Terminer
                        </button>
                        <button @click="deleteTask(task.id)">Supprimer</button>
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
            tasks: [],
            loading: true,
            error: null,
        }
    },

    methods: {
        async loadTasks() {
            try {
                this.loading = true
                const response = await api.getTasks()
                this.tasks = response.data
                this.error = null
            } catch (err) {
                console.error(err)
                this.error = 'Impossible de charger les tâches'
            } finally {
                this.loading = false
            }
        },

        async completeTask(taskId) {
            try {
                await api.completeTask(taskId)
                await this.loadTasks() // reload the list
            } catch (err) {
                console.error(err)
                this.error = 'Erreur lors de la complétion de la tâche'
            }
        },

        async deleteTask(taskId) {
            try {
                await api.deleteTask(taskId)
                await this.loadTasks() // reload the list
            } catch (err) {
                console.error(err)
                this.error = 'Erreur lors de la suppression de la tâche'
            }
        },
    },

    async mounted() {
        await this.loadTasks()
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

button {
    margin: 0 5px;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

div table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

div table td,
th {
    border: 1px solid #ddd;
    padding: 8px;
}

div table tr:nth-child(even) {
    background-color: #f2f2f2;
}

div table tr:hover {
    background-color: #ddd;
}

div table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #8182e9;
    color: white;
}
</style>
