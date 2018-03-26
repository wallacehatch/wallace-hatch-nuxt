<template lang="html">
  <div class="faq-cont">
    <h3 class="section-title">FAQ</h3>
    <faq-item v-for="(question, i) in questions" :key="'faq_item_' + i" :qKey="'faq_item_' + i" :question="question.question" :answer="question.answer"></faq-item>
    <hr class="faq-divider">

  </div>
</template>

<script>
import FaqItem from '@/components/faq/FaqItem';
export default {
  head() {
    return {
      title: 'Frequently Asked Questions - Wallace Hatch',
      meta: [
        { hid: 'og-title', property: 'og:title', content: 'Frequently Asked Questions - Wallace Hatch'},
        { hid: 'og-description', property: 'og:description', content: 'When will my order ship? After your payment is verified, \
        it takes up to 24 hours to process and ship your order. This does not include weekends or holidays. Purchases made \
        after 9 am PST will not be shipped out until the next business day. If you order after 9 am PST on a Friday, your order \
        will likely be shipped out on the following Monday.' },
        {hid: 'description', name: 'description', content: 'When will my order ship? After your payment is verified, \
        it takes up to 24 hours to process and ship your order. This does not include weekends or holidays. Purchases made \
        after 9 am PST will not be shipped out until the next business day. If you order after 9 am PST on a Friday, your order \
        will likely be shipped out on the following Monday.'}
      ]
    }
  },
  components: {
    FaqItem,
  },
  data() {
    return {
      questions: [{
        question: 'WHEN WILL MY ORDER SHIP',
        answer: "After your payment is verified, it takes up to 24 hours to process and ship your order. This does not include weekends or holidays. Purchases made after 9 am PST will not be shipped out until the next business day. If you order after 9 am PST on a Friday, your order will likely be shipped out on the following Monday."
      }, {
        question: 'WILL I HAVE TO PAY INTERNATIONAL TAXES & DUTIES?',
        answer: "Your order may be subject to import duties and taxes, which are levied once a shipment reaches your country. The general amount for the duties and taxes fee is about 20% of the dollar amount of the merchandise. However, this is just a general guideline and may vary depending on \
        the country to which the order was shipped. You should contact your customs office for specific amounts and percentages.<br><br>Wallace Hatch cannot control and is not responsible for any duties/taxes applied to your package. You will be responsible for paying additional charges for customs \
        clearance. Customs policies vary widely from country to country; please contact your local customs office for further information. Note, in rare occasions custom agents may delay delivery of some packages."
      }, {
        question: 'HOW ARE TAXES AND DUTIES CALCULATED?',
        answer: "For Duties Delivered Paid (DDP) Orders: Duties and taxes may be included in the price depending on ship to country. If not included in the price, they will be shown at checkout.<br><br>For Duties Delivered Unpaid (DDU) Orders: As the customer, you are liable for all import duties, customs and taxes levied. Payment of these is required to release your order from customs on arrival."
      }, {
        question: 'I NEED TO CHANGE SOMETHING ON MY ORDER. HOW CAN I DO THAT?',
        answer: "If you need to change or cancel your order, please contact us immediately. Once our warehouse has processed your order, we will be unable to make any changes."
      }, {
        question: 'What type of movement is used?',
        answer: "We chose a movement that would be both reliable, efficient, and durable. With this said, we went with a Japanese Miyota GL20 Precision Quartz Movement which is one of the most highly regarded in the industry."
      }, {
        question: 'ARE WALLACE HATCH WATCHES WATERPROOF?',
        answer: "Our watches have a water resistance of 3 ATM. Please avoid all contact with water, as WATER DAMAGE IS NOT COVERED UNDER WARRANTY."
      }, {
        question: 'WHAT TYPE OF LEATHER IS USED?',
        answer: "Our leather straps are made of genuine cow-hide leather."
      }, {
        question: 'Is there a warranty?',
        answer: "Wallace Hatch has a limited warranty that covers manufacturer's defects for two years after the original purchase date from an authorized dealer. Basically, if the watch parts or mechanics don't work properly, and it's our fault, we will repair or replace your product for free. However, this does not cover any abuse you might put your watch through on your own. The warranty does not cover water damage, normal wear and tear, batteries, accidental glass damage, scratches, strap damage, or theft. Proof of purchase is required for all warranty claims and service requests, so please keep your receipt. If you've purchased from our site, the order number will suffice; otherwise you will need to send us a copy of the receipt from an authorized Wallace Hatch dealer."
      }]
    }
  },
  mounted() {
    window.scrollTo(0,0);
  }
}
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';
.faq-cont {
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
    padding: 5rem 0 3rem 0;
    @include respond-to(sm) {
      padding: 3rem 0;
      font-size: 1.8rem;
      letter-spacing: 5px;
    }
  }
  .faq-divider{
    border: none;
    height: 1px;
    background-color: #d8d8d8;
    width: calc(100% + 3rem);
    margin-left: -1.5rem;
  }
}
</style>
