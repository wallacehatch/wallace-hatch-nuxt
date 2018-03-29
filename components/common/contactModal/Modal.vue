<template lang="html">
  <div v-show="lActive">
    <div id="contact_modal_mask" class="contact-modal-mask"></div>
    <div id="contact_modal_cont" @click="$emit('close')" class="contact-modal-cont">
      <div @click.stop id="contact_modal_inner_cont" class="inner-cont" style="transform: translateX(101%)">
        <div @click="$emit('close')" :class="{white: submitSuccess}" class="close-btn"><no-ssr><i class="fal fa-times"></i></no-ssr></div>
        <div class="contact-form-body">
          <p class="heading">Need to get in<br> contact with us?</p>
          <p class="subtext">Interested in working with us or learning more about<br class="hide-sm"> Wallace Hatch? Feel free to send us a message!</p>
          <form class="contact-form" method="post" @submit.prevent="validateForm">
            <contact-input
            iName="name"
            :iDisable="submitSuccess"
            :class="{disabled: submitSuccess}"
        		v-model="form.name"
        		:iValue="form.name"
            iValidate="required"
        		iPlaceholder="Full Name"
        		iClass="max">
        		</contact-input>

            <contact-input
            iName="email"
            :iDisable="submitSuccess"
            :class="{disabled: submitSuccess}"
        		v-model="form.email"
        		:iValue="form.email"
            iValidate="required|email"
        		iPlaceholder="Email"
            iType="email"
        		iClass="max">
        		</contact-input>

            <contact-input
            iName="company"
            :iDisable="submitSuccess"
            :class="{disabled: submitSuccess}"
            iOptional="true"
        		v-model="form.company"
        		:iValue="form.company"
        		iPlaceholder="Company"
        		iClass="max">
        		</contact-input>

            <div class="contact-text-area-cont">
              <span :class="{disabled: submitSuccess}" class="remaining-chars">{{textarea.chars}}/250</span>
              <textarea
              :disabled="submitSuccess"
              v-validate="'required'"
              maxlength="250"
              v-model="form.message"
              @focus="textarea.active = true"
              @blur="shouldBlurField"
              @keyup="setCharCount"
              :placeholder="errors.has('message') ? errors.first('message') : 'Enter Message'"
              name="message" id="" cols="30" rows="7"
              class="contact-text-area"
              :class="{disabled: submitSuccess, 'is-danger': errors.has('message'), active: textarea.active}"></textarea>
            </div>
            <button :disabled="submitSuccess" type="submit" class="contact-form-btn">{{buttonText}}</button>
          </form>
        </div>
        <div v-show="submitSuccess" id="success_overlay" class="success-overlay-cont">
          <no-ssr><i class="fal fa-envelope"></i></no-ssr>
          <p class="title">Thank You for<span class="hide-sm"> the message.</span><span class="sm-only"><br>the message.</span> </p>
          <p class="subtext">We are contiously perfecting our timepieces, when we have a moment we’ll get back to you.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
import ContactInput from './ContactInput';
import axios from 'axios';
export default {
  props: ['active'],
  components: {
    ContactInput,
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        company: '',
        message: '',
      },
      textarea: {
        chars: 0,
        active: false,
      },
      lActive: false,
      submitSuccess: false,
      // submitSuccess: true,
      buttonText: 'Send',
      dur: 500,

    }
  },
  methods: {
    validateForm() {
      this.$validator.validateAll().then((result) => {
        result && axios.post(process.env.API_URL + 'contact-form/',{
            name: this.form.name,
            email: this.form.email,
            company: this.form.company,
            message: this.form.message,
          }
        )
        .then((response) => {
          this.submitSuccess = true;
          setTimeout(() => {
            this.$emit('close');
          }, 2500)
        }, (error) => {
          console.log('Submission Error: ', error);
        })
      })
    },
    clearForm() {
      this.lActive = false;
      this.submitSuccess = false;
      this.buttonText = 'Send';
      this.form.name = null;
      this.form.email = null;
      this.form.company = null;
      this.form.message = null;
      this.textarea.chars = 0;
      this.errors.clear();
      document.getElementById('success_overlay').style.opacity = 0.0;
    },
    shouldBlurField(e) {
      if (!e.target.value) {this.textarea.active = false;}
    },
    setCharCount(e) {
      this.textarea.chars = e.target.value.length
    },
    toggleModal(active) {
      if (active) {
        this.lActive = true;
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          anime({
            targets: '#contact_modal_mask',
            opacity: 1.0,
            duration: this.dur,
            easing: 'easeInOutCubic'
          })
          anime({
            targets: '#contact_modal_inner_cont',
            translateX: 0,
            duration: this.dur,
            easing: 'easeInOutCubic'
          })
        })

      }
      else {
        document.body.style.overflow = 'initial';
        anime({
          targets: '#contact_modal_mask',
          opacity: 0,
          duration: this.dur,
          easing: 'easeInOutCubic'
        })
        anime({
          targets: '#contact_modal_inner_cont',
          translateX: '101%',
          duration: this.dur,
          easing: 'easeInOutCubic',
          complete: () => {
            this.clearForm();
            this.lActive = false;
          }
        })
      }
    }
  },
  mounted() {
    // uncomment this to have form always out
    // this.toggleModal(true);
  },
  watch: {
    'active' (newState) {
      this.toggleModal(newState);
    },
    'submitSuccess' (newState) {
      newState && anime({
        targets: '#success_overlay',
        opacity: 1.0,
        duration: this.dur,
        easing: 'easeOutCubic',
      })
    }
  }
}
</script>

