<template>
	<li @click="$emit('click')" class="v-nav-link">
		<slot></slot>
	</li>
</template>
<script>
</script>
<style lang='scss'>
	@import '../../../assets/css/_variables.scss';
	.v-nav-link {
		box-sizing: border-box;
		display: inline-block;
		margin: 0 0.8rem;
		border-bottom: solid 3px transparent;
		display: inline-block;
		padding: 0rem 1rem calc(2rem - 4.5px) 1rem;
		text-decoration: none;
		@include text-link;
		line-height: 7rem;
		color: $wh-black;
		transition: 0.2s all linear;
		&:hover {
			cursor: pointer;
			opacity: 0.5;
		}
		a {
			display: inline-block;
			padding: 2.5rem 1rem calc(2.5rem - 3px) 1rem;
			text-decoration: none;
			@include text-link;
			line-height: 3rem;
			color: $wh-black;
		}
		&.active {
			font-weight: 600;
		}
	}

</style>
