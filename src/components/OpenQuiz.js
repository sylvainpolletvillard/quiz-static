export default {
	name: "OpenQuiz",
	template: `
	<h2>Find a quiz by reference</h2>
	<form @submit.prevent="openQuiz()">		
        <label>Quiz reference:
            <input type="text" v-model="ref" ref="quizRefInput">
		</label>
		<datalist id="quizs">
			<option v-for="quiz in listQuiz" :value="quiz" />
		</datalist>
		<p v-if="ref">
			<button type="submit">Start this quiz</button>
			<button class="secondary" @click.prevent="openQuiz('edit')">Edit this quiz</button>
		</p>
	</form>
	<hr>
	<h2>Want to make your own quiz ? It's easy</h2>
	<button @click="createQuiz">Create new quiz</button>
	`,

	data() {
		return {
			ref: "",
			listQuiz: []
		}
	},

	created() {
		this.fetchQuizList();
	},

	mounted() {
		setTimeout(() => {
			this.ref = this.$refs.quizRefInput.value;
		}, 0)
	},

	methods: {
		fetchQuizList() {
			return fetch("./index-quiz.json")
				.then(res => res.json())
				.then(listQuiz => {
					this.listQuiz = listQuiz;
					this.$refs.quizRefInput.setAttribute("list", "quizs")
				})
				.catch(error => {
					console.error(error)
				})
		},

		openQuiz(action) {
			window.location.search = `?quiz=${encodeURIComponent(this.ref)}${action ? `&action=${action}` : ''}`
		},

		createQuiz() {
			window.location.search = `?action=edit`
		}
	}
}
