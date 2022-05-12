const mutations = {
    SETISCOLLAPSE(state) {
        state.iscollapse = !state.iscollapse
    }
}
const state = {
    iscollapse: false
}

export default {
    mutations,
    state,
}
