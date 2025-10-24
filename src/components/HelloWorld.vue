<script setup>
import { api } from '@/services/api.js'
import {onMounted, ref} from 'vue'

const title = ref("")

onMounted(async () => {
    const response = await api.getHello()
    title.value = ref(response.data)
})

</script>

<template>
    <p>{{ title }}</p>
    <ul>
        <li v-for="user in users">{{ user.name.first }}</li>
    </ul>
</template>

<style scoped></style>
