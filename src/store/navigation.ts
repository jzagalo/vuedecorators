export default {
    namespaced: true,
    state: {
        selected: "table"
    },
    mutations: {
        selectedComponent(state: any, selection: any){ 
            console.log(selection);           
            state.selected = selection;
        }
    }
}