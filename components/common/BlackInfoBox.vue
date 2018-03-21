<template>
	<div class="black-info-box-cont">
		<div class="black-info-icon"></div>
		<div v-for="(blurb, i) in blurbs" :key="i" class="icon-blurb">
			<no-ssr><i class="blurb-icon" :class="blurb.icon"></i></no-ssr>
			<p>{{blurb.text}}</p>
		</div>
	</div>
</template>



<script>
export default {
  name: 'BlackInfoBox',
  data () {
    return {
			blurbs: [{
				text: 'Free U.S Shipping on orders over $50',
				icon: 'fal fa-paper-plane'
			}, {
				text: 'Free U.S Returns on orders over $95',
				icon: 'fal fa-undo'
			}, {
				text: '24/7 Customer service support',
				icon: 'fal fa-life-ring'
			}, {
				text: 'Safe and Secure Checkout',
				icon: 'fal fa-shield'
			}]
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.black-info-box-cont{
	width: 100%;
	box-sizing: border-box;
	background-color: #000000;
	position: relative;
	// padding: 0 1.5rem;
	padding-top: 8.7rem;
	// padding-bottom: 10rem;
	@include respond-to(sm) {
		padding-top: 4rem;
		padding-bottom: 1rem;
	}
	.black-info-icon{
		width: 9.2rem;
		height: 8.4rem;
		margin: auto;
		margin-bottom: 9.5rem;
		@include respond-to(lg) {margin-bottom: 9.5rem;}
		@include respond-to(md) {margin-bottom: 6.5rem;}
		@include respond-to(sm) {margin-bottom: 4rem; width: 7.2rem;}
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		background-image: url('https://d3dty8fv62xana.cloudfront.net/wh-icon.svg');

	}
	.icon-blurb {
	display: inline-flex;
	align-items: center;
	text-transform: uppercase;
	width: calc(25% - 1px);
	justify-content: center;
	// border-right: 1px solid #3f3f3f;
	padding-bottom: 2.5rem;
	position: relative;
	&::after {
		content: "";
		position: absolute;
		right: -1px;
		bottom: 0;
		width: 1px;
		border-right: 1px solid #3f3f3f;
		height: 9rem;
		@include respond-to(lg) {height: 6.9rem;}
		@include respond-to(md) {height: 5.5rem;}
		@include respond-to(sm) {display: none;}
	}
	&:last-of-type {
		border-right: none;
		&::after {border: none}
	}
	@include respond-to(sm) {
		display: flex;
		width: auto;
		padding: 2rem 0rem;
		margin: 0 2.5rem;
		box-sizing: border-box;
		justify-content: flex-start;
		border: none;
		border-top: 1px solid #252525;
	}
	.blurb-icon {
		display: inline-block;
		color: $wh-white;
		font-size: 3.2rem;
		margin-right: 2rem;
		@include respond-to(lg) {font-size: 2.4rem; margin-right: 1.5rem;}
		@include respond-to(md) {font-size: 1.8rem; margin-right: 1.1rem;}
		@include respond-to(sm) {font-size: 2.4rem; margin-right: 1.38rem;}
	}
	p {
		@include text-small;
		display: inline-block;
		color: $wh-white;
		width: 20rem;
		line-height: 1.6;
		letter-spacing: 2px;
		text-align: left;
		@include respond-to(md) {
			letter-spacing: 1.5px;
			font-size: 0.75rem;
			width: 15rem;
		}
		@include respond-to(sm) {
			font-size: 1.2rem;
			width: initial;
		}
	}
}


}

</style>
