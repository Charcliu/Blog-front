<template>
    <div class="blogList">
        <CommonHeader :header-info="headerInfo"></CommonHeader>
        <div class="footer">
          <el-row :gutter="40" type="flex">
            <el-col :xs="0" :sm="8" :md="8" :lg="7" :xl="8" align="right">
              <UserInfo></UserInfo>
            </el-col>
            <el-col :xs="0" :sm="2" :md="2" :lg="1" :xl="2"></el-col>
            <el-col :xs="24" :sm="14" :md="14" :lg="16" :xl="14" align="left">
              <div class="content">
                <div class="list" v-for="item in blogList" :key="item.id">
                  <BlogItem :item="item"></BlogItem>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
    </div>
</template>

<script>
import urls from '../axios/urls.js'
import {
  convertTimeStampToDate,
  convertDateToLocalString
} from '../utils/timeUtil.js'
import UserInfo from '@/components/UserInfo'
import CommonHeader from '@/components/CommonHeader'
import BlogItem from '@/components/BlogItem'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'blogList',
  data() {
    return {
      headerInfo: {
        title: '博客列表',
        rightBtn: {
          content: '写博客',
          callBack: this.writeBlog,
          type: 0
        }
      }
    }
  },
  mounted() {
    let _this = this
    this.postRequestBody(urls.getAllBlogList, {}).then(res => {
      res.data.forEach(element => {
        element.time = convertDateToLocalString(
          convertTimeStampToDate(element.time)
        )
      })
      _this.SET_BLOG_LIST(res.data)
    })
  },
  methods: {
    ...mapMutations(['SET_BLOG_LIST']),
    writeBlog() {
      this.$router.push({ name: 'editMd', params: { blogId: 0 } })
    }
  },
  computed: {
    ...mapGetters(['GET_BLOG_LIST']),
    blogList() {
      return this.GET_BLOG_LIST
    }
  },
  components: {
    UserInfo,
    CommonHeader,
    BlogItem
  }
}
</script>
<style lang="scss" scoped>
$header-height: 5rem;

.blogList {
  height: 100%;
}

.footer {
  width: 80%;
  margin: auto;
  margin-top: $header-height;
  height: 100%;
  .content {
    padding-bottom: 6.25rem;
    margin-top: 0.625rem;
    .list {
      border: 1px solid #e8e8e8;
      border-radius: 5px;
      padding: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
