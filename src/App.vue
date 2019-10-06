<template>
	<div id="app">
		<Header class="header" :numCorrectAnswers="numCorrectAnswers" :numTotalAnswers="numTotalAnswers" />

		<b-container class="bv-example-row">
			<b-row class="justify-content-center">
				<b-col sm="6">
					<QuestionBox
						v-if="questions.length"
						:currentQuestionObject="questions[currentQuestionIndex]"
						:next="next"
						:increment="increment"
					/>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import Header from './components/Header';
import QuestionBox from './components/QuestionBox';

export default {
	name: 'app',
	components: {
		Header,
		QuestionBox
	},
	data() {
		return {
			questions: [],
			currentQuestionIndex: 0,
			numCorrectAnswers: 0,
			numTotalAnswers: 0,
			amountOfQuestionsToGet: 10
		};
	},
	methods: {
		next() {
			this.currentQuestionIndex++;
		},
		increment(isCorrect) {
			if (isCorrect) {
				this.numCorrectAnswers++;
			}
      this.numTotalAnswers++;

      if(this.numTotalAnswers % this.amountOfQuestionsToGet === 0) { //if answers ends? take more!
        this.getAnswers();
      }
		},
		getAnswers() {
			fetch(`https://opentdb.com/api.php?amount=${this.amountOfQuestionsToGet}&category=27&type=multiple`, {
				method: 'get'
			})
				.then(response => {
					return response.json();
				})
				.then(jsonData => {
					this.questions = [...this.questions, ...jsonData.results];
				});
		}
	},
	mounted() {
		this.getAnswers(); //get answers first time
	}
};
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

.header {
  margin-bottom: 15px;
}
</style>
