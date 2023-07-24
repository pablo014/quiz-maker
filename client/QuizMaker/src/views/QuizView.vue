<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted} from "vue";
import axios from 'axios';

const route = useRoute();
const id = ref();
const data = ref();
onMounted(async () => {
    id.value = route.params.id;
    const res = await axios.get('http://localhost:8080/api/quizzes', route.params.id)
    data.value = res.data;
})
</script>

<template>
<div>
    {{ data }}
</div>
</template>

<style scoped>

</style>