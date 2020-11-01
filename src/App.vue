<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld :vmodel="textEntered" /> -->
    From Parent <br/>
    ---{{ textEntered }} ----
    <br>
    <input v-model="textEntered" placeholder="Trying out something new" />
    <!-- <TextInput :textValue.sync="textEntered"   /> -->
     <TextInput :textValue="textEntered" @update:textValue="textEntered = $event"   />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import TextInput from './components/TextInput.vue';

@Component({
  components: {
    HelloWorld,
    TextInput,
  },
})
export default class App extends Vue {
  @Prop() vmodel!: string;  
  textEntered = "";

  getUpdatedTextVal(val: string){
    console.log(val);
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
