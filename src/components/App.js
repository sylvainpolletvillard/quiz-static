import OpenQuiz from "./OpenQuiz.js"
import QuizComponent from "./Quiz.js"
import { Quiz } from "../model.js"

export default {
	name: "App",
	data: {
		quiz: null,
		quizName: new URL(window.location).searchParams.get("quiz"),
		loading: true,
		error: null
	},
	template: `
    <h1>Quiz time !</h1>
    <OpenQuiz v-if="!quizName" />

    <p class="loading" v-else-if="loading">
        Loading quiz...
    </p>
    <p class="error" v-else-if="error">
        There is no quiz of that name: {{quizName}}
    </p>

    <Quiz v-else :quiz="quiz" />`,

	components: {
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
			import(`../../quiz/${this.quizName}.js`)
				.then(module => {
					this.quiz = Quiz(module.default)
					this.loading = false
					document.title = `Quiz: ${this.quiz.title}`
				})
				.catch(error => {
					console.error(error)
					this.error = error
				})
		}
	}
}
