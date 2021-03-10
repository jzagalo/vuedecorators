<template>
  <div class="form-group">
      {{ componentValue }}
    <label>{{formattedLabel}}</label>
    <input v-model="componentValue" 
           :class="[colours.bg, colours.text]"
           class="form-control"  :name="name" :type="setType()" />
 </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject, Watch } from "vue-property-decorator"

@Component
export default class EditorField extends Vue {
    @Prop() label!: string; 
    @Prop() property!: string;  
    @Prop() name!: string | number;
    private componentValue = "";
    @Inject("editingEventBus") private editingEventBus!: any;
     
    @Inject("colors") colours!: any;  
    @Inject({ 
        from: "labelFormatter",
        default: () => (value: any) => `Default ${value}`
    }) 
    private format!: any;    
    formattedLabel = this.format(this.label);

    setType(){
      return  (this.label == "ID" || this.label == "Price") ? "number": "text";        
    }

    created(){
        this.editingEventBus.$on("target", 
        (p: any) => this.componentValue = p[this.name])
    }

    @Watch("componentValue")
    changeValue(newValue: any): void {        
        this.editingEventBus.$emit("change", {
            name: this.name, value: this.componentValue
        })
    }
}
</script>

<style>

</style>