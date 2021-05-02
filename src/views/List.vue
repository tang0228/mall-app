<template>
  <div class="list-container">
    <RouterLink class="search" to="/search">
      <van-icon name="search" />
      <div>香蕉，一毛一根</div>
    </RouterLink>
    <OneTab />
    <template v-show="showContent">
      <SideBar />
      <GoodList />
    </template>
    <van-loading type="spinner" size="24px" v-show="!showContent"/>
  </div>
</template>

<script>
import OneTab from '@/components/OneTab.vue';
import SideBar from '@/components/SideBar.vue';
import GoodList from '@/components/GoodList.vue';
import { mapState } from 'vuex';

export default {
  components: {
    OneTab,
    SideBar,
    GoodList,
  },
  computed: {
    ...mapState(['showContent']),
  },
};
</script>

<style lang="less" scoped>
.list-container {
  width: 375px;
  .search {
    display: block;
    width: 355px;
    height: 33px;
    background-color: #eee;
    margin: 11px auto 0;
    border-radius: 10px;
    color: #a1a1a1;
    font-size: 14px;
    text-align: center;
    line-height: 33px;
    > * {
      display: inline-block;
      vertical-align: middle;
    }
  }

}
</style>
