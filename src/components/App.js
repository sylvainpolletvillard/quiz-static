import CreateQuiz from "./CreateQuiz.js"
import OpenQuiz from "./OpenQuiz.js"
import QuizComponent from "./Quiz.js"
import { Quiz } from "../model.js"

export default {
	name: "App",
	data(){
		return {
			quiz: null,
			quizName: new URL(window.location).searchParams.get("quiz"),
			action: new URL(window.location).searchParams.get("action"),
			loading: true,
			error: null
		}
	},
	template: `
    <h1>Quiz time !</h1>
	<OpenQuiz v-if="!quizName && !action" />
	<CreateQuiz v-else-if="action === 'edit'" />

    <p class="loading" v-else-if="loading">
        Loading quiz...
    </p>
    <p class="error" v-else-if="error">
		Error loading quiz <b>{{quizName}}</b>: <br/>{{error.message}}
	</p>

    <Quiz v-else :quiz="quiz" />`,

	components: {
		CreateQuiz,
		OpenQuiz,
		Quiz: QuizComponent
	},

	created() {
		if (this.quizName) {
			this.loadQuiz()
		}
	},

	methods: {
		loadQuiz() {
			this.loading = true
			fetch(`./quiz/${this.quizName}.json`)
				.then(res => res.json())
				.then(quizData => {
					this.quiz = Quiz(quizData)
					this.loading = false
					document.title = `Quiz: ${this.quiz.title}`
				})
				.catch(error => {
					console.error(error)
					this.error = error
					this.loading = false
				})
		}
	}
}
