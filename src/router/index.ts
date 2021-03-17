import Vue from "vue";
import VueRouter from "vue-router";

import ProductDisplay from '../components/ProductsDisplay.vue';
import ProductEditor from '../components/ProductEditor.vue';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: "/", component: ProductDisplay },
        { path: "/edit", component: ProductEditor }
    ]
})