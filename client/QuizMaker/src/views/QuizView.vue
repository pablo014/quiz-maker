<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted} from "vue";
import axios from 'axios';
import type { Quiz } from './HomeView.vue';

const route = useRoute();
const id = ref();
const data = ref<Quiz>();
onMounted(async () => {
    id.value = route.params.id;
    const res = await axios.get(`http://localhost:8080/api/quizzes/${id.value}`)
    data.value = res.data;
})
</script>

<template>
<div v-if="data">
  <h1>{{ data.title }}</h1>
  <div>Created by {{ data.author }}</div>
  <div>{{ data.summary }}</div>
  <div class="list-container">
    <div v-for="question in data.questions">{{ question.text }}</div>
  </div>
</div>
</template>

<style scoped>
.list-container {
  width: 100%;
  border: 4px solid #f2f2f2;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  height: 70vh;
  overflow-y: scroll;
}
</style>