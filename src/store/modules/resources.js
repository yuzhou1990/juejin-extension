import { timestampFormat } from '@/utils/util'
const state = {
    gold: [],
    gold_category: 'all',
    github: [],
    github_category: 'trending',
    github_period: 'day',
    github_lang: 'javascript',
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
        if (state.github.length) {
            state.github.push(...payload)
        } else {
            state.github = payload
        }
    },
    set_github_category(state, payload) {
        state.github_category = payload
        state.github = []
    },
    set_github_period(state, payload) {
        state.github_period = payload
        state.github = []
    },
    set_github_lang(state, payload) {
        state.github_lang = payload
        state.github = []
    },
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
    },
    fetchGithub({ state, commit }, payload) {
        return this.$resources.fetch_github({
            category: state.github_category,
            period: state.github_period,
            lang: state.github_lang,
            offset: state.github.length,
            limit: 30
        }).then(res => {
            if (res.code === 200) {
                commit('set_github', res.data)
                return res.data.length < 30
            }
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}