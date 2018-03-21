<template>
   <div class="countdown-cont">
      <div class="countdown-inner-cont">
      	<div class="countdown-info-large">
         <div class="countdown-title">
            <h1 class="uppercase">Welcome to <br> Wallace Hatch</h1>
            <h4 class="twitter-handle uppercase sans-serif">@wallachatch</h4>
         </div>
         <hr class="break-line">
         </hr>
         <div class="countdown-body">
            <p class="body-text">The story behind Wallace Hatch is one of collective experience. Our founders have spent years immersed in a world of design, travel, and discovery. This journey led them to develop a sincere appreciation for the avant-garde boroughs they encountered while traveling.</p>
            <br><br>
            <p class="body-text">From candle-lit cocktail bars in SoHo to eclectic bookstores in the SF Mission, our founders saw these neighborhoods as mavens of truly original style.  Struck by the beautiful tenacity of these places and the individuals who inhabited them, our founders set out to create Wallace Hatch.</p>
            <br><br>
            <p class="body-text">The Wallace Hatch brand is, at it’s core, a reflection of this inspired lifestyle. Our watches embody uptown style and simplistic elegance.  Designed to be breath-taking yet versatile, they provide the perfect compliment to an empowered self.</p>
         </div>
     </div>
         <div class="getting-close-cont">
            <h1 class="uppercase">We're getting<span class="hide-sm"> close</span><span class="sm-only"><br class="sm-only">close</span></h1>
            <h4 class="new-site-text uppercase sans-serif">To launching our new site</h4>
         </div>
         <hr class="break-line">
         </hr>
         <timer></timer>
      </div>
      <div class="email-input-cont">
         <div class="live-cont">
            <h4 class="uppercase sans-serif">We can Email you once we're live</h4>
         </div>
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
         <div class="std-checkbox-cont">
            <input type="checkbox" checked id="request-demo-cb">
            <label for="request-demo-cb">Send me the newsletter</label>
         </div>
      </div>
      <div class="countdown-info-small">
         <div class="countdown-title">
            <h1 class="uppercase">Welcome to <br> Wallace Hatch</h1>
            <h4 class="twitter-handle uppercase sans-serif"><a href="https://www.instagram.com/wallacehatch/?hl=en">@wallacehatch</a></h4>
         </div>
         <hr class="break-line">
         </hr>
         <div class="countdown-body">
            <p class="body-text">The story behind Wallace Hatch is one of collective experience. Our founders have spent years immersed in a world of design, travel, and discovery. This journey led them to develop a sincere appreciation for the avant-garde boroughs they encountered while traveling.</p>
            <br><br>
            <p class="body-text">From candle-lit cocktail bars in SoHo to eclectic bookstores in the SF Mission, our founders saw these neighborhoods as mavens of truly original style.  Struck by the beautiful tenacity of these places and the individuals who inhabited them, our founders set out to create Wallace Hatch.</p>
            <br><br>
            <p class="body-text">The Wallace Hatch brand is, at it’s core, a reflection of this inspired lifestyle. Our watches embody uptown style and simplistic elegance.  Designed to be breath-taking yet versatile, they provide the perfect compliment to an empowered self.</p>
         </div>
     </div>
   </div>
   </div>
</template>

