import Vue from 'vue'
import Vuex from 'vuex'
import resources from './modules/resources'
import ResourcesAPI from '@/api/resources'

Vue.use(Vuex)

export function createStore($http) {
    Vuex.Store.prototype.$http = $http
    Vuex.Store.prototype.$resources = ResourcesAPI($http)
    return new Vuex.Store({
        modules: {
            resources,
        }
    })
}