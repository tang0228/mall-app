<template>
  <div id="app">
    <van-tabbar fixed route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/home/list">商品</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/home/shopping" :badge="badge"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="user-circle-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
    <RouterView />
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  created() {
    const counterMap = JSON.parse(localStorage.getItem('goods')) || {};
    this.$store.commit('setCounterMap', counterMap);
  },
  computed: {
    ...mapState(['counterMap']),
    badge() {
      const count = Object.values(this.counterMap).reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
};
</script>

<style lang="less">
body {
  margin: 0;
}
</style>
