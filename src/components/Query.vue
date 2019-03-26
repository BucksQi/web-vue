<template>
    <div>
      <ul>获取的参数={{ $route.query.keyword }}</ul>
      <ul>
        <li v-for="item in list" :key='item.id'>
          {{item.name}} - {{item.age}}
        </li>
        <li>赋值的参数: {{keyword}}</li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'Query',
  data () {
    return {
      list: [{
        name: 'admin',
        age: 20
      },
      {
        name: 'jack',
        age: 25
      }],
      keyword: this.$route.query.keyword
    }
  }
}
</script>

<style scoped>
li {
  text-decoration: none;
}
</style>
