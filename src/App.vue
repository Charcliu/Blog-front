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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
