import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [
      { id: 1, name: "Product #1", category: "Test", price: 100 },
      { id: 2, name: "Product #2", category: "Test", price: 150 },
      { id: 3, name: "Product #3", category: "Test", price: 200 }
    ]
  },
  mutations: {
      saveProduct(currentState: any, product){
        const index = currentState.products.findIndex((p: any) => p.id === product.id);
        if(index == -1){
          currentState.products.push(product);
        }else{
          Vue.set(currentState.products, index, product);
        }
      },
      deleteProduct(currentState, product){
        const index = currentState.products.findIndex((p: any) => p.id === product.id);
        currentState.products.splice(index, 1); 
      }
  },
  getters: {
    orderedProducts(state: any){
      return state.products.concat().sort(
        (p1: any, p2: any) => p2.price-p1.price);
    },
    filteredProducts(state: any, getters: any){
      return (amount: number) => getters.orderedProducts.filter((p: any) => p.price > amount);
    }
  },
  actions: {
  },
  modules: {
  }
})
