<template>
    <div class="editMd">
        <el-input v-model="title" placeholder="请输入标题"></el-input>
        <mavon-editor v-model="content" :navigation="false" :ishljs="true" @save="saveBlog" @navigationToggle="test"/>
    </div>
</template>

<script>
import urls from '../axios/urls.js'

export default {
  name: 'editMd',
  data () {
    return {
      content: '',
      title: ''
    }
  },
  methods: {
    saveBlog () {
      this.postRequestBody(urls.insertBlog, {
        title: this.title,
        content: this.content,
        vistor_count: 0
      }).then(res => {
        this.$message({
          showClose: true,
          message: '保存成功',
          type: 'success'
        })
      })
    },
    test () {
      console.log('123')
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
