<template>
  <div class="list-container">
    <div class="search">
      <van-icon name="search" />
      <div>香蕉，一毛一根</div>
    </div>
    <OneTab />
    <SideBar />
  </div>
</template>

<script>
import OneTab from '@/components/OneTab.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  components: {
    OneTab,
    SideBar,
  },
};
</script>

<style lang="less" scoped>
.list-container {
  width: 375px;
  .search {
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
