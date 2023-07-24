<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

export interface QuizItem {
    quiz: {_id: String, title: String, author: string, questions: Array<String>, summary: String}
}

const props = defineProps<QuizItem>();
</script>

<template>
    <RouterLink :to="`${quiz?._id}`">
        <div class="container">
            <div class="header">
                <h2>{{ quiz?.title }}</h2>
                <p>{{ quiz?.author }}</p>
            </div>
            <div class="summary">
                <p>{{ quiz?.summary }}</p>
            </div>
        </div>
    </RouterLink>
</template>

<style scoped>
.container {
    width: 100%;
    border: 4px solid #f2f2f2;
    border-radius: 10px;
    padding: 1.5rem;
    margin-bottom: 1rem;
}
</style>