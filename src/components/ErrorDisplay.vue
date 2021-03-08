<template>
    <div v-if="error" class="bg-danger text-white text-center p-3 h3">
        An Error Has Occured
        <h6>{{ message }}</h6>
        <a href="/" class="btn btn-secondary">OK</a>
    </div>    
</template>

<script lang="ts">
import { VueConstructor } from 'vue';
import { Vue, Component, Inject } from 'vue-property-decorator';

@Component
export default class ErrorDisplay extends Vue {
    private error = false;
    private message = "";

    handleError(err: string){
        this.error = true;
        this.message = err;
    }

    @Inject("eventBus")
    private eventBus!: any;

    created(){
        this.eventBus.$on("httpError", this.handleError);
    }
    
}
</script>