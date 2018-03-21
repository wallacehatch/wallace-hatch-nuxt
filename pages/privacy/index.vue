<template lang="html">
  <div class="legal-cont">
    <h3 class="section-title">Privacy Policy</h3>

    <h4 class="body-section-title">Personal Information</h4>
    <p class="body-info">At Wallace Hatch we are dedicated to create a safe and enjoyable shopping experience for you. In this text we want to inform you about our website procedures; what we do, how we do it and how it affects you.</p>
    <p class="body-info">When shopping at www.wallacehatch.com we may collect personal information you provide us when making a purchase as well as data collected by cookies.</p>

    <h4 class="body-section-title">What are cookies?</h4>

    <p class="body-info">Cookies are very small text files that are stored on your device’s hard drive when you visit websites. We use first-party cookies and third-party cookies for the main purposes of; web functionality, web statistics and advertising.</p>

    <h4 class="body-section-title">Why do we use cookies?</h4>
    <p class="body-info">Some cookies are vital in order for the website to function properly. The cookies keep track of your settings and make your shopping experience more convenient by e.g. recognizing your device and remembering your preferences and settings.</p>
    <p class="body-info">Cookies are also used to collect usage data such as duration of session, pages viewed, if a transaction was made or demographic data such as origin, gender and age. This information is used for analytical purposes and enables us to create the best shopping experience for you. The cookies we use do not collect any information that can be used to track or identify individuals.</p>

    <h4 class="body-section-title">What information do we collect?</h4>
    <p class="body-info">All taxes are calculated and included in the final price communicated at the end of your order. Wallace Hatch is required by law to declare an accurate value on all shipments.</p>
    <p class="body-info">We collect information you provide us with when signing up for our newsletter or when making a purchase. This information could be your name, address, contact information etc. The cookies may collect session information such as pages viewed, session duration, transactions made and demographics such as origin, gender and age.</p>

    <h4 class="body-section-title">Third-parties</h4>
    <p class="body-info">The information we collect may be shared with our close partners for analytical purposes. No personal information will be passed forward, traded or published beyond our organization and our trusted partners.</p>

    <h4 class="body-section-title">Disclosures of your information</h4>
    <p class="body-info">You have the right to request access to your data and if anything is incorrect you can change or remove it.</p>
    <p class="body-info">You can disable any already stored cookies on your computer by changing your browser settings for cookies, you can also use opt-out programs such as “NAI’s Consumer opt-out” or “Google Analytics opt-out browser add-on” in order to prevent cookies from being used, please keep in mind that these settings may stop our website from functioning properly.</p>

    <h4 class="body-section-title">Updates</h4>
    <p class="body-info">Our Privacy Policy may change from time to time, all updates will be posted on this page.</p>
  </div>
</template>

<script>
export default {
  // scrollToTop: true,
  // mounted() {
  //   window.scrollTo(0,0);
  // }
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.legal-cont {
  width: calc(100% - 8rem);
  max-width: 75rem;
  margin: 7rem auto;
  @include respond-to(sm) {
    width: calc(100% - 3rem);
    margin: 5.5rem auto;
  }
  .section-title {
    @include h4;
    font-size: 2.8rem;
    letter-spacing: 6px;
    text-transform: uppercase;
    text-align: center;
    padding: 8rem 0 1rem 0;
    @include respond-to(sm) {
      padding: 3rem 0 0 0;
      font-size: 2.4rem;
      letter-spacing: 5px;
    }
  }
  .body-section-title {
    @include intro-text;
    font-size: 1.4rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding-bottom: 1rem;
    padding-top: 2rem;
  }
  .body-info {
    @include text-body;
  }
}
</style>
