<template>
    <div>
      <editor-field v-bind:label="idLabel"></editor-field>      
      <editor-field v-bind:label="nameLabel"></editor-field>
      <editor-field v-bind:label="priceLabel"></editor-field>
      <div class="text-center"> 
        <button class="btn btn-primary" @click="save">
          {{ editing ? "Save": "Create"}}
        </button>
        <button class="btn btn-secondary" @click="cancel">Cancel</button>
     </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import EditorField from "./EditorField.vue";

@Component({
  components: {
    EditorField,
  }
})
export default class ProductEditor extends Vue {
  private editing = false;
  private product = { };
  private idLabel = "ID";
  private nameLabel = "Name";
  private priceLabel = "Price";

  startEdit(product: any) {
    this.editing = true;
    this.product = {
      id: product.id,
      name: product.name,
      price: product.price
    };
  }

  startCreate(){
    this.editing = false;
    this.product = {
      id: 0,
      name: "",
      price: 0
    };
  }

  save(){
    console.log(`Edit Complete: ${JSON.stringify(this.product)}`);
    this.startCreate();
  }

  cancel(){
    this.product = {};
    this.editing = false;
  }

  @Provide() colors = {
    bg: "bg-light",
    text: "text-danger"
  };

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
