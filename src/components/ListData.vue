<template>
  <div>
    <div class="list-item" v-for="(item, index) in list" :key="index">
      <div class="item-name">
        <span>{{item.name}}</span>
      </div>
      <div v-if="item.children" class="children-item">
        <list-data :list="item.children"></list-data>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listData',
  props: {
    list: Array
  }
}
</script>

<style scoped>

</style>
