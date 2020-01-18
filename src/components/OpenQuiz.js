export default {
	name: "OpenQuiz",
	template: `
     <form @submit.prevent="openQuiz" >
        <label>Quiz reference:
            <input type="text" v-model="ref">
		</label>
		<p>
			<button type="submit">Open quiz</button>
		</p>
    </form>
	`,

	data() {
		return {
			ref: ""
		}
	},

	methods: {
		openQuiz() {
			window.location.search = `?quiz=${encodeURIComponent(this.ref)}`
		}
	}
}
