<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import QuizItem from "@/components/QuizItem.vue";

const quizzes = ref([])

onMounted(async () => {
    const res = await axios.get("http://localhost:8080/api/quizzes");
    quizzes.value = res.data;
})

const test = () => {
    axios.post("http://localhost:8080/api/quizzes", {
        title: 'test',
        questions: [],
        author: 'me',
        summary: 'test',
    })
}
</script>

<template>
    <div>
        <QuizItem v-for="quiz in quizzes" :quiz="quiz" />
        <div class="button">
            <p>+</p>
        </div>
    </div>
</template>

<style scoped>
.button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 7rem;
    height: 7rem;
    background: #2c3e50;
    border-radius: 100rem;
    font-size: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 1.2rem;
    cursor: pointer;
}
</style>