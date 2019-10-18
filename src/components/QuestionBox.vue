<template>
	<div class="question-box-container">
		<b-jumbotron>
			<div class="jumbotron-lead-text-container d-flex align-items-center justify-content-center">
				<span class="jumbotron-lead-text-container__lead-text">{{currentQuestionObject.question}}</span>
			</div>
			<hr class="my-4" />
			<b-list-group>
				<!-- reference to computed answers -->
				<b-list-group-item
					v-for="(answer, index) in answers"
					:key="index"
					@click="selectAnswer(index)"
					:class="classAnswer(index)"
				>{{answer}}</b-list-group-item>
			</b-list-group>
			<b-button
				variant="primary"
				@click="submitAnswer()"
				:disabled="selectedAnswerIndex === null || answered"
			>Submit</b-button>
			<b-button @click="next" variant="success" :disabled="!answered">Next</b-button>
			<div class="mt-3 text-right info-question-icon">
				<i id="info-question-icon" class="far fa-question-circle"></i>
				<b-popover target="info-question-icon" triggers="hover" placement="top">
					<template v-slot:title>How to play?</template>
					<ol>
						<li>Choose the answer</li>
						<li>
							Click the
							<span class="text-primary">Submit</span> button
						</li>
						<li>Take a look on your solution ...</li>
						<li>
							Click the
							<span class="text-success">Next</span> button
						</li>
						<li>And so on</li>
					</ol>
				</b-popover>
			</div>
		</b-jumbotron>
	</div>
</template>

<script>
import _ from 'lodash';
import he from 'he';

export default {
	props: {
		currentQuestionObject: Object,
		next: Function,
		increment: Function
	},
	data() {
		return {
			selectedAnswerIndex: null,
			correctAnswerIndex: null,
			shuffledAnswers: [],
			answered: false
		};
	},
	computed: {
		answers() {
		  //Замена html-символов на нормальные
			this.currentQuestionObject.incorrect_answers = this.currentQuestionObject.incorrect_answers.map(item => he.decode(item));
			this.currentQuestionObject.correct_answer = he.decode(this.currentQuestionObject.correct_answer);

			let answers = [...this.currentQuestionObject.incorrect_answers];
			answers.push(this.currentQuestionObject.correct_answer);
			return answers;
		}
	},
	watch: {
		currentQuestionObject: {
			immediate: true,
			handler() {
				//Замена html-символов на нормальные
				this.currentQuestionObject.question = he.decode(
					this.currentQuestionObject.question
				);

				this.selectedAnswerIndex = null;
				this.answered = false;
				this.shuffleAnswers();
			}
		}
	},
	methods: {
		selectAnswer(index) {
			if (!this.answered) {
				this.selectedAnswerIndex = index;
			}
		},
		submitAnswer() {
			let isCorrect = false;

			if (this.selectedAnswerIndex === this.correctAnswerIndex) {
				isCorrect = true;
			}
			this.answered = true;

			this.increment(isCorrect);
		},
		classAnswer(index) {
			let answerClass = '';

			if (!this.answered && this.selectedAnswerIndex === index) {
				answerClass = 'selected';
			} else if (this.answered && this.correctAnswerIndex === index) {
				answerClass = 'correct';
			} else if (
				this.answered &&
				this.selectedAnswerIndex === index &&
				this.correctAnswerIndex !== index
			) {
				answerClass = 'incorrect';
			}

			return answerClass;
		},
		shuffleAnswers() {
			//Перетасовать
			let answers = [
				...this.currentQuestionObject.incorrect_answers,
				this.currentQuestionObject.correct_answer
			];
			this.shuffledAnswers = _.shuffle(answers);
			this.correctAnswerIndex = this.shuffledAnswers.indexOf(
				this.currentQuestionObject.correct_answer
			);
		}
	}
};
</script>

<style scoped>
.jumbotron-lead-text-container {
	min-height: 20vh;
}

.jumbotron-lead-text-container__lead-text {
	font-size: 1.2rem;
	color: black;
}

.info-question-icon {
	color: purple;
	font-size: 1.3rem;
}

.list-group {
	margin-bottom: 15px;
}
.list-group-item:hover {
	background-color: indigo;
	color: white;
	cursor: pointer;
}
.btn {
	margin: 0 5px;
}
.selected {
	background-color: indigo;
	color: white;
}
.correct {
	background-color: green;
	color: white;
}
.incorrect {
	background-color: red;
	color: white;
}
</style>