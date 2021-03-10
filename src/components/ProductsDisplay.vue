<template>
 <div>
    <table class="table table-sm table-striped table-bordered">
      <tr>
        <th>ID</th><th>Name</th><th>Category</th><th>Price</th><th></th>
      </tr>
    <tbody>
      <tr v-for="p in products" v-bind:key="p.id">
        <td>{{ p.id }}</td>
        <td>{{ p.name }}</td>
        <td>{{ p.category }}</td>
        <td>{{ p.price | currency  }}</td>
        <td>
          <button class="btn btn-sm btn-primary"
            v-on:click="editProduct(p)" >
            Edit
          </button>
          &nbsp;&nbsp;&nbsp;
          <button class="btn btn-sm btn-danger"
            v-on:click="deleteProduct(p)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
    </table>
    <div class="text-center">
      <button class="btn btn-primary" 
            v-on:click="createNew">
            Create New
      </button>
    </div>
 </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator';
import { Action, State, Getter, Mutation } from "vuex-class";

type productType = {
  id: number;
  name: string;
  category: string;
  price: number;
}; 

@Component({
  filters: {
    currency:  (value: any) => `$${parseFloat(value).toFixed(2)}`,
  }
})
export default class ProductsDisplay extends Vue {

  @Inject("eventBus") eventBus: any;
  @Inject("restDataSource") restDataource: any;
  @Action("getProductsAction") getProducts!: () => void;
  @Mutation("deleteProduct") deleteProduct!: () => void;
  @Mutation("selectedProduct") createNew!: () => void;
  @Mutation("selectedProduct") editProduct!: () => void;
  @State("products") products!: productType[];

  async created() {    
    this.getProducts();
    this.eventBus.$on("complete", this.processComplete); 
  }  

  processProducts(newProducts: any){
    this.products.splice(0);       
    this.products.push(...newProducts);
  }

  async processComplete(product: productType){    
    const index = this.products.findIndex((p: productType) => p.id == product.id);
    
    if(index == -1){       
      await this.restDataource.saveProduct(product);
      this.products.push(product);
    } else {     
      await this.restDataource.updateProduct(product);
      Vue.set(this.products, index, product);
    }
  } 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
