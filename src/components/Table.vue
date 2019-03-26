<template>
  <div>
    <h2>{{msg}}</h2>
    <div>
      <ul>
        <li>获取的参数={{ $route.params.name }}</li>
        <li>获取的参数={{ $route.params.age }}</li>
        <li>{{age}}</li>
        <li>{{name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
let name = `admin`
export default {
  name: 'Table',
  data () {
    return {
      msg: '我的Table',
      age: 20,
      name: name
    }
  }
}
</script>

<style scoped>

</style>
