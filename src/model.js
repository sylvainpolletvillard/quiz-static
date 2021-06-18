import { ObjectModel, ArrayModel } from "../web_modules/objectmodel.js"

export const Question = ObjectModel({
	question: String,
	propositions: ArrayModel(String),
	answer: [Number, ArrayModel(Number)],
	explaination: [String]
})

export const Quiz = ObjectModel({
	title: String,
	description: [String],
	questions: ArrayModel(Question)
})
