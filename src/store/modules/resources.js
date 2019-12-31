import { timestampFormat } from '@/utils/util'
const state = {
    gold: [],
    gold_category: 'all',
    github: []
}

const mutations = {
    set_gold(state, payload) {
        if (state.gold.length) {
            state.gold.push(...payload)
        } else {
            state.gold = payload
        }
    },
    set_gold_category(state, payload) {
        state.gold_category = payload
        state.gold = []
    },
    set_github(state, payload) {
        state.best = payload
    }
}

const actions = {
    fetchGold({ state, commit }, payload) {
        return this.$resources.fetch_gold({
            category: state.gold_category,
            order: "heat",
            offset: state.gold.length,
            limit: 30
        }).then(res => {
            if (res.code === 200) {
                res.data.forEach(i => i.time = timestampFormat(i.date.iso))
                commit('set_gold', res.data)
                return res.data.length < 30
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}