<template>
  <div>
      {{ textValue }}
      <input 
            :value="textValue" placeholder="Enter Text"           
            @input="$emit('update:textValue', $event.target.value)"
      />
  </div> 
</template>

<script lang="ts">
import { Vue, Component, Prop} from "vue-property-decorator";

@Component
class TextInput extends Vue {
    @Prop() private textValue!: string;
    

    updateInputEl(event: any){
        this.$emit("update:textValue", event.target.value)
    }
}

export default TextInput;
</script>
