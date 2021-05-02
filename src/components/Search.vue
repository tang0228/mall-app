<template>
  <div class="search-container">
    <div class="search-head">
      <van-icon name="arrow-left" class="arr-left"/>
      <van-search
        class="search"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch(value)"
        @input="onInput(value)"
        @focus="onFocus"
      >
        <template #action v-if="showList">
          <div @click="onSearch(value)">搜索</div>
        </template>
        <template #action v-else>
          <van-icon name="cart-o" :badge="badge" id="car"/>
        </template>
      </van-search>
    </div>
    <div class="like-list" v-show="likeList.length > 0 && showList">
      <van-list>
        <van-cell
          v-for="item in likeList"
          :key="item"
          @touchend="onSearch(item)"
        >
        <template>
          <span class="title" v-html="formatHTML(item)"></span>
        </template>
        </van-cell>
      </van-list>
    </div>
    <div class="good-list" v-show="!showList">
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
    </div>
  </div>
</template>

<script>
import getInfo from '@/api/getInfo';
import GoodCard from '@/components/GoodCard.vue';
import { mapState } from 'vuex';

export default {
  components: {
    GoodCard,
  },
  data() {
    return {
      place: '酒',
      value: this.place,
      likeList: [],
      timer: null,
      loading: false,
      finished: false,
      goodsList: [],
      showList: true,
      page: 1,
      size: 5,
      total: 0,
    };
  },
  methods: {
    async onLoad() {
      this.showList = false;
      const value = await getInfo.search({ type: this.value, page: this.page, size: this.size });
      this.goodsList = [...this.goodsList, ...value.list];
      this.loading = false;
      this.total = value.total;
      if (this.goodsList.length >= this.total) {
        this.finished = true;
      } else {
        this.page += 1;
      }
    },
    onSearch(value) {
      if (value === '') {
        this.value = this.place;
      } else {
        this.value = value;
      }
      this.likeList = [];
      this.goodsList = [];
      this.page = 1;
      this.finished = false;
      this.onLoad();
    },
    async onInput() {
      if (this.value === '') {
        this.likeList = [];
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const value = await getInfo.likeSearch(this.value);
          this.likeList = value.result;
          clearTimeout(this.timer);
          this.timer = null;
        }, 300);
      }
    },
    onFocus() {
      this.showList = true;
    },
    formatHTML(item) {
      const reg = new RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));
    },
  },
  computed: {
    ...mapState(['counterMap']),
    badge() {
      const count = Object.values(this.counterMap).reduce(
        (prev, next) => prev + next,
        0,
      );
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
    width: 100%;
    height: 100vh;
    .search-head {
        width: 345px;
        position: fixed;
        top: 0;
        left: 15px;
        height: 50px;
        display: flex;
        align-items: center;
        z-index: 33;
        background-color: #fff;
        .arr-left {
            font-size: 22px;
        }
        .search {
            flex: 1;
        }
        #car {
          font-size: 22px;
          margin-top: 10px;
        }
    }
    .like-list {
      position: relative;
      top: 50px;
      width: 100%;
      padding-left: 30px;
      box-sizing: border-box;
      background-color: #fff;
    }
    .good-list {
      position: relative;
      top: 50px;
      width: 345px;
      margin: 0 auto;
      z-index: 10;
      background-color: #fff;
    }
}
</style>
