<template>
  <header>
    <!--绑定一个点击事件-->
    <h1 @click="changeTitle">{{title}}</h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      title: 'Vue.js Demo'
    }
  },
  methods: {
    changeTitle () {
      // 自定义事件  传递值“子向父组件传值”
      this.$emit('titleChanged', '子向父组件传值')
    }
  }
}
</script>

<style scoped>

</style>
