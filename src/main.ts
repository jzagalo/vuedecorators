import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RestDataSource } from "./data/restDataSource";
import router from './router';

Vue.config.productionTip = false

new Vue({
  store,  
  router, 
  provide: () => ({ 
    eventBus: new Vue(),
    restDataSource: new RestDataSource(new Vue())
  }),
  render: h => h(App),
}).$mount('#app')
