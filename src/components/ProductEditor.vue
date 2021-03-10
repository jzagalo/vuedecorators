<template>
    <div>
      <editor-field v-bind:label="idLabel" :property ="product.id"  name="id"></editor-field>      
      <editor-field v-bind:label="nameLabel" :property ="product.name" name="name"></editor-field>
      <editor-field v-bind:label="categoryLabel" :property ="product.category" name="category"></editor-field>
      <editor-field v-bind:label="priceLabel" :property ="product.price" name="price"></editor-field>
      <div class="text-center"> 
        <button class="btn btn-primary" @click="save">
          {{ editing ? "Save": "Create" }}
        </button>
        <button class="btn btn-secondary" @click="cancel">Cancel</button>
     </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Inject, Watch } from 'vue-property-decorator';
import EditorField from "./EditorField.vue";

type productType = {
  id: number;
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

  selectProduct(selectedProduct: any){
    this.product = {};
    if(selectedProduct == null){
      this.editing = false;      
    }else{
      this.editing = true; 
      this.product = selectedProduct;   
    }
  }

  created(){
    this.unWatcher = this.$store.watch(
      (state: any) => state.selectedProduct, this.selectProduct);
    this.selectProduct(this.$store.state.selectedProduct);
  }

  beforeDestroy(){
    this.unWatcher();
  }

  save(){    
    this.$store.commit("saveProduct", this.product);
    this.product = {}; 
  }

  cancel(){
    this.$store.commit("selectedProduct");
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
