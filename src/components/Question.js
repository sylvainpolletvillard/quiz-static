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
        <ul class="propositions">
            <li v-for="(prop, i) in propositions">
				<input
					v-if="canHaveMultipleAnswers"
					type="checkbox"
					:id="'prop'+prop.num"
					:value="prop.num"
					:disabled="answered"
					v-model="choices"
				/>

				<input
					v-else
					type="radio"
					:id="'prop'+prop.num"
					:value="prop.num"
					:disabled="answered"
					v-model="choice"
				>
				<label
					:for="'prop'+prop.num"
					:class="getLabelColor(prop.num)"
				>
					{{prop.toString()}}
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
			choices: [],
			choice: null,
			answered: false
		}
	},

	watch: {
		number(num, previous) {
			if (num !== previous) {
				this.choice = null;
				this.choices = [];
				this.answered = false
			}
		}
	},

	computed: {
		canHaveMultipleAnswers() {
			return Array.isArray(this.question.answer)
		},
		hasChosen() {
			return this.canHaveMultipleAnswers
				? this.choices.length > 0
				: this.choice != null
		},
		propositions() {
			return shuffle(
				this.question.propositions.map((prop, i) =>
					Object.assign(prop, { num: i + 1 })
				)
			)
		}
	},

	methods: {
		submitAnswer() {
			this.answered = true
			if (this.canHaveMultipleAnswers) {
				this.isCorrect = arrayEquals(this.choices, this.question.answer)
			} else {
				this.isCorrect = this.choice === this.question.answer
			}

			this.$emit(this.isCorrect ? "right" : "wrong")
		},
		getLabelColor(n) {
			if (!this.answered) return null
			const answer = this.question.answer

			if (this.canHaveMultipleAnswers) {
				if (answer.includes(n) && this.choices.includes(n)) return "right"
				if (answer.includes(n) && !this.choices.includes(n)) return "right"
				if (!answer.includes(n) && this.choices.includes(n)) return "wrong"
			} else {
				if (answer === n && this.choice === n) return "right"
				if (answer === n && this.choice !== n) return "right"
				if (answer !== n && this.choice === n) return "wrong"
			}
		}
	}
}
