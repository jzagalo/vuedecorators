<template>
  <h3 class="bg-info text-white text-center m-2 p-2" >
      Lazily Loading Component ...
  </h3>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component
export default class LoadingMessage extends Vue {

}
</script>

<style>

</style>