<template>
  <div>
    <div class="child-title">设置字体的大小</div>
  </div>
</template>

<script>
export default {
  name: 'child',
  props: ['a', 'b'],
  inheritAttrs: false,
  mounted () {
    // 控制台输出:
    // child:$attrs: {c: "c"}
    console.log('child:$attrs:', this.$attrs)
  }
}
</script>

<style scoped>

</style>
