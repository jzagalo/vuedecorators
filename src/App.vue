<template>
  <div class="container-fluid">  
   <div class="row">
      <div class="col text-center m-2">
        <div class="btn-group btn-group-toggle">
          <label class="btn btn-info"  @click="selectComponent('table')" :class="{active: (selected == 'table') }">
              <input type="radio" v-model="selected" value="table" /> Standard Features
          </label>
          <label class="btn btn-info" @click="selectComponent('editor')"  :class="{active: (selected == 'editor') }">
              <input type="radio" v-model="selected" value="editor" /> Advanced Features
          </label>
          <button class="btn btn-success"
               @click="selectComponent('summary')" 
               :class="{ active: (selected == 'summary') }" >
            Summary
          </button>
      </div>
    </div>
 </div> 
    <div class="row">
      <div class="col">
        <ErrorDisplay />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <keep-alive>
          <component :is="selectedComponent()"></component>
        </keep-alive>
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
import { Mutation, State } from "vuex-class";
import LoadingMessage from "@/components/LoadingMessage.vue";


const DataSummary = () => import(/* webpackChunkName: "advanced" */'@/components/DataSummary.vue');

@Component({
  components: {
    ProductsDisplay,
    ProductEditor,
    ErrorDisplay, 
    DataSummary,   
  }
})
export default class App extends Vue {
  
  @State(state => state.nav.selected) private selected!: string;  
  @Mutation("nav/selectedComponent") selectComponent!: () => void;

  private reactiveColors = {
    bg: "bg-secondary",
    text: "text-white"
  };

  created(){
    this.$store.dispatch("getProductsAction");
    this.selectedComponent();
  } 

  selectedComponent(){
    switch(this.selected){
      case "table":
        return ProductsDisplay
      case "editor":
        return ProductEditor
      case "summary":
        return DataSummary;
    }
  }

  @Provide() colors = this.reactiveColors;
  labelFormatter = (value: string) => `Enter ${value}:`  

  toggleColors(){
    if(this.reactiveColors.bg == "bg-secondary") {
       this.reactiveColors.bg = "bg-light";
       this.reactiveColors.text = "text-danger";
    } else {
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
