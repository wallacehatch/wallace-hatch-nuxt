
import store from './store';
const svc = {}

svc.handleCouponActivation = handleCouponActivation;
svc.triggerCoupon = triggerCoupon;
svc.setCouponOpenTime = setCouponOpenTime;

const couponKey  = "couponOpenTime"
const pageKey = "pageOpenTime"

function handleCouponActivation() {
  setPageOpenTime();
  var interval = setInterval(() => {
    var nowDate = new Date();
    var time = getPageOpenTime();
    // open coupon modal if page have been open for a minute and user has not seen coupon previously
    if ((nowDate.getTime() - time > 5000) && (getCouponOpenTime() == null)) {
      triggerCoupon();
    }
  }, 10000)
}

function resetCouponOpenTime() {
  localStorage.setItem(couponKey, null);
}

function getCouponOpenTime() {
    return JSON.parse(localStorage.getItem(couponKey));
}

function getPageOpenTime() {
  return JSON.parse(localStorage.getItem(pageKey));

}
function setPageOpenTime() {
  let time = new Date();
  localStorage.setItem(pageKey, JSON.stringify(time.getTime()));
}

function setCouponOpenTime() {
  let time = new Date();
  // only set time for coupon opening if it hasn't been previously set to keep original opening time
  if (getCouponOpenTime() == null) {
      localStorage.setItem(couponKey, JSON.stringify(time.getTime()));
  }
}

function triggerCoupon() {
  setCouponOpenTime();
  store.commit('SET_COUPON_MODAL_ACTIVE', true);
}


export default svc
