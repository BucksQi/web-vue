<template>
  <div v-show="value">
    <div>
      <p>这是一个Model框</p>
      <input type="text" v-model="value">
      {{value}}
      <button @click="close">关闭model</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dome',
  props: ['value'],
  methods: {
    close () {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped>

</style>
