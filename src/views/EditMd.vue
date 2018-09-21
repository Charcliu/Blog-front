<template>
    <div class="editMd">
        <el-input v-model="title" placeholder="请输入标题"></el-input>
        <mavon-editor v-model="content" :navigation="false" :ishljs="true" @save="saveBlog"/>
    </div>
</template>

<script>
import urls from '../axios/urls.js'

export default {
  name: 'editMd',
  data() {
    return {
      content: '',
      title: ''
    }
  },
  methods: {
    saveBlog() {
      this.postRequest(urls.insertBlog, {
        title: this.title,
        content: this.content,
        vistor_count: 100
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="sass" scoped>

</style>

