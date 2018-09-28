<template>
    <div class="operate">
        <span title="编辑" @click="editBlog(item)">
            <i class="el-icon-edit"></i>
        </span>
        <span title="删除" @click="deleteBlog(item)">
            <i class="el-icon-delete"></i>
        </span>
    </div>
</template>
<script>
import urls from '@/axios/urls'
import {
  convertTimeStampToDate,
  convertDateToLocalString
} from '../utils/timeUtil.js'
import { mapMutations } from 'vuex'

export default {
  props: ['item'],
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['SET_BLOG_LIST']),
    deleteBlog(item) {
      let _this = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          _this.confirmDelBlog(item)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    confirmDelBlog(item) {
      let _this = this
      this.postRequestParam(urls.deleteBlogById, {
        blogId: item.id
      }).then(res => {
        _this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
        _this.postRequestBody(urls.getAllBlogList, {}).then(res => {
          res.data.forEach(element => {
            element.time = convertDateToLocalString(
              convertTimeStampToDate(element.time)
            )
          })
          _this.SET_BLOG_LIST(res.data)
        })
      })
    },
    editBlog(item) {
      this.$router.push({ name: 'editMd', params: { blogId: item.id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.operate {
  span {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
