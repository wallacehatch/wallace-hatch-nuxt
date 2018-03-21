<template>
		<ul class="nav-bar-cont" :id="navKey">
			<nav-item
				v-for="(item, i) in items"
				:key="i"
				:id="navKey + String(i)"
				@click="$emit('linkClick', i, 'left')"
				:class="{active: (active === i)}">
				{{item}}
			</nav-item>
			<div class="active-bar-cont">
				<div :class="{'single-option': items.length === 1}" :id="navKey + '-active-bar'" class="active-bar" :style="optStyle"></div>
			</div>

		</ul>
</template>
<script>
	import navItem from './NavItem';
	import anime from 'animejs'
	export default {
		name: 'navBar',
		props: ['items', 'active', 'navKey', 'dur', 'activeBarColor'],
		components: {
			navItem,
		},
		data() {
			return {
				keyPoints: [],
				optStyle: {
					borderColor: this.activeBarColor,
					boxShadow: '0 2px 4px 0 ' + this.activeBarColor + ', 0 1px 1px 0 rgba(0, 0, 0, 0.3)',
				}
			}
		},
		methods: {
			animateActiveBar(pos) {
				console.log('animate active bar: ' + pos);
				if (this.$store.state.navLayout === 1) return;
				if (window.innerWidth < 768) return;
				setTimeout(() => {
					var timeline = anime.timeline();
					timeline.add({
						targets: '#' + this.navKey + '-active-bar',
						left: this.keyPoints[pos].startPoint + (16*pos) + 'px' ,
						width: this.keyPoints[pos].elWidth + 'px',
						duration: this.dur ? Number(this.dur) : 400,
						easing: 'easeInOutQuart',
					})
					timeline.add({
						targets: '#' + this.navKey + '-active-bar',
						opacity: 1.0,
						duration: 200,
						easing: 'linear',
						offset: '-=0',
					})
					// console.log(this.keyPoints[pos].startPoint + (16*pos) + 'px');
				})
			},
			positionActiveBar() {
				console.log('position active bar');
				if (this.$store.state.navLayout) return;
				setTimeout(() => {
					var startPos = document.getElementById(this.navKey + '0').getBoundingClientRect().left - document.getElementById(this.navKey).getBoundingClientRect().left - 8;
					this.keyPoints = this.items.map((item, i) => {
						const el = document.getElementById(this.navKey + String(i));
						var keyPoint = {elWidth: el.offsetWidth, startPoint: startPos}
						startPos = startPos + el.offsetWidth;
						return keyPoint
					})
					// var activeBarStyle = document.getElementById(this.navKey + '-active-bar').style;
					// activeBarStyle.width = String(this.keyPoints[this.active].elWidth) + 'px';
					// activeBarStyle.position = 'relative';
					// activeBarStyle.left = String(this.keyPoints[this.active].startPoint) + 'px';
					// console.log(startPos);
				})
			}
		},
		mounted() {
			// this.positionActiveBar();
			// this.animateActiveBar(this.active);
			window.addEventListener('load', () => {
				this.positionActiveBar();
				this.animateActiveBar(this.active);
				console.log('calling position bar');
			});
		},
		updated() {
			// this.positionActiveBar();
			// this.animateActiveBar(this.active);
			window.addEventListener('load', () => {
				this.positionActiveBar();
				this.animateActiveBar(this.active);
			});
		},
		watch: {
			'active' (newState) {
				console.log('active is changing');
				this.positionActiveBar();
				this.animateActiveBar(newState);
			}
		}

	}
</script>
<style lang='scss'>
	@import '../../../assets/css/_variables.scss';
	.nav-bar-cont {
		list-style: none;
		// display: inline-block;
		&.footer {
			.v-nav-link {
				color: $wh-black;
			}
		}
	}
	.active-bar {
		// box-shadow: 0 2px 4px 0 $wh-black, 0 1px 1px 0 rgba(0, 0, 0, 0.3);
		border-bottom: solid 2px $wh-black;
		box-sizing: border-box;
		height: 2px;
		margin: -2rem 0 -1rem 0;
		position: relative;
		opacity: 0.0;
    &.single-option {
      border: none;
			box-shadow: none;
    }
	}
	.active-bar-cont {
		padding: 0 0.8rem;
	}
</style>
