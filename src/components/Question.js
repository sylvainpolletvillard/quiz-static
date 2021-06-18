import { shuffle, arrayEquals } from "../helpers.js"

export default {
	name: "Question",
	template: `
    <form @submit.prevent="submitAnswer" >
		<p class="question">
			Question {{number}} of {{total}}:<br/>
			<b>{{question.question}}</b>
		</p>
		<i v-if="canHaveMultipleAnswers">(several answers possible)</i>
        <ul class="choices">
            <li v-for="(choice, i) in choices">
				<input
					v-if="canHaveMultipleAnswers"
					type="checkbox"
					:id="'choice'+choice.num"
					:value="choice.num"
					:disabled="answered"
					v-model="chosen"
				/>

				<input
					v-else
					type="radio"
					:id="'choice'+choice.num"
					:value="choice.num"
					:disabled="answered"
					v-model="chosen"
				>
				<label
					:for="'choice'+choice.num"
					:class="getLabelColor(choice.num)"
				>
					{{choice}}
				</label>
            </li>
		</ul>

		<button type="submit" v-if="!answered && hasChosen">Submit answer</button>

		<template v-else-if="answered">
			<div class="answer" :class="{right: isCorrect, wrong: !isCorrect}">
				<b>{{isCorrect ? "Correct !" : "Incorrect !"}}</b>
				<p v-if="question.explaination" class="explaination">
					{{question.explaination}}
				</p>
			</div>
			<button @click.prevent="$emit('next')">
				{{number === total ? 'View final score' : 'Next question'}}
			</button>
		</template>
    </form>`,

	props: {
		number: Number,
		total: Number,
		question: Object
	},

	data() {
		return {
			chosen: this.canHaveMultipleAnswers ? [] : null,
			answered: false
		}
	},

	watch: {
		number(num, previous) {
			if (num !== previous) {
				this.chosen = this.canHaveMultipleAnswers ? [] : null
				this.answered = false
			}
		}
	},

	computed: {
		canHaveMultipleAnswers() {
			return Array.isArray(this.question.answer)
		},
		hasChosen() {
			return this.chosen && this.canHaveMultipleAnswers
				? this.chosen.length > 0
				: this.chosen != null
		},
		choices() {
			return shuffle(
				this.question.choices.map((choice, i) =>
					Object.assign(choice, { num: i + 1 })
				)
			)
		}
	},

	methods: {
		submitAnswer() {
			this.answered = true
			if (this.canHaveMultipleAnswers) {
				this.isCorrect = arrayEquals(this.chosen, this.question.answer)
			} else {
				this.isCorrect = this.chosen === this.question.answer
			}

			this.$emit(this.isCorrect ? "right" : "wrong")
		},
		getLabelColor(n) {
			if (!this.answered) return null

			let chosen = this.chosen,
				answer = this.question.answer

			if (this.canHaveMultipleAnswers) {
				if (answer.includes(n) && chosen.includes(n)) return "right"
				if (answer.includes(n) && !chosen.includes(n)) return "right"
				if (!answer.includes(n) && chosen.includes(n)) return "wrong"
			} else {
				if (answer === n && chosen === n) return "right"
				if (answer === n && chosen !== n) return "right"
				if (answer !== n && chosen === n) return "wrong"
			}
		}
	}
}
