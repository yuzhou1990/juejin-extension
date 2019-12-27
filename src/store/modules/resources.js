const state = {
    gold: [],
    github: []
}

const mutations = {
    set_gold(state, payload) {
        state.gold = payload
    },
    set_github(state, payload) {
        state.best = payload
    }
}

const actions = {
    fetchGold({ state, commit }, payload) {
        return this.$resources.fetch_gold({
            category: "frontend",
            order: "heat",
            offset: 0,
            limit: 30
        }).then(res => {
            console.log('gold fetch list:', res)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}