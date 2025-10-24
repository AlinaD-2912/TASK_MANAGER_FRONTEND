<script setup>
    import HelloWorld from './components/HelloWorld.vue'
    import AddTask from './components/AddTask.vue';
    import ListTasks from './components/ListTasks.vue';
</script>

<template>
    <main>
        <h1>Task Manager</h1>
        <HelloWorld/>

        <div>
            <AddTask/>
        </div>

        <div>
            <ListTasks/>
        </div>
    </main>
</template>

<style scoped></style>
