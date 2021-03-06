import Vue from "vue";
import VueRouter from "vue-router";

import ProductDisplay from '../components/ProductsDisplay.vue';
import ProductEditor from '../components/ProductEditor.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [
        {  name:"table", path: "/", component: ProductDisplay, alias:"/list" },
        {  name: "editor", path: "/:op(create|edit)/:id(\\d+)?", component: ProductEditor },  
        { path: "*", redirect: "/" }    
    ]
})