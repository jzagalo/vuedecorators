<template>
  <div>
      <h3 class="bg-success text-center text-white p-2">
          Summary
     </h3>
     <table class="table">
         <tr>
             <th>Number of Products:</th>
             <td>{{ products.length }}</td>
         </tr>
         <tr>
             <th>Highest Price:</th>
             <td>{{ highestPrice() | currency }}</td>
         </tr>
     </table>      
  </div>
</template>

<script lang="ts">
import { Vue, Component, } from "vue-property-decorator";
import { State } from "vuex-class";

type productType = {
  id: number;
  name: string;
  category: string;
  price: number;
}; 

@Component({
    filters:{
        currency: (value: number) => {
            return new Intl.NumberFormat("en-US", {
                style: "currency", currency: "USD"
            }).format(value);
        }
    }
})
export default class DataSummary extends Vue {
    @State("products") products!: productType[];   

    categoryCount(){
        if(this.products.length > 0){
            return this.products
                    .map((p: productType) => p.category)
                    .filter((cat: any, index: number, arr: any) => arr.indexOf(cat) == index).length;
        }else {
            return 0;
        }
    }

    highestPrice(){
        if(this.products.length == 0){
            return 0;
        } else {       
            return Math.max(...this.products.map((p: any) => (p.price)));
        }
    }

}
</script>

<style>

</style>