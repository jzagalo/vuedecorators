<template>
  <div class="container-fluid">  
     <div class="row">
        <div class="col text-center m-2">
            <router-view></router-view>
        </div>
      </div>      
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import validation from "./validators"
import { Mutation, State } from "vuex-class";

@Component
export default class App extends Vue {
  
  @State(state => state.nav.selected) private selected!: string;  
  @Mutation("nav/selectedComponent") selectComponent!: () => void;

  private reactiveColors = {
    bg: "bg-secondary",
    text: "text-white"
  };

  created(){
    this.$store.dispatch("getProductsAction");
    //this.selectedComponent();
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
