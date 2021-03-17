import Vue from "vue";
import VueRouter from "vue-router";

import ProductDisplay from '../components/ProductsDisplay.vue';
import ProductEditor from '../components/ProductEditor.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [
        {  path: "/", component: ProductDisplay, alias:"/list" },
        { path: "/:op(create|edit)/:id(\\d+)?", component: ProductEditor },      
    ]
})