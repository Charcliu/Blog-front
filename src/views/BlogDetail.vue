<template>
    <div class="blogDetail">
      <CommonHeader :header-info="headerInfo"></CommonHeader>
      <div class="content">
        <!-- 文章容器 -->
        <div id="kCatelog">
          <mavon-editor v-model="blogInfo.content" defaultOpen="preview" :toolbarsFlag="false" :subfield="false" :preview="true"/>
        </div>
        <!-- 目录容器 -->
        <div class="k-catelog-list" id="catelogList"></div>
      </div>
    </div>
</template>

<script>
import urls from '@/axios/urls.js'
import Katelog from '@/utils/k-catelog.js'
import CommonHeader from '@/components/CommonHeader'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default {
  name: 'blogDetail',
  data () {
    return {
      blogInfo: {
        content: ''
      },
      headerInfo: {
        title: '',
        rightBtn: {
          content: '返回列表',
          callBack: this.callBack,
          type: 1
        }
      }
    }
  },
  mounted () {
    let _this = this
    // 根据ID获取对应Blog详情
    this.multipleRequest(
      [this.getOneBlogListById(), this.getBlogDeitailById()],
      function (oneBlogList, blogDetail) {
        oneBlogList.data.content = blogDetail.data.content
        _this.blogInfo = oneBlogList.data
        _this.headerInfo.title = _this.blogInfo.title
        // 加载左侧目录树
        setTimeout(() => {
          Katelog({
            contentEl: 'kCatelog',
            catelogEl: 'catelogList',
            linkClass: 'k-catelog-link',
            linkActiveClass: 'k-catelog-link-active',
            supplyTop: 20,
            active: function (el) {
              // console.log(el)
            }
          })
          _this.highlightCode()
        }, 1)
      }
    )
  },
  computed: {},
  methods: {
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
    callBack () {
      this.$router.push('/blogList')
    },
    highlightCode () {
      const preEl = document.querySelectorAll('pre')
      preEl.forEach((el) => {
        hljs.highlightBlock(el)
      })
    }
  },
  components: {
    CommonHeader
  }
}
</script>

<style lang="scss" scoped>
$catelog-width: 18.75rem;
$header-height: 5rem;

.blogDetail {
  height: 100%;
}

.content {
  position: relative;
  padding-top: $header-height;
}
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 99999;
  font-size: 2em;
  height: $header-height;
  line-height: $header-height;
  > span:first-child {
    padding-left: 1.25rem;
  }
  > span:last-child {
    border: 1px solid white;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    padding: 0px 10px;
    border-radius: 5px;
    margin-right: 20px;
  }
}
#catelogList {
  position: fixed;
  left: 0px;
  top: $header-height;
  width: $catelog-width;
  padding: 10px 0px;
}
#kCatelog {
  margin-left: $catelog-width;
  // height: 100%;
}
.k-catelog-link {
  color: red;
}
.k-catelog-link-active {
  color: red;
}
</style>
