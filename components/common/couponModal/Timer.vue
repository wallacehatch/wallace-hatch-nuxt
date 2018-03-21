<template>
    <div class="timer-cont">
        <div class="timer-box-cont">
            <div class="timer-digit-box open-sans">
                <div class="box">
                    <p class="timer-text open-sans">{{minutes}}</p>
                    <p class="timer-description-text uppercase sans-serif">minutes</p>
                </div>
                 <span class="colon">:</span>
                <div class="box">
                    <p class="timer-text open-sans">{{seconds}}</p>
                    <p class="timer-description-text uppercase sans-serif">seconds</p>
                </div>
            </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Timer',
    data() {
        return {
            date: Math.trunc((new Date(2018, 11,10)) / 1000),
            now: Math.trunc((new Date()).getTime() / 1000),
        }
    },
    computed: {
         seconds() {
            var seconds =  (this.date - this.now) % 60;
            if (seconds < 0) {
              seconds = 0
            }
            if (seconds.toString().length == 1){
                seconds = "0" + seconds.toString()
            }

            return seconds.toString()
        },
        minutes() {
            var minutes = Math.trunc((this.date - this.now) / 60) % 60;
            if (minutes < 0) {
              minutes = 0
            }
            if (minutes.toString().length == 1){
                minutes = "0" + minutes.toString()
            }
            return minutes.toString()
        },
    },
    mounted() {
      let now = new Date()
      let diff  = 20  // initial leangth of time until coupon submission expiration
        var interval = setInterval(() => {
          let nowDate = new Date();
            this.now = Math.trunc(nowDate.getTime() / 1000)
        }, 1000)
        let future = new Date(now.getTime() + diff*60000);
        this.date = Math.trunc(future / 1000)
    },
}
</script>
<style lang="scss">
@import '../../../assets/css/_variables.scss';
.timer-box-cont {
    margin-left: auto;
    margin-right: auto;
    width: 20rem;
    height: 10rem;
    background-color: #ffffff;
    margin-top: 2.5rem;
    border: solid 3px #000000;
    @include respond-to(sm) {
            width: 28rem;
            // letter-spacing: .3rem;
        }


    .timer-digit-box{
        margin:0 auto;
         margin-top: 1.8rem;
        .box{
            display: inline-block;
            .timer-description-text{

                font-size: 10px;
                letter-spacing: 1px;
            }
             .timer-text{
                text-indent: .78rem;
                font-size: 2.8rem;
                font-weight: 300;
                 letter-spacing: .78rem;
            }
        }
        .colon{
            position: relative;
            top: -2.7rem;
            font-size: 2.8rem;
            font-weight: 300;
        }
    }

}




</style>
