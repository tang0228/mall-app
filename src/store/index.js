import Vue from 'vue';
import Vuex from 'vuex';
import getInfo from '@/api/getInfo';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
  },
  mutations: {
    setSideList(state, list) {
      state.sideList = list;
    },
  },
  actions: {
    async setSideList({ commit }, type) {
      const list = await getInfo.getSideList(type);
      commit('setSideList', list);
    },
  },
  modules: {
  },
});
