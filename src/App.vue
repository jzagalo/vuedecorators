<template>
  <div class="container-fluid">  
    <div class="text-right m-2">
        <button class="btn btn-primary" @click="toggleColors">
          Toggle Colours
        </button>
    </div>  
    <div class="row">
      <div class="col">
        <ErrorDisplay />
      </div>
    </div>
    <div class="row">  
      <div class="col-8 m-3">
        <ProductsDisplay />
      </div> 
      <div class="col m-3">
        <ProductEditor />
      </div>         
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import validation from "./validators"
import ProductEditor from "./components/ProductEditor.vue";
import ProductsDisplay from "./components/ProductsDisplay.vue";
import ErrorDisplay from "@/components/ErrorDisplay.vue";


@Component({
  components: {
    ProductsDisplay,
    ProductEditor,
    ErrorDisplay,
  }
})
export default class App extends Vue {

  private reactiveColors = {
    bg: "bg-secondary",
    text: "text-white"
  };

  @Provide() colors = this.reactiveColors;
  labelFormatter = (value: string) => `Enter ${value}:`


  toggleColors(){
    if(this.reactiveColors.bg == "bg-secondary"){
       this.reactiveColors.bg = "bg-light";
       this.reactiveColors.text = "text-danger";
    }else{
       this.reactiveColors.bg = "bg-secondary";
       this.reactiveColors.text = "text-white";
    }
  }


}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
