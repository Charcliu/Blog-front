<template>
    <div class="blogDetail">
      <CommonHeader :header-info="headerInfo"></CommonHeader>
      <div class="content">
        <el-row>
            <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" class="leftTree">
              <!-- 目录容器 -->
              <div class="k-catelog-list" id="catelogList"></div>
            </el-col>
            <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
              <!-- 文章容器 -->
              <div id="kCatelog">
                <mavon-editor v-model="blogInfo.content" defaultOpen="preview" :toolbarsFlag="false" :subfield="false" :preview="true" :ishljs="true" :codeStyle="codeStyle"/>
              </div>
            </el-col>
        </el-row>
        <!-- 文章容器 -->
        <!-- <div id="kCatelog">
          <mavon-editor v-model="blogInfo.content" defaultOpen="preview" :toolbarsFlag="false" :subfield="false" :preview="true" :ishljs="true" :codeStyle="codeStyle"/>
        </div> -->
        <!-- 目录容器 -->
        <!-- <div class="k-catelog-list" id="catelogList"></div> -->
      </div>
    </div>
</template>

<script>
import urls from '@/axios/urls.js'
import Katelog from '@/utils/k-catelog.js'
import CommonHeader from '@/components/CommonHeader'

export default {
  name: 'blogDetail',
  data () {
    return {
      codeStyle: 'atom-one-dark',
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
        _this.$nextTick(() => {
          _this.loadLeftTree()
          _this.addVistor()
        })
      }
    )
  },
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
    loadLeftTree () {
      Katelog({
        contentEl: 'kCatelog',
        catelogEl: 'catelogList',
        linkClass: 'k-catelog-link',
        linkActiveClass: 'k-catelog-link-active',
        supplyTop: 20,
        active: function (el) {}
      })
    },
    addVistor () {
      this.postRequestParam(urls.addVistorCount, {
        blogId: this.blogInfo.id
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

.leftTree {
  position: sticky;
  top: $header-height;
}

#catelogList {
  // position: fixed;
  // left: 0px;
  // top: $header-height;
  // width: $catelog-width;
  // padding: 10px 0px;
}
#kCatelog {
  // margin-left: $catelog-width;
  // height: 100%;
}
</style>
