<template>
    <button @click="increment()">+</button>
</template>

<script>
import {EventBus} from '../event/event-bus'

export default {
  name: 'IncrementCount',
  data () {
    return {
      num: 1,
      deg: 180
    }
  },
  methods: {
    increment () {
      EventBus.$emit('incremented', {
        num: this.num,
        deg: this.deg
      })
    }
  }
}
</script>

<style scoped>

</style>
