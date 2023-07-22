<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import QuizItem from "@/components/QuizItem.vue";

const quizzes = ref([])
const isOpen = ref(false)

onMounted(async () => {
    const res = await axios.get("http://localhost:8080/api/quizzes");
    quizzes.value = res.data;
})

const addQuiz = async (quiz) => {
    await axios.post("http://localhost:8080/api/quizzes", quiz)
}

const openDialog = () => {
    console.log('test')
    isOpen.value = true;
}
</script>

<template>
    <div>
        <QuizItem v-for="quiz in quizzes" :quiz="quiz" />
        <Dialog class="dialog" v-if="isOpen" title="test" @close="() => isOpen = false">
            <template>
                <div>test</div>
            </template>
        </Dialog>
        <div class="button" @click="openDialog">
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
.dialog {
    z-index: 10;
    position: fixed;
    top: 5rem;
    bottom: 5rem;
    right: 5rem;
    left: 5rem;
    background-color: #2c3e50;
    border-radius: 20px;
    padding: 2rem;
}
</style>