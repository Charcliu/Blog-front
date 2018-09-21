<template>
    <div class="blogList">
        <div class="list" v-for="item in blogList" :key="item.id" @click="getDetail(item)">
            <div class="header">
                <h3>{{item.title}}</h3>
            </div>
            <div class="footer">
                <div class="vistor">
                    <i class="el-icon-view"></i>{{item.vistor_count}}</div>
                <div class="time">
                    <i class="el-icon-date"></i>{{item.time}}
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
import { mapMutations } from 'vuex'

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
    ...mapMutations(['SET_CURRENT_BLOG_DETAIL']),
    getDetail (item) {
      this.postRequestParam(urls.getBlogDeitailById, {
        blogId: item.id
      }).then(res => {
        let currentDetail = Object.assign({}, item)
        currentDetail.content = res.data.content
        this.SET_CURRENT_BLOG_DETAIL(currentDetail)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$content-width: 75rem;
.blogList {
  width: $content-width;
  margin: auto;
  .list {
    cursor: pointer;
  }
  .footer {
    display: flex;
    flex-direction: row;
  }
}
</style>
