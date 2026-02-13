<template>
  <div id="app">
    <scene-switch />
  </div>
</template>

<script>
// APP.vue主要用來 串接共用接口或者放共用組件使用
import SceneSwitch from '@/components/SceneSwitch.vue'

export default {
  name: 'App',
  components: {
    SceneSwitch
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss"></style>
