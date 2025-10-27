<template>
    <div>
        <h2>Ajouter une tâche</h2>

        <!-- run addTask in methods, prevnt - stops the page from reloading -->
        <form @submit.prevent="addTask">
            <input type="text" v-model="title" placeholder="Entrez une nouvelle tâche" />
            <button type="submit">Ajouter</button>
        </form>

        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script>
import { api } from '@/services/api.js'

export default {
    name: 'AddTask',

    data() {
        return {
            title: '',
            message: '',
        }
    },

    methods: {
        async addTask() {
            if (!this.title.trim()) {
                this.message = 'La description est obligatoire'
                return
            }
            try {
                const response = await api.addTask({ description: this.title })
                this.message = `Tâche "${response.data.description}" ajoutée avec succès`
                this.title = ''

                // Emit event to parent to refresh list
                this.$emit('task-added')
            } catch (error) {
                console.error(error)
                this.message = "Erreur lors de l'ajout de la tâche"
            }
        },
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

div form button {
    background-color: rgba(8, 46, 150, 0.836);
    color: aliceblue;
}
div form button:hover {
    background-color: rgb(78, 199, 255);
    border-color: rgb(38, 194, 221);
    color: black;
}
</style>
