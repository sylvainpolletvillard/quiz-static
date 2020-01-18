export default {
	title: "Progressive Web Apps",
	description: "Are you ready for this ?",
	questions: [
		{
			question: "What are PWA ?",
			choices: [
				`A new marketing buzzword`,
				`A new standard web API`,
				`A new platform for web apps`,
				`A new framework by Google`
			],
			answer: 1,
			explaination: `Progressive Web Apps (PWA) do not refer to a specific API, framework or platform. You can consider PWA as a quality label. The term PWA allows to communicate more efficiently about an expected level of quality, instead of a long list of features and obscure technical details.`
		},

		{
			question: "What are the advantages of PWA ?",
			choices: [
				`Performance improvements`,
				`Better platform integration`,
				`Battery savings`,
				`Accessibility improvements`
			],
			answer: [1, 2, 3],
			explaination: `PWA encourage agressive cache strategies, which can drastically reduce the amount of network requests done. This leads to better perceived performance and battery savings, since network calls are often the most energy-intensive actions on mobile. PWA also integrate better with the platform: they can be installed and managed like native apps. However, PWA do not magically improve the accessibility of your web app, this is still your responsability.`
		}
	]
}
