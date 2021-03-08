import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RestDataSource } from "./data/restDataSource";

Vue.config.productionTip = false

new Vue({
  store,   
  provide: () => ({ 
    eventBus: new Vue(),
    restDataSource: new RestDataSource(new Vue())
  }),
  render: h => h(App),
}).$mount('#app')
