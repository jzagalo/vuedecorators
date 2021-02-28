<template>
  <div class="form-group">
    <label>{{formattedLabel}}</label>
    <input :value="componentValue" 
          :class="[colours.bg, colours.text]"
           class="form-control"  :name="name"/>
 </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject, Watch } from "vue-property-decorator"

@Component
export default class EditorField extends Vue {
    @Prop() label!: string; 
    @Prop() property!: string;  
    @Prop() name!: string;
    private componentValue = "";
    @Inject("editingEventBus") private editingEventBus!: any;
     
    @Inject("colors") colours!: any;  
    @Inject({ 
        from: "labelFormatter",
        default: () => (value: any) => `Default ${value}`
    }) 
    private format!: any;    
    formattedLabel = this.format(this.label);

    created(){
        this.editingEventBus.$on("target", 
        (p: any) => this.componentValue = p[this.name])
    }

    @Watch("value")
    changeValue(newValue: string){
        this.editingEventBus.$emit("change", {
            name: this.name, value: this.componentValue
        })
    }
}
</script>

<style>

</style>