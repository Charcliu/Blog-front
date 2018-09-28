<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import urls from './axios/urls.js'

export default {
  data () {
    return {}
  },
  mounted () {
    this.getRequest(urls.hello).then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 100%;
}
</style>
