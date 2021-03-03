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
        <td>{{ p.price | currency }}</td>
        <td>
          <button class="btn btn-sm btn-primary"
            v-on:click="editProduct(p)">
            Edit
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

@Component({
  filters: {
    currency:  (value: any) => `$${value.toFixed(2)}`,
  }
})
export default class ProductsDisplay extends Vue {

  private products = [
   
  ];  

  @Inject("eventBus") eventBus: any;
  @Inject("restDataSource") restDataource: any;

  async created(){
    this.processProducts(await this.restDataource.getProducts());   
  }

  editProduct(product: any){
    this.eventBus.$emit("edit", product);
  }

  createNew(){
    this.eventBus.$emit("create");
  }

  processProducts(newProducts: []){
    this.products.splice(0);
    this.products.push(...newProducts);
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
