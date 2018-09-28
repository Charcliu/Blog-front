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
                <div class="list" v-for="item in blogList" :key="item.id" @click="toDetail(item)">
                  <div class="title">
                      <h3>{{item.title}}</h3>
                      <BlogOperate></BlogOperate>
                  </div>
                  <div class="detail">
                      <div class="vistor">
                          <i class="el-icon-view"></i>
                          <span>
                            {{item.vistor_count}}
                          </span>
                      </div>
                      <div class="time">
                          <i class="el-icon-date"></i>
                          <span>
                            {{item.time}}
                          </span>
                      </div>
                  </div>
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
import BlogOperate from '@/components/BlogOperate'

export default {
  name: 'blogList',
  data() {
    return {
      blogList: [],
      headerInfo: {
        title: '博客列表',
        reback: null
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
      _this.blogList = res.data
    })
  },
  methods: {
    toDetail(item) {
      this.$router.push({ name: 'blogDetail', params: { blogId: item.id } })
    }
  },
  components: {
    UserInfo,
    CommonHeader,
    BlogOperate
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
      cursor: pointer;
      .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  .detail {
    display: flex;
    flex-direction: row;
  }
}
</style>
