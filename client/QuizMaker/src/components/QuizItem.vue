<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Quiz } from '../views/HomeView.vue'

export interface QuizItem {
    quiz: Quiz
}

const props = defineProps<QuizItem>();
</script>

<template>
    <RouterLink :to="`${quiz?._id}`">
        <div class="container">
            <div class="header">
                <h2>{{ quiz?.title }}</h2>
              <p>Num Questions: {{ quiz?.questions.length}}</p>
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