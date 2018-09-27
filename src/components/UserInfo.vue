<template>
    <div class="userInfo">
        <img src="../assets/user.png" alt="用户头像">
        <div class="nickName">
            Chang Lau
        </div>
        <div class="bio">
            这短短的一生，我们最终都会失去。你不妨大胆一些，爱一个人，攀一座山，追一个梦。
        </div>
        <div class="address">
            <i class="el-icon-location"></i>
            <span>Xi'an China</span>
        </div>
        <div class="email">
            <i class="el-icon-message"></i>
            <a href="mailto:f.liuchang@gmail.com">f.liuchang@gmail.com</a>
        </div>
        <div class="githubAddress">
            <i class="el-icon-star-on"></i>
            <a href="https://github.com/Wofluently" target="_blank">https://github.com/Wofluently</a>
        </div>
    </div>
</template>
<script>
export default {
  name: 'UserInfo',
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.userInfo {
  min-width: 250px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  div {
    width: 12.5rem;
  }
  img {
    width: 12.5rem;
    border-radius: 10px;
    margin-top: 10px;
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
