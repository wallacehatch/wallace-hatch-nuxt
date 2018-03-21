<template>
	<div class="newsletter-cont">
		<div class="newsletter-inner-cont">
		<div class="logo"></div>
		<h4 class="subtext">The Hatch Newsletter</h4>
		<!-- INPUT SHOULD GO HERE  -->
		<div class="email-input">
		<std-input
		iName="email"
		v-model="newsletter.email"
		:iValue="newsletter.email"
		iPlaceholder="Enter Your Email Address"
		iClass="lg"
		:class="{submitted: newsletter.submitted}"
		:submitted="newsletter.submitted"
		:error="newsletter.error"
		@submitForm="handleFieldSubmit"
		></std-input>
		</div>
		<!-- NAV SHOULD GO HERE -->
		<ul class="footer-site-nav">
			<li @click="function(){handleNavClick(item)}" v-for="(item,i) in navItems" :key="i">{{item.name}}</li>
		</ul>
		</div>
	</div>
</template>

<script>
import StdInput from './StdInput';
import axios from 'axios';
export default {
  name: 'NewsletterCta',
	components: {
		StdInput,
	},
  data () {
    return {
			newsletter: {
				email: '',
				submitted: false,
				error: null,
			},
			navItems: [{
				name: 'Home',
				id: 'home'
			}, {
				name: 'Our Story',
				id: 'ourStory',
			}, {
				name: 'FAQ',
				id: 'faq'
			}, {
				name: 'Contact Us',
				id: 'contactUs',
			}]
    }
  },
	methods: {
		handleNavClick(item) {
			switch (item.id) {
			case 'home':
				this.$router.push('/');
			break;
			case 'ourStory':
				this.$router.push('/our-story');
			break;
			case 'faq':
				this.$router.push('/faq');
			break;
			case 'contactUs':
				console.log('contact us clicked');
				this.$store.commit('SET_CONTACT_ACTIVE', true);
			break;
			default:
			break;
			}
		},
		handleFieldSubmit() {
			// validate INPUT
			if (!this.newsletter.email || this.newsletter.submitted) {this.newsletter.error = 'please enter a valid email.'; return;}
			else {
				this.newsletter.error = '';
				this.newsletter.submitted = true;
				console.log("about to sub")
				axios({
          method: 'post',
          url: process.env.API_URL + 'newsletter-signup/',
          data: {
            email: this.newsletter.email,
          }
        })
        .then((response) => {
          this.submitSuccess = true;
          setTimeout(() => {
            this.$emit('close');
          }, 2500)
        }, (error) => {
          console.log('Submission Error: ', error);
        })
			}
		}
	}

}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.email-input{
	margin: auto;
	overflow: visible;
	height: 9rem;
	max-width: 38rem;
	width: calc(100%  -4rem);
	@include respond-to(md) {
		input  {padding: 1rem 0;}
		.std-input-label { top: 1.4rem;}
	}
}
.newsletter-cont{
	text-align: center;
	@include respond-to(sm) {
		padding: 0 2.5rem;
	}
	.subtext{
		@include h4;
		font-size: 1.4rem;
		line-height: 1.43;
		letter-spacing: 5.8px;
		text-align: center;
		text-transform: uppercase;
		margin-bottom: 3rem;
		@include respond-to(md) {margin-bottom: 2.5rem;}
		@include respond-to(sm) {margin-bottom: 2rem;}
	}
	.logo {
		margin: 6rem auto 2rem auto;
		height: 4rem;
		width: 4.7rem;
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		background-image: url('https://d3dty8fv62xana.cloudfront.net/wh-mark.svg');
	}
}
.footer-site-nav {
	overflow: auto;
	margin-bottom: 5rem;
	@include respond-to(sm) {
		margin-bottom: 3rem;
	}
	li {
		display: inline-block;
		padding: 0 1.5rem;
		@include intro-text;
		font-size: 1.2rem;
		letter-spacing: 3px;
		text-transform: uppercase;
		transition: 0.2s all linear;
		&:hover {
			cursor: pointer;
			opacity: 0.5;
		}
		a {
			text-decoration: none;
			color: $wh-black;
		}
		@include respond-to(sm) {
			display: block;
			padding-bottom: 2rem
		}
	}

}
</style>
