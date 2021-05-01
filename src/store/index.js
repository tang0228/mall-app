import Vue from 'vue';
import Vuex from 'vuex';
import getInfo from '@/api/getInfo';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    showContent: false,
    size: 5,
    goodsList: [],
    type: null,
    counterMap: {},
  },
  mutations: {
    setSideList(state, list) {
      state.sideList = list;
    },
    setShowContent(state, bool) {
      state.showContent = bool;
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    // 清空商品列表
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setType(state, type) {
      state.type = type;
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    setStorage(state, { id, value }) {
      if (state.counterMap[id]) {
        if (value === -1 && state.counterMap[id] === 1) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        if (value === -1) {
          return;
        }
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
  },
  actions: {
    async setSideList({ commit }, type) {
      commit('setShowContent', false);
      const list = await getInfo.getSideList(type);
      commit('setSideList', list);
      commit('setShowContent', true);
    },
    async setGoodsList({ state, commit }, options) {
      const {
        page, sort,
      } = options;
      const type = options.type || state.type;
      const { list, total } = await getInfo.getGoodsList({
        type, page, size: state.size, sort,
      });
      commit('setGoodsList', list);
      commit('setType', type);
      if (state.goodsList.length < total) {
        return true;
      }
      return false;
    },
  },
  modules: {
  },
});
