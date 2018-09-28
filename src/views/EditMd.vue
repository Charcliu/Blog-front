<template>
    <div class="editMd">
        <CommonHeader :header-info="headerInfo"></CommonHeader>
        <div class="content">
          <el-form :label-position="labelPosition" label-width="80px">
            <el-form-item label="标题">
              <el-input v-model="title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <mavon-editor v-model="content" :navigation="false" :ishljs="true" @save="saveBlog"/>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="saveBlog">保存编辑</el-button>
              <el-button type="info" plain @click="backToList">取消编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>

<script>
import urls from '../axios/urls.js'
import CommonHeader from '@/components/CommonHeader'

export default {
  name: 'editMd',
  data () {
    return {
      content: '',
      title: '',
      headerInfo: {
        title: '',
        reback: null
      },
      labelPosition: 'right'
    }
  },
  mounted () {
    this.headerInfo.title =
      this.$route.params.type === 'add' ? '添加博客' : '编辑博客'
  },
  methods: {
    saveBlog () {
      let _this = this
      this.postRequestBody(urls.insertBlog, {
        title: this.title,
        content: this.content,
        vistor_count: 0
      }).then(res => {
        _this.$message({
          showClose: true,
          message: '保存成功',
          type: 'success'
        })
        this.$router.push('/blogList')
      })
    },
    backToList () {
      this.$router.push('/blogList')
    }
  },
  components: {
    CommonHeader
  }
}
</script>
<style lang="scss" scoped>
$offset-height: 6.25rem;

.editMd {
  width: 80%;
  margin: auto;
  margin-top: $offset-height;
  .content {
    margin: 20px 0px;
    .markdown-body {
      min-height: 500px;
    }
  }
}
</style>