<script>
import Timer from '@/components/countdown/Timer'
import StdInput from '@/components/common/StdInput'
import axios from 'axios';
export default {
  name: 'Countdown',
  components:{
  	Timer,
  	StdInput,
  },
  data () {
    return {
    	newsletter: {
				email: '',
				submitted: false,
				error: null,
			},
    }
  },
	methods: {
		handleFieldSubmit() {
			axios({
			  method: 'post',
			  url: process.env.API_URL + '/email-signup/',
			  data: {
			    email: this.newsletter.email,
			 	subscribed: false,
			  }
			})
			  .then(function (response) {
			    console.log(response);
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
		},
	}
}
</script>

<style lang="scss">
@import '../../styles/_variables.scss';
.countdown-cont {
    text-align: center;
    .countdown-inner-cont {
        margin-right: auto;
        margin-left: auto;
        max-width: 60rem;
        margin-top: 15.6rem;
        margin-bottom: 2rem;
        @include respond-to(sm) {
        	margin-top: 4rem;
          margin-bottom: 0;
        }

    }
    .countdown-info-small {
        margin-top: 2rem;
        margin-bottom: 5rem;
         @include respond-to(sm) {
            display: block !important;

        }
        @include respond-to(lg) {
            display: none;
        }

    }
    .countdown-info-large {
        @include respond-to(sm) {
            display: none;
        }
    }
    .countdown-title{
    	h1{
    	 @include respond-to(sm) {
            font-size: 20px;
            letter-spacing: 6px;
            line-height: 36px;
        }
      }

    }
    .countdown-body {
        max-width: 55rem;
        width: calc(100% - 3rem);
        margin-right: auto;
        margin-left: auto;
      .body-text {
        line-height: 1.9;
   	    letter-spacing: 0.2px;
        text-align: left;
        @include respond-to(sm) {
          font-size: 12px;
          // padding: 1.5rem;
            // letter-spacing: .3rem;
        }
    }
    }


    .email-input {
        margin: 0 auto;
        max-width: 38rem;
        width: calc(100% - 4rem);
    }
    .email-input-cont {
        margin-top: 6rem;
        margin-bottom: 12rem;
        @include respond-to(sm) {
            margin: 0;
        }
    }
    .getting-close-cont {
        margin-top: 10rem;
        h1{
        	 @include respond-to(sm) {
            font-size: 20px;
            letter-spacing: 6px;
            line-height: 1.8;

        }
        }
        h4{
        	 @include respond-to(sm) {
            font-size: 12px;
            letter-spacing: .3rem;
        }
        }
    }


    .twitter-handle {
        margin-top: 1rem;
        font-weight: 500;
        @include respond-to(sm) {
          font-size: 1.2rem;
          line-height: 2.0;
	        letter-spacing: 3px;
        }
    }
    .countdown-box-cont {
        margin-left: auto;
        margin-right: auto;
        width: 300px;
        height: 100px;
        background-color: #ffffff;
        border: solid 3px #000000;
    }
    .new-site-text {
        margin-top: 1rem;
        font-weight: 500;
    }
    .std-checkbox-cont {
        clear: both;
        display: inline-block;
        position: relative;
        text-align: left;
        padding: 3.7rem 0;
        margin-top: -6rem;
        input {
            display: none;
        }
        label {
            @include text-body          margin-left: 4rem;
            display: inline-block;
            pointer-events: none;
            @include respond-to(sm) {
                padding-left: 1rem;
            }
            &:before {
                transition: 0.1s all linear;
                pointer-events: initial;
                border-radius: 2px;
                content: '';
                position: absolute;
                left: 0;
                top: 3.3rem;
                display: block;
                height: 2.9rem;
                width: 2.9rem;
                background-color: #ffffff;
                box-shadow: 0 17px 20px 0 rgba(0,0,0,0.1),0 4px 14px 0 rgba(0,0,0,0.2);
                border: solid 1px #d1d1d1;
                background-size: 60%;
                background-position: center;
                background-repeat: no-repeat;
                box-sizing: border-box;
            }
        }
        input:checked+label:before {
            box-shadow: 0 7px 10px 0 rgba(0,0,0,0.1),0 4px 4px 0 rgba(0,0,0,0.2);
            border: solid 3px #000000;
            background-image: url('https://s3-us-east-2.amazonaws.com/vest-client-2-ohio/sm-checkmark-black.svg');

        }
    }
    .live-cont {
        margin-left: auto;
        margin-right: auto;
        margin-top: 6rem;
        width: 24rem;
        margin-bottom: 3rem;
        @include respond-to(sm) {
            margin-bottom: 2.2rem;
            margin-top: 4rem;
        }
        h4 {
            font-weight: 500;
        	 @include respond-to(sm) {
            font-size: 1.2rem;
            line-height: 2.0;
	          letter-spacing: 3px;
        }

        }
    }
    .break-line {
        margin-left: auto;
        margin-right: auto;
        margin-top: 5rem;
        margin-bottom: 3rem;
        text-align: center;
        background-color: black;
        width: 36px;
        height: 4px;
        @include respond-to(sm) {margin: 3rem auto;}
    }
}


</style>
