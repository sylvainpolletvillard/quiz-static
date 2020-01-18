import FinalScore from "./FinalScore.js"
import Question from "./Question.js"
import { Quiz } from "../model.js"

export default {
	name: "Quiz",
	template: `
	<h2>{{quiz.title}}</h2>
	<hr>

    <div v-if="state === 'ready'">
        <p v-if="quiz.description">{{quiz.description}}</p>
        <button @click="startQuiz">Start quiz</button>
    </div>

    <Question
		v-else-if="question"
		:question="question"
		:number="questionNum"
		:key="questionNum"
		:total="quiz.questions.length"
        @next="goToNextQuestion"
        @right="score++"
    />

    <FinalScore
        v-if="state === 'completed'"
		:score="score"
		:total="quiz.questions.length"
		@reset="startQuiz"
    />`,

	props: {
		quiz: Quiz
	},

	components: {
		FinalScore,
		Question
	},

	data() {
		return {
			state: "ready",
			questionNum: null,
			score: 0,
			answer: null,
			isCorrect: null
		}
	},

	computed: {
		question() {
			return this.quiz.questions[this.questionNum - 1]
		}
	},

	methods: {
		startQuiz() {
			this.score = 0
			this.questionNum = 0
			this.questions = this.quiz.questions
			this.goToNextQuestion()
		},

		goToNextQuestion() {
			this.questionNum++
			this.answer = null
			this.isCorrect = null
			if (this.questionNum > this.quiz.questions.length) {
				this.state = "completed"
			} else {
				this.state = "question"
			}
		}
	}
}
