export const state = ()=>({
    myModal: false
})

export const mutations = {
    CHANGE_VALUE: state => {
        state.myModal = !state.myModal;
    }
}
export const getters = {
    changeModal: state => state.myModal
}
