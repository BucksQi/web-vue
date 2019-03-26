<template>
  <div>属性</div>
</template>

<script>
export default {
  name: 'grandchild',
  props: [],
  // props: ['c'],
  inheritAttrs: false,
  mounted () {
    // 控制台输出:
    // grandchild:$attrs: {d: "d", c: "c"}
    console.log('grandchild:$attrs:', this.$attrs)
    // 如果props:['c']
    // 控制台输出:
    // grandchild:$attrs: {d: "d"}
  }
}
</script>

<style scoped>

</style>
