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
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="nav">
            <el-tab-pane label="我的" name="myself"></el-tab-pane>
            <el-tab-pane label="公开" name="all"></el-tab-pane>
          </el-tabs>
          <div class="content">
            <div class="list" v-for="item in blogList" :key="item.id">
              <BlogItem :item="item" :active-name="activeName"></BlogItem>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import urls from "../axios/urls.js";
import {
  convertTimeStampToDate,
  convertDateToLocalString
} from "../utils/timeUtil.js";
import UserInfo from "@/components/UserInfo";
import CommonHeader from "@/components/CommonHeader";
import BlogItem from "@/components/BlogItem";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "blogList",
  data() {
    return {
      headerInfo: {
        title: "博客列表",
        rightBtn: {
          content: "写博客",
          callBack: this.writeBlog,
          type: 0
        }
      },
      activeName: ""
    };
  },
  mounted() {
    this.activeName = this.GET_CURRENT_NAV_NAME;
    if (this.activeName === "all") {
      this.getAllPublicBlog();
    } else {
      this.getMyBlog();
    }
  },
  methods: {
    ...mapMutations(["SET_BLOG_LIST", "SET_CURRENT_NAV_NAME"]),
    writeBlog() {
      this.$router.push({ name: "editMd", params: { blogId: 0 } });
    },
    handleClick(tab, event) {
      if (this.activeName === "all") {
        this.SET_CURRENT_NAV_NAME("all");
        this.getAllPublicBlog();
      } else {
        this.SET_CURRENT_NAV_NAME("myself");
        this.getMyBlog();
      }
      console.log(tab, event);
    },
    getAllPublicBlog() {
      let _this = this;
      this.postRequestBody(urls.getAllPublicBlog, {}).then(res => {
        res.data.forEach(element => {
          element.time = convertDateToLocalString(
            convertTimeStampToDate(element.time)
          );
        });
        _this.SET_BLOG_LIST(res.data);
      });
    },
    getMyBlog() {
      let _this = this;
      this.postRequestBody(urls.getMyBlog, {}).then(res => {
        res.data.forEach(element => {
          element.time = convertDateToLocalString(
            convertTimeStampToDate(element.time)
          );
        });
        _this.SET_BLOG_LIST(res.data);
      });
    }
  },
  computed: {
    ...mapGetters(["GET_BLOG_LIST", "GET_CURRENT_NAV_NAME"]),
    blogList() {
      return this.GET_BLOG_LIST;
    }
  },
  components: {
    UserInfo,
    CommonHeader,
    BlogItem
  }
};
</script>
<style lang="scss" scoped>
$header-height: 5rem;

.blogList {
  height: 100%;
}

.footer {
  width: 80%;
  margin: auto;
  padding-top: $header-height;
  .content {
    padding-bottom: 6.25rem;
    .list {
      border: 1px solid #e8e8e8;
      border-radius: 5px;
      padding: 20px;
      margin-bottom: 10px;
      background-color: #fff;
    }
  }
}

.nav {
  margin-top: 0.625rem;
}
</style>
