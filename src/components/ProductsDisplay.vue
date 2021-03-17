<template>
 <div>
    <table class="table table-sm table-bordered" :class="{'table-striped': useStripedTable }">
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
          <router-link class="btn btn-sm"
            :to="'/edit/' + p.id " :class="editClass" >
            Edit
          </router-link>
          &nbsp;&nbsp;&nbsp;
          <button class="btn btn-sm btn-danger"
            v-on:click="deleteProduct(p)" :class="deleteClass">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
    </table>
    <div class="text-center">
      <router-link class="btn btn-primary"  to="/create">
            Create New
      </router-link>
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
  @Mutation("deleteProduct") deleteProduct!: () => void;  
  @Mutation("selectedProduct") selectProduct!: (product?: productType) => void;
  @State("products") products!: productType[];
  @State(state => state.prefs.stripedTable) useStripedTable!: boolean;
  @Getter("prefs/tableClass") tableClass!: string;
  @Getter("prefs/editClass") editClass!: string;
  @Getter("prefs/deleteClass") deleteClass!: string;
  @Mutation("prefs/setEditButtonColor") setEditButtonColor!: (val: boolean) => void;
  @Mutation("prefs/setDeleteButtonColor") setDeleteButtonColor!: (val: boolean) => void;
 
  created() {   
    this.setEditButtonColor(false);
    this.setDeleteButtonColor(false);
  }  

  editProduct(product: productType){
    this.selectProduct(product);
    this.$router.push("/edit");   
  } 
  
  createNew(){
    this.selectProduct();
    this.$router.push("/edit");  
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
