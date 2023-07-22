<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const quizzes = ref([])

onMounted(async () => {
    quizzes.value = await axios.get("http://localhost:8080/api/items")
})

const test = () => {
    axios.post("http://localhost:8080/api/quizzes", {
        title: 'test',
        questions: [],
    })
}
</script>

<template>
    <button @click="test()">Test</button>
</template>
