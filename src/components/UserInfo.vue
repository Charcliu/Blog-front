<template>
    <div class="userInfo">
        <img src="../assets/user.png" alt="用户头像">
        <div class="nickName">
            {{userInfo.username}}
        </div>
        <div class="bio">
            {{userInfo.signature}}
        </div>
        <div class="address">
            <i class="el-icon-location"></i>
            <span>{{userInfo.address}}</span>
        </div>
        <div class="email">
            <i class="el-icon-message"></i>
            <a :href="'mailto:'+userInfo.email">{{userInfo.email}}</a>
        </div>
        <div class="githubAddress">
            <i class="el-icon-star-on"></i>
            <a :href="'http://'+userInfo.space" target="_blank">{{userInfo.space}}</a>
        </div>
    </div>
</template>
<script>
import urls from '@/axios/urls'

export default {
  name: 'UserInfo',
  data () {
    return {
      userInfo: {
        username: '',
        password: '',
        address: '',
        email: '',
        space: '',
        signature: ''
      }
    }
  },
  mounted () {
    let _this = this
    this.postRequestBody(urls.curUserInfo)
      .then(res => {
        _this.userInfo = res.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="scss" scoped>
.userInfo {
  min-width: 250px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  position: sticky;
  top: 5.625rem;
  div {
    width: 12.5rem;
    text-align: left;
  }
  img {
    width: 12.5rem;
    border-radius: 10px;
  }
  .nickName {
    font-size: 26px;
    font-weight: 600;
    color: #24292e;
    margin: 20px 0px;
  }
  .bio {
    font-size: 14px;
    color: #6a737d;
  }
  .githubAddress {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  a {
    color: #0366d6;
    text-decoration: none;
    font-size: 14px;
    margin-left: 10px;
  }
  div {
    margin: 10px 0px;
  }
  .address {
    span {
      margin-left: 10px;
    }
  }
}
</style>
