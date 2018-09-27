<template>
    <div class="blogList">
        <div class="header">
          <span>博客列表</span>
        </div>
        <div class="footer">
          <UserInfo></UserInfo>
          <div class="content">
            <div class="list" v-for="item in blogList" :key="item.id" @click="toDetail(item)">
              <div class="title">
                  <h3>{{item.title}}</h3>
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

export default {
  name: 'blogList',
  data () {
    return {
      blogList: []
    }
  },
  mounted () {
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
    toDetail (item) {
      this.$router.push({ name: 'blogDetail', params: { blogId: item.id } })
    }
  },
  components: {
    UserInfo
  }
}
</script>
<style lang="scss" scoped>
$header-height: 5rem;

.header {
  background-color: #333;
  color: white;
  width: 100%;
  font-size: 2em;
  height: $header-height;
  line-height: $header-height;
  > span:first-child {
    padding-left: 1.25rem;
  }
}

.footer {
  display: flex;
  flex-direction: row;
  width: 1000px;
  margin: auto;
  .content {
    width: 100%;
    .list {
      background-color: #fff;
      border: 1px solid #d1d5da;
      border-radius: 3px;
      margin: 10px 0px;
      cursor: pointer;
      padding: 10px;
    }
    .detail {
      display: flex;
      flex-direction: row;
      align-items: center;
      .time {
        margin-left: 10px;
      }
    }
  }
}
</style>
