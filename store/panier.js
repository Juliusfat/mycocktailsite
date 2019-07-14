export const state = ()=>({
    myPrecious : []
})

export const mutations = {
    ADD_COCKTAIL: (state, cocktail) => {
        state.myPrecious = [...state.myPrecious, cocktail];
    },
    REMOVE_COCKTAIL: (state, id) => {
        const result = state.myPrecious.filter(c => c.idDrink !== id);
        state.myPrecious = result;
    },
    RESET_COCKTAIL: state => {
        state.myPrecious = [];
    }
}
export const getters = {
    favorite: state => state.myPrecious.length,
    isInFav: state => id => {
        return state.myPrecious.find(item => item.idDrink === id) ? true : false;
    },
    listFav: state => state.myPrecious,
    favImages: state => state.myPrecious.map(i => i.strDrinkThumb)
}
