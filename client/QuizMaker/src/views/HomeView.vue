<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import QuizItem from "@/components/QuizItem.vue";

export interface Choice {
  isAnswer: boolean,
  text: string,
}
export interface Question {
  text: string,
  choices: Array<Choice>,
  answer: string,
}
export interface Quiz {
  _id: string,
  title: string,
  questions: Array<Question>,
  author: string,
  summary: string,
}

const quizzes = ref<Array<Quiz>>([])
const isOpen = ref<boolean>(false)
const title = ref<string>('')
const questionList = ref<Array<Question>>([
    {
        text: '',
        choices: [],
        answer: ''
    }
]);

onMounted(async () => {
    const res = await axios.get("http://localhost:8080/api/quizzes");
    quizzes.value = res.data;
})

const addToList = () => {
    questionList.value.push({
        text: '',
        choices: [],
        answer: ''
    });
}

const removeFromList = (idx: number) => {
    questionList.value.splice(idx, 1);
}

const addChoices = (index: number) => {
    questionList.value[index].choices.push({
        isAnswer: false,
        text: '',
    })
}

const removeChoice = (i: number, c: number) => {
    questionList.value[i].choices.splice(c, 1);
}

const addQuiz = async (quiz: Quiz) => {
    await axios.post("http://localhost:8080/api/quizzes", quiz)
    questionList.value = [];
    addToList();
}
const deleteQuiz = async (id: number) => {
    await axios.delete("http://localhost:8080/api/quizzes", id)
}

const openDialog = () => {
    isOpen.value = true;
}
</script>

<template>
    <div>
        <QuizItem v-for="quiz in quizzes" :quiz="quiz" />
        <Dialog class="dialog" v-if="isOpen" title="Add Quiz" @close="() => isOpen = false" @confirm="addQuiz">
            <div>Title</div>
            <InputText @inputValue="(i) => {title = i}" />
            <div class="questions" v-for="(n, q) in questionList">
                <div>Question {{ q + 1 }}</div>
                <div class="question-input">
                    <input type="text" v-model="n.text" :id="`q-${q}`">
                    <font-awesome-icon icon="fa-solid fa-trash" class="trash" @click="removeFromList(q)"/>
                </div>
                <div class="choice-container">
                    <div v-for="(choice, c) in n.choices" class="choice">
                        <Checkbox :id="`${q}-${c}`" label="" :value="choice.isAnswer"/>
                        <InputText @inputValue="(i) => {choice.text = i}" />
                        <input type="text" v-model="choice.text" :id="`c-${c}`">
                        <font-awesome-icon icon="fa-solid fa-trash" class="trash" @click="removeChoice(q, c)" />
                    </div>
                    <div class="add" @click="addChoices(q)">Add Choice</div>
                </div>
            </div>
            <div class="add" @click="addToList">Add Question</div>
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
    box-shadow: 10px 5px 5px #222222;
}
.add {
    cursor: pointer;
}
.choice-container {
    padding-left: 2rem;
}
.choice {
    display: flex;
}
.questions {
    padding-left: 2rem;
    padding-bottom: 2rem;
}
.question-input {
    display: flex;
}
.trash {
    cursor: pointer;
    margin-left: 1rem;
}
</style>