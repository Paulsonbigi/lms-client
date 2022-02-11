import Vue from 'vue'
import Notifications from 'vue-notification'
import { StripeCheckout } from '@vue-stripe/vue-stripe';


Vue.use(Notifications);
export default (context, inject) => {
  inject('notify', Vue.notify)
}
Vue.component('stripe-checkout', StripeCheckout);