<style lang="scss">
  @import '../../../assets/css/_variables.scss';
  .success-overlay-cont {
    background-color: #000;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding-top: 33%;
    opacity: 0.0;
    i {
      font-size: 42px;
      display: block;
      text-align: center;
      color: $wh-white;
    }
    .title {
      @include h5;
      color: $wh-white;
      font-size: 1.8rem;
    	line-height: 1.78;
    	letter-spacing: 5px;
      text-transform: uppercase;
      text-align: center;
      padding: 0 3.5rem;
      margin-top: 2rem;
      @include respond-to(sm) {
        font-size: 1.6rem;
        letter-spacing: 3px;
      }
    }
    .subtext {
      @include text-body;
      color: $wh-white;
      padding: 0 10rem;
      text-align: center;
      max-width: 40rem;
      margin: auto;
      margin-top: 1rem;
      @include respond-to(sm) {padding: 0 2rem;}
    }
  }
  .contact-modal-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    overflow: scroll;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0.0;
  }
  .contact-modal-cont {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    overflow: scroll;
    .inner-cont {
      background-color: $wh-white;
      box-shadow: -20px 0 20px 0 rgba(0, 0, 0, 0.1), -10px 0 14px 0 rgba(0, 0, 0, 0.2);
      max-width: 60rem;
      width: 66%;
      min-height: 100vh;
      position: absolute;
      right: 0;
      top: 0;
      transform: translateX(101%);
      -webkit-transform: translateX(101%);
      @include respond-to(sm) {
        width: 94%;
      }
    }
    .close-btn {
      font-size: 32px;
	    font-weight: 300;
      width: 2.4rem;
      height: 3.2rem;
      float: right;
      position: relative;
      z-index: 1;
      margin: 2rem 2rem 1.8rem 2rem;
      transition: 0.2s all linear;
      &.white {color: $wh-white;}
      &:hover {
        cursor: pointer;
        color: #262626;
      }
      @include respond-to(sm) {
        margin: 1rem 1rem 0 0;
      }
    }
    .contact-form-body {
      clear: both;
      padding: 9.3rem 5rem;
      padding-top: 0;
      @include respond-to(sm) {
        padding: 0 2rem 3rem 2rem;
      }
    }
    .heading {
      @include h5;
      font-size: 1.8rem;
      line-height: 1.78;
	    letter-spacing: 5px;
      text-transform: uppercase;
      padding-bottom: 1rem;
      @include respond-to(sm) {font-size: 1.6rem;}
    }
    .subtext {
      @include text-body;
      line-height: 1.71;
	    letter-spacing: 0.2px;
      padding-bottom: 5rem;
      @include respond-to(sm) {
        padding-bottom: 2rem;
      }
    }
    .contact-form {
      width: 100%;
      overflow: visible;
      .field-cont {
        // width: calc(100% - 4px);
        margin-bottom: 1rem;
      }

    }
  }

  .contact-text-area {
    background-color: #ffffff;
  	// box-shadow: 0 17px 20px 0 rgba(0, 0, 0, 0.1), 0 4px 14px 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.05), 0 4px 4px 0 rgba(0, 0, 0, 0.1);
  	border: solid 1px #d1d1d1;
    overflow: visible;
    @include text-body;
    padding: 2rem 2rem;
    width: 100%;
    box-sizing: border-box;
    resize: none;
    outline: none;
    transition: 0.15s all ease;
    &::-webkit-input-placeholder {color: #000}
    &:-moz-input-placeholder {color: #000}
    &::-moz-input-placeholder {color: #000}
    &::-ms-input-placeholder {color: #000}
    &:focus, &.active {
      border-color: #000;
      border-width: 2px;
      padding: 1.9rem 2rem;
      box-shadow: 0 7px 10px 0 rgba(0, 0, 0, 0.1), 0 4px 4px 0 rgba(0, 0, 0, 0.2);
    }
    &.is-danger {
      border-color: $wh-red !important;
      &::-webkit-input-placeholder {color: $wh-red}
      &:-moz-input-placeholder {color: $wh-red}
      &::-moz-input-placeholder {color: $wh-red}
      &::-ms-input-placeholder {color: $wh-red}
    }
    &.disabled {
      color: #d1d1d1;
      background-color: #fafafa;
      border-color: #d1d1d1 !important;
      &::-webkit-input-placeholder {color: #d1d1d1}
      &:-moz-input-placeholder {color: #d1d1d1}
      &::-moz-input-placeholder {color: #d1d1d1}
      &::-ms-input-placeholder {color: #d1d1d1}

    }
  }
  .contact-text-area-cont {
    position: relative;
    overflow: visible;
    .remaining-chars {
      position: absolute;
      top: 1.2rem;
      right: 1.2rem;
      @include text-body;
      font-size: 1rem;
      &.disabled {color: #d1d1d1;}
    }
  }
  .contact-form-btn {
    background-color: $wh-black;
    padding: 1.3rem 5.2rem;
    box-shadow: 0 7px 13px 0 rgba(95, 95, 95, 0.5), 0 1px 3px 0 rgba(149, 149, 149, 0.2);
    @include intro-text;
    color: $wh-white;
    margin-top: 2rem;
    float: right;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 0;
    outline: none;
    transition: 0.2s all linear;
    margin-bottom: 3rem;
    &:hover {
      cursor: pointer;
      background-color: #262626;
    }
    @include respond-to(sm) {
      font-size: 1.4rem;
      width: 100%;
    }
  }

</style>
