<template>
  <div class="form-group">
    <label>{{formattedLabel}}</label>
    <input v-model.number="value" 
        v-bind:class="[colours.bg, colours.text]"
         class="form-control" />
 </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from "vue-property-decorator"

@Component
export default class EditorField extends Vue {
    @Prop() label!: string;   
    value = "";    
    @Inject("colors") colours!: any;  
    @Inject({ 
        from: "labelFormatter",
        default: () => (value: any) => `Default ${value}`
    }) 
    private format!: any;    
    formattedLabel = this.format(this.label);
}
</script>

<style>

</style>