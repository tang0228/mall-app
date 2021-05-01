<template>
  <div class="side-bar-container" ref="sideBar">
    <div
      :class="{ active: i == index }"
      v-for="(item, i) in sideList"
      :key="item"
      @touchend="handleTouch(i, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      {{ i == 0 ? "全部" : item }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import moveScroll from '@/utils/moveScroll';

export default {
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  computed: {
    ...mapState(['sideList']),
  },
  methods: {
    ...mapActions(['setGoodsList']),
    ...mapMutations(['resetGoodsList']),
    handleTouch(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      const { sideBar } = this.$refs;
      const pHeight = sideBar.clientHeight;
      const sTop = e.target.getBoundingClientRect().top;
      const sHeight = e.target.offsetHeight;
      const scrollY = sTop - pHeight / 2 + sHeight / 2;
      moveScroll(sideBar.scrollTop, scrollY, sideBar, 'scrollTop');
      // 获取商品列表数据
      // 清空商品列表，再获取
      this.resetGoodsList();
      this.setGoodsList({
        type: this.sideList[i],
        page: 1,
        sort: 'all',
      });
    },
  },
  mounted() {
    this.resetGoodsList();
    this.setGoodsList({
      type: this.sideList[0],
      page: 1,
      sort: 'all',
    });
  },
};
</script>

<style lang="less" scoped>
.side-bar-container {
  width: 79px;
  position: fixed;
  top: 135px;
  left: 0;
  bottom: 50px;
  background-color: #f8f8f8;
  overflow: auto;
  div {
    width: 79px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
  }
  .active {
    font-weight: bold;
    color: #ff1a90;
  }
  .active::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    background-color: #ff1a90;
    height: 18px;
  }
  &::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }
}
</style>
