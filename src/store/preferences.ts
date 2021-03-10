type stateType = {
    stripedTable: boolean;
    primaryEditButton: boolean;
    dangerDeleteButton: boolean;
};

export default {
    namespaced: true,
    state: {
        stripedTable: true,
        primaryEditButton: false,
        dangerDeleteButton: false
    },
    getters: {
        editClass(state: stateType){
            return state.primaryEditButton ?
                "btn-primary": "btn-secondary";
        },
        deleteClass(state: stateType){
            return state.dangerDeleteButton ?
                "btn-danger": "btn-secondary";
        },
        tableClass(state: stateType, payload: any, rootState: any){
            return rootState.products.length > 0 &&
                rootState.products[0].price > 500 ? "table-striped": "";
        }
    },
    mutations: {
        setEditButtonColor(state: any, primary: boolean){
            state.primaryEditButton = primary;
        },
        setDeleteButtonColor(state: any, danger: boolean){
            state.dangerDeleteButton = danger;
        }
    }
}