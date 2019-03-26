<template>
  <div class="hello">
    <ul>
      <!--//遍历传递过来的值，然后呈现到页面-->
      <li v-for="(user, index) in users" :key="index">{{user}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Users',
  props: {
    users: { // 这个就是父组件中子标签自定义名字
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
