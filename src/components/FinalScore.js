export default {
	name: "FinalScore",

	template: `
	<p class="cursive" style="font-size: 1.5em">Finished !</p>
	<hr>
	<p>Your score:</p>
	<p class="score">
		<b>{{score}} correct answers out of {{total}} ({{percentage}}%)</b>
	</p>
	<p class="evaluation">
		<b class="cursive" style="font-size: 1.5em">{{evaluation.title}}</b>
		<br/>
		{{evaluation.description}}
	</p>
	<button @click="tryAgain">Try again</button>
	`,

	props: {
		score: Number,
		total: Number
	},

	computed: {
		percentage() {
			return Math.round((100 * this.score) / this.total)
		},
		evaluation() {
			if (this.percentage === 100)
				return {
					title: `Perfect score !`,
					description: "Congratulations, you rock !"
				}
			if (this.percentage > 90)
				return {
					title: `Excellent !`,
					description: "You know almost everything !"
				}
			if (this.percentage > 80)
				return {
					title: `Good job !`,
					description: "This is a pretty good score, well done."
				}
			if (this.percentage > 70)
				return {
					title: `Not bad.`,
					description: "But you can do better ! Maybe try again ?"
				}
			if (this.percentage > 60)
				return {
					title: `On track.`,
					description: "Good try, but you still have things to learn."
				}
			if (this.percentage >= 50)
				return {
					title: `Not good enough.`,
					description:
						"Sorry, you have to do better. Try again and read the explainations."
				}
			if (this.percentage > 10)
				return {
					title: `Ouch.`,
					description:
						"That's a pretty bad score you got there. You should read the docs again from the beginning and retry later."
				}
			return {
				title: `Come on....`,
				description: "You did on purpose, right ?"
			}
		}
	},

	methods: {
		tryAgain() {
			this.$emit("reset")
		}
	}
}
