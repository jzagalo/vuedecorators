<template>
  <div>
      {{ textValue }}
      <input 
            :value="textValue" placeholder="Enter Text"           
            @input="updateTextValue"
      />
  </div> 
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit} from "vue-property-decorator";

@Component
class TextInput extends Vue {
    @Prop() private textValue!: string;    

    @Emit()
    updateTextValue(event: any){
        return event.target.value;
    }   
}

export default TextInput;
</script>
