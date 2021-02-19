<template>
  <div class="hello">     
    <input  placeholder="Prop Sync" ref="ainput" v-model="syncModel" />  
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Ref, PropSync } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @PropSync("vmodel", { type: String }) private syncModel!: string;
  @Ref('ainput') readonly inputEl!: HTMLFormElement;

  formData = {
    username: 'someuser',
    name: undefined
  };

  mounted(){
    this.formData = Object.assign({},
    this.formData, {name: 'Some User'});
    console.log(this.formData);
  }

  firstName = "Donna";
  counter = 1;
  initialName ="Summer";
  lastName = this.initialName;

  @Watch("firstName",  { immediate: true, deep: true })
  onFirstNameChanged(prev: string, next: string){
    this.lastName = this.initialName + this.counter++;
    console.log(prev, next);
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
