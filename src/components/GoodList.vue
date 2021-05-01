<template>
  <div class="good-list-container">
    <div class="list-header van-hairline--top-bottom">
      <div :class="{ active: type == 'all' }" @touchend="handleClick('all')">
        综合
      </div>
      <div :class="{ active: type == 'sale' }" @touchend="handleClick('sale')">
        销量
      </div>
      <div
        class="price"
        :class="{
          'price-up': type == 'price-up',
          'price-down': type == 'price-down',
        }"
        @touchend="handleClick('price')"
      >
        价格
      </div>
    </div>
    <div class="list-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有了"
          @load="onLoad"
          :immediate-check="false"
        >
        <GoodCard
        v-for="item in goodsList"
        :key="item.id"
        v-bind="item"
        :num="counterMap[item.id]"
        />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import GoodCard from './GoodCard.vue';

export default {
  components: {
    GoodCard,
  },
  data() {
    return {
      type: 'all',
      loading: false,
      finished: false,
      isLoading: false,
      page: 1,
    };
  },
  computed: {
    ...mapState(['goodsList', 'counterMap']),
  },
  methods: {
    ...mapActions(['setGoodsList']),
    ...mapMutations(['resetGoodsList']),
    onRefresh() {
      this.loading = true;
      this.finished = false;
      this.isLoading = true;
      this.page = 1;
      this.resetGoodsList();
      this.setGoodsList({ page: 1, sort: this.type });
      this.loading = false;
      this.finished = true;
      this.isLoading = false;
    },
    async onLoad() {
      this.page += 1;
      this.loading = true;
      const result = await this.setGoodsList({ page: this.page, sort: this.type });
      if (result) {
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
    handleClick(type) {
      if (type === 'price') {
        if (this.type === 'price-up') {
          this.type = 'price-down';
        } else {
          this.type = 'price-up';
        }
      } else {
        this.type = type;
      }
      this.onRefresh();
    },
  },
};
</script>

<style lang="less" scoped>
.good-list-container {
  .list-header {
    width: 296px;
    position: relative;
    top: 0px;
    left: 79px;
    box-sizing: border-box;
    padding: 0 8px;
    display: flex;
    justify-content: flex-end;
    > div {
      width: 50px;
      height: 25px;
      text-align: center;
      color: #cecece;
      line-height: 25px;
    }
    .active,
    .price-up,
    .price-down {
      color: #ff1a90;
      font-weight: bold;
    }
    .price {
      position: relative;
    }
    .price::before {
      content: "";
      border: 4px solid transparent;
      border-top-color: #aaa;
      position: absolute;
      bottom: 4px;
      right: 0;
    }
    .price::after {
      content: "";
      border: 4px solid transparent;
      border-bottom-color: #aaa;
      position: absolute;
      top: 4px;
      right: 0;
    }
    .price-up::after {
      border-bottom-color: #ff1a90;
    }
    .price-down::before {
      border-top-color: #ff1a90;
    }
  }
}
.list-content {
  width: 296px;
  position: fixed;
  top: 170px;
  right: 0;
  bottom: 50px;
  overflow: auto;

}
</style>
