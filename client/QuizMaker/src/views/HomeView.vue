<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const quizzes = ref([])

onMounted(async () => {
    const res = await axios.get("http://localhost:8080/api/quizzes");
    quizzes.value = res.data;
})

const test = () => {
    axios.post("http://localhost:8080/api/quizzes", {
        title: 'test',
        questions: [],
    })
}
</script>

<template>
    <div v-for="quiz in quizzes">
        {{ quiz }}
    </div>
</template>
