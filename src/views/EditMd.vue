<template>
    <div class="editMd">
        <CommonHeader :header-info="headerInfo"></CommonHeader>
        <div class="content">
          <el-form :label-position="labelPosition" label-width="80px">
            <el-form-item label="标题">
              <el-input v-model="title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="可见性">
              <el-radio v-model="visible" label="1">公有</el-radio>
              <el-radio v-model="visible" label="0">私有</el-radio>
            </el-form-item>
            <el-form-item label="内容">
              <mavon-editor v-model="content" :navigation="false" :ishljs="true" :codeStyle="codeStyle" @save="saveBlog"/>
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
      codeStyle: 'atom-one-dark',
      content: '',
      title: '',
      blogInfo: null,
      headerInfo: {
        title: '',
        rightBtn: {
          content: '返回列表',
          callBack: this.callBack,
          type: 1
        }
      },
      labelPosition: 'right',
      visible: ''
    }
  },
  mounted () {
    let _this = this
    this.headerInfo.title = this.$route.params.blogId ? '编辑博客' : '添加博客'
    if (this.$route.params.blogId) {
      // 根据ID获取对应Blog详情
      this.multipleRequest(
        [this.getOneBlogListById(), this.getBlogDeitailById()],
        function (oneBlogList, blogDetail) {
          oneBlogList.data.content = blogDetail.data.content
          _this.blogInfo = oneBlogList.data
          _this.content = _this.blogInfo.content
          _this.title = _this.blogInfo.title
          _this.visible = _this.blogInfo.visible + ''
        }
      )
    } else {
      _this.visible = '1'
    }
  },
  methods: {
    saveBlog () {
      if (this.$route.params.blogId) {
        this.updateBlog()
      } else {
        this.insertBlog()
      }
    },
    backToList () {
      this.$router.push('/blogList')
    },
    callBack () {
      this.$router.push('/blogList')
    },
    getBlogDeitailById () {
      return this.postRequestParam(urls.getBlogDeitailById, {
        blogId: this.$route.params.blogId
      })
    },
    getOneBlogListById () {
      return this.postRequestParam(urls.getOneBlogListById, {
        blogId: this.$route.params.blogId
      })
    },
    insertBlog () {
      let _this = this
      this.postRequestBody(urls.insertBlog, {
        title: this.title,
        content: this.content,
        vistor_count: 0,
        visible: this.visible
      }).then(res => {
        _this.$message({
          showClose: true,
          message: '保存成功',
          type: 'success'
        })
        this.$router.push('/blogList')
      })
    },
    updateBlog () {
      let _this = this
      this.postRequestBody(urls.updateBlog, {
        title: this.title,
        content: this.content,
        id: this.blogInfo.id,
        visible: this.visible
      }).then(res => {
        _this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        })
        this.$router.push('/blogList')
      })
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
  width: 90%;
  margin: auto;
  padding-top: $offset-height;
  .content {
    .markdown-body {
      min-height: 500px;
    }
  }
}
</style>
