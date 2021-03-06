<template>
    <div>
      <h3 class="btn-primary text-center text-white p-2">
      {{ editing ? "Edit" : "Create"}}
      </h3>
      <editor-field v-bind:label="idLabel" :property.sync="product.id"  name="id"></editor-field>      
      <editor-field v-bind:label="nameLabel" :property.sync="product.name" name="name"></editor-field>
      <editor-field v-bind:label="categoryLabel" :property.sync="product.category" name="category"></editor-field>
      <editor-field v-bind:label="priceLabel" :property.sync="product.price" name="price"></editor-field>
      <div class="text-center"> 
        <button class="btn btn-primary" @click="save">
          {{ editing ? "Save": "Create" }}
        </button>        
        <router-link v-bind:to="{name: 'table'}" class="btn btn-secondary"> Cancel </router-link>
        <router-link v-if="editing" v-bind:to="nextUrl" class="btn btn-info"> Next </router-link>
     </div>    
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Inject, Watch } from 'vue-property-decorator';
import EditorField from "./EditorField.vue";


type productType = {
  id: number | string;
  name: string;
  category: string;
  price: number;
}; 

@Component({
  components: {
    EditorField,
  }
})
export default class ProductEditor extends Vue {
  private editing = false;
  private product: any = {};
  private idLabel = "ID";
  private nameLabel = "Name";
  private categoryLabel = "Category";
  private priceLabel = "Price";
  private unWatcher!: any;
  private localBus = new Vue();
  @Inject("eventBus") private eventBus: any;
  @Provide() private editingEventBus = this.localBus;

  startEdit(product: any) {
    this.editing = true;
    this.product = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price
    };
  }

  startCreate(){
    this.editing = false;
    this.product = {};
  }

  selectProduct(route: any) {
    this.product = {};
    if(this.$route.params.op == "create"){
      this.editing = false;      
    } else {
      const productId = route.params.id;
      const selectedProduct = 
        this.$store.state.products.find(
          (p: productType) => p.id == productId
        );
      this.editing = true; 
      this.product = selectedProduct;   
    }
  }

  created(){
    this.unWatcher = this.$store.watch(
      (state: any) => state.selectedProduct, () => this.selectProduct(this.$route));
    this.selectProduct(this.$route);
  }

  beforeDestroy(){
    this.unWatcher();
  }

  beforeRouteUpdate(to: any, from: any, next: any){
    console.log(to);
    this.selectProduct(to);
    next();
  }

  nextUrl(){
    if(this.product.id != null && this.$store.state.products != null){
      const index = this.$store.state.products
          .findIndex((p: productType) => p.id == this.product.id);
      const target = index < this.$store.state.products.length - 1 ? index + 1 : 0;
      return `/edit/${this.$store.state.products[target].id}`;
    }
    return "/edit";
  }

  async save(){     
    await this.$store.dispatch("saveProductAction", this.product);
    this.$router.push({name: "table"});
    this.product = {};    
  } 

  @Provide() colors = {
    bg: "bg-light",
    text: "text-danger"
  };

  @Watch("product")
  changeProduct(newVal: productType){
    this.localBus.$emit("target", newVal);
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
