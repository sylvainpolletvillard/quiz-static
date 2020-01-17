import { shuffle } from "../lib/utils.js";

export default {
    data: {
        quiz: null,
        quizName: new URL(window.location).searchParams.get("quiz"),
        quizNameInput: "",
        state: null,
        questionNum: null,
        score: 0,
        answer: null,
        isCorrect: null
    },
    template: `
    <h1>Quiz time !</h1>
    
    <form @submit.prevent="loadQuiz(quizNameInput)" v-if="!quiz">
        <label>Name of the quiz:
            <input type="text" v-model="quizNameInput">
        </label>
        <button type="submit">Open quiz</button>
        <p class="loading" v-if="state=='loading'">Loading quiz...</p>
        <p class="error" v-if="state=='error'">
            There is no quiz of that name: {{quizName}}
        </p>
    </form>
    
    <template v-else>
        <h2>{{quiz.title}}</h2>
        <div v-if="!questionNum">
            <p>Are you ready for this ?</p>
            <button @click="questionNum=1">Start quiz</button>
        </div>
        <form @submit.prevent="submitAnswer" v-else-if="question">
            <p>Question {{questionNum}}: {{question.statement}}</p>
            <ul v-for="(choice, i) in choices">
                <li>
                    <label>
                        <input name="choices" :type="questionType" :value="choice.num" v-model="answer">
                        {{choice}}
                    </label>
                </li>
            </ul>
            <button type="submit" :disabled="state=='answered'">Submit answer</button>
        </form>
        <div v-if="state=='answered'">
            <h3>{{isCorrect ? "Correct !" : "Incorrect !"}}</h3>
            <p v-if="question.explaination">{{question.explaination}}</p>
            <button @click="goToNextQuestion">Next question</button>
        </div>
        <div v-if="state=='completed'">
            <h3>End of the quiz !</h3>
            <p>Your score: {{score}}</p>
        </div>
    </template>
`,
    created() {
        if (this.quizName) this.loadQuiz(this.quizName);
    },

    computed: {
        question() {
            return this.quiz.questions[this.questionNum - 1]
        },
        questionHasMultipleAnswers() {
            return Array.isArray(this.question.answer)
        },
        questionType() {
            return this.questionHasMultipleAnswers ? "checkbox" : "radio"
        },
        choices() {
            return shuffle(this.question.choices.map((choice, i) => Object.assign(choice, { num: i + 1 })))
        }
    },

    methods: {
        loadQuiz(quizName) {
            if (quizName !== this.quizName) {
                window.location.search = `?quiz=${encodeURIComponent(quizName)}`;
            }

            this.state = "loading";
            import(`../quiz/${quizName}.js`).then(module => {
                console.log({ module })
                this.quiz = module.default;
                this.state = "loaded";
            }).catch(error => {
                console.log({ error })
                this.state = "error";
            })
        },

        submitAnswer() {
            this.isCorrect = this.questionHasMultipleAnswers
                ? this.question.answer.join(",") === this.answer.join(",")
                : this.question.answer === this.answer;

            if (this.isCorrect) this.score++;
            this.state = "answered";
        },

        goToNextQuestion() {
            this.questionNum++;
            this.answer = null;
            this.isCorrect = null;
            if (this.questionNum >= this.quiz.questions.length) {
                this.state = "completed";
            }
        }
    }
};