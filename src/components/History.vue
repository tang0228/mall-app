<template>
  <div class="history-container">
    <h3>历史记录：</h3>
    <div class="item" v-for="item in searchList" :key="item.time" @touchend="search(item.value)">
      {{ item.value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchList: {
      default: () => [],
    },
  },
  methods: {
    search(value) {
      this.$emit('search', value);
    },
  },
};
</script>

<style scoped>
.item {
    padding: 15px;
    border-radius: 10px;
    background-color: #aaa;
    margin-left: 10px;
    margin-bottom: 10px;
    display: inline-block;
}
</style>
