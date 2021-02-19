<template>
  <div id="app">
    <div v-if="errors">
        <ul>
            <template v-for="(errors) in validationErrors">
              <li v-for="error in errors" v-bind:key="error">{{error}}</li>
            </template>
        </ul>
    </div>
    <form v-on:submit.prevent="handleSubmit">
      <div>
        <label>Name</label>
        <input v-model="name" class="form-control" />
      </div>
      <div>
        <label>Category</label>
        <input v-model="category" class="form-control" />
      </div>
      <div>
        <label>Price</label>
        <input v-model.number="price" type="number" />
      </div>
      <div class="text-center">
          <button type="submit">
            Submit
          </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator';
import validation from "./validators"


@Component
export default class App extends Vue {
  private name = "";
  private category = "";
  private price = 0;
  private validationErrors = {};

  errors(){
    return Object.values(this.validationErrors).length > 0;
  }

  validate(propertyName: any, value: any){
    const errors: string[] = [];
    Object(validation)[propertyName].forEach((v: any) => {
      console.log(v);
      if(!v.validator(value)){
        errors.push(v.message);
      }
    });

    if(errors.length > 0) {
      Vue.set(this.validationErrors, propertyName, errors);
    } else {
      Vue.delete(this.validationErrors, propertyName);
    }
  }

  validateAll(){
    this.validate("name", this.name);
    this.validate("category", this.category);
    this.validate("price", this.price);

    return this.errors;
  }

  handleSubmit(){
    if(this.validateAll()){
      console.log(`FORM SUBMITTED: ${this.name} ${this.category} ${this.price}`);
      console.log(this.validationErrors);
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
