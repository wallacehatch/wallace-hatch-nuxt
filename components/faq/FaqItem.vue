<template lang="html">
  <div :class="{'load-mask': !loaded}" >
    <hr class="faq-divider ab">
    <div :id="'cont' + qKey" class="faq-item-cont" @click="handleExpand">
      <div :id="'header' + qKey" class="question-header">
        <h4 class="title">{{question}}</h4>
        <div v-show="!!expanded" @click="handleExpand" class="expand-arrow"><no-ssr><i class="fal fa-angle-up"></i></no-ssr></div>
        <div v-show="!expanded" @click="handleExpand" class="expand-arrow"><no-ssr><i class="fal fa-angle-down"></i></no-ssr></div>
      </div>
      <p :id="'answer' + qKey" class="body-info" v-html="answer"></p>
    </div>
  </div>
</template>

<script>
import anime from 'animejs';
export default {
  props: ['question', 'answer', 'qKey'],
  data() {
    return {
      expanded: false,
      loaded: false,
    }
  },
  mounted() {
    setTimeout(() => {
      const cont = document.getElementById('cont' + this.qKey);
      const header = document.getElementById('header' + this.qKey);
      console.log('Header Height');
      console.log(header.getBoundingClientRect().height);
      cont.style.height = String(header.getBoundingClientRect().height + 20) + 'px';
      this.loaded = true;
    },400)
  },
  methods: {
    handleExpand() {
      this.expanded = !this.expanded;
      const cont = document.getElementById('cont' + this.qKey);
      const header = document.getElementById('header' + this.qKey);
      const answer = document.getElementById('answer' + this.qKey);
      console.log(header.getBoundingClientRect().height);
      const newHeight = this.expanded ? answer.getBoundingClientRect().height + header.getBoundingClientRect().height : header.getBoundingClientRect().height + 20;
      if (this.expanded) {answer.style.opacity = 1.0;}
      anime({
        targets: '#cont' + this.qKey,
        height: newHeight,
        duration: 500,
        easing: 'easeInOutCubic',
        complete: () => {
          if(!this.expanded) {answer.style.opacity = 0.0;}
        }
      });
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.faq-item-cont {
  overflow-y: hidden;
  overflow-x: visible;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
}
.question-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding-top: 2rem;
  .title {
    @include intro-text;
    letter-spacing: 2.6px;
    font-size: 1.4rem;
    font-weight: 400;
    text-transform: uppercase;
    padding-right: 2rem;
    display: inline-block;

  }
  .expand-arrow {
    // float: right;
    display: inline-block;
    font-size: 2.8rem;
    pointer-events: none;
  }
}

.faq-item-cont .body-info {
  @include text-body;
  padding-bottom: 3rem;
  padding-top: 1rem;
  opacity: 0;
  @include respond-to(sm) {
    padding-bottom: 2rem;
  }
}
</style>
