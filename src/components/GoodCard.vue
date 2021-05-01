<template>
  <div class="good-card-container van-hairline--bottom">
    <div class="img">
      <img :src="images[0]" />
    </div>
    <div class="content">
      <div class="title overflow-hiddehn">{{ title }}</div>
      <div class="desc overflow-hiddehn">{{ desc }}</div>
      <div class="tags">
        <div v-for="tag in tags" :key="tag">{{ tag }}</div>
      </div>
      <div class="price">￥{{ price }}</div>
      <div class="counter">
        <div @touchend="handleClick(id, -1)">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png"
          />
        </div>
        <div class="num">{{ num ? num : 0 }}</div>
        <div @touchend="handleClick(id, 1)">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ['images', 'tags', 'title', 'price', 'desc', 'id', 'num'],
  methods: {
    ...mapMutations(['setStorage']),
    handleClick(id, num) {
      this.setStorage({ id, value: num });
    },
  },
};
</script>

<style lang="less" scoped>
.good-card-container {
  width: 100%;
  display: flex;
  height: 100px;
  .img {
    width: 90px;
    margin-right: 20px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .content {
    flex: 1;
    position: relative;
    > div {
      width: 170px;
    }
    .title {
      font-size: 13px;
      color: #1a1a1a;
      margin-top: 5px;
    }
    .desc {
      color: #aaa;
      font-size: 11px;
      margin-top: 5px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      > div {
        font-size: 10px;
        padding: 2px;
        color: #aaa;
        border: 1px solid #aaa;
        border-radius: 3px;
        margin-right: 10px;
      }
    }
    .price {
      margin-top: 4px;
      font-weight: 600;
      font-size: 14px;
      color: #ff1a90;
    }
    .counter {
      position: absolute;
      bottom: 12px;
      right: 15px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      > div:not(.num) {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
        }
      }
      .num {
        padding: 0 5px;
        height: 22px;
        line-height: 22px;
      }
    }
  }
}
.overflow-hiddehn {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
