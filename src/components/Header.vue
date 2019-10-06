<template>
	<div>
		<b-nav class="" tabs>
			<div class="d-flex align-items-center mr-5 ml-3" disabled>
				<span class="app-title">Quiz app</span>
        <i class="fas fa-bacon app-logo"></i>
			</div>
			<div class="answers-container d-flex align-items-center">
				<span
					class="text-success mr-2"
					v-b-tooltip.hover
					title="correct answers"
				>{{numCorrectAnswers}}</span>
				<span class="mr-2">/</span>
				<span v-b-tooltip.hover title="total answers">{{numTotalAnswers}}</span>
			</div>
		</b-nav>
	</div>
</template>

<script>
export default {
	props: ['numCorrectAnswers', 'numTotalAnswers']
};
</script>

<style scoped>
.app-title {
  color: black;
	font-size: 1.5rem;
  margin-right: 5px;
}

.app-logo {
  font-size: 1.1rem;
  color: purple;
}

.answers-container {
	cursor: default;
}
</style>