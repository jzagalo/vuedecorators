import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios";
import PrefsModule from "./preferences";
import NavModule from "./navigation";

Vue.use(Vuex)

const baseUrl = "http://localhost:3500/products/"

export default new Vuex.Store({
  modules: {
    prefs: PrefsModule,
    nav: NavModule
  },
  state: {
    products: [],
    selectedProduct: null
  },
  mutations: {
      saveProduct(currentState: any, product: any){        
        const index = currentState.products.findIndex((p: any) => p.id === product.id);
        if(index == -1){
          currentState.products.push(product);
        } else{
          Vue.set(currentState.products, index, product);
        }
      },
      deleteProduct(currentState, product){
        const index = currentState.products.findIndex((p: any) => p.id === product.id);
        currentState.products.splice(index, 1); 
      },
      selectedProduct(currentState, product){
        currentState.selectedProduct = product;
      }
  },
  getters: {
    orderedProducts(state: any){
      return state.products.concat().sort(
        (p1: any, p2: any) => p2.price - p1.price);
    },
    filteredProducts(state: any, getters: any){
      return (amount: number) => getters.orderedProducts.filter((p: any) => p.price > amount);
    }
  },
  actions: {
    async getProductsAction(context: any){
      (await Axios.get(baseUrl)).data.forEach((p: any) => context.commit("saveProduct", p));
    },
    async saveProductAction(context: any, product: any) {
      const index = context.state.products.findIndex((p: any) => p.id == product.id);

      if (index == -1) {
        await Axios.post(baseUrl, product);
      } else {
        await Axios.put(`${baseUrl}${product.id}`, product);
      }

      context.commit("saveProduct", product);
    }
  }

})
