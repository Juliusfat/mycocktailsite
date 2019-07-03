export const state = ()=>({
    myPrecious : []
})

export const mutations = {
    ADD_COCKTAIL: (state, id) => {
        state.myPrecious = [...state.myPrecious, id];
    },
    REMOVE_COCKTAIL: (state, id) => {
        const result = state.myPrecious.filter(i => i !== id);
        state.myPrecious = result;
    },
    RESET_COCKTAIL: state => {
        state.myPrecious = [];
    }
}
export const getters = {
    favorite: state => state.myPrecious.length,
    isInFav: state => id => {
        return state.myPrecious.find(item => item === id) ? true : false;
    }
}
