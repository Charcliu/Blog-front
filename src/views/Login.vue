<template>
    <div class="login">
      <div class="content">
          <h3>登录博客</h3>
          <el-input v-model="username" placeholder="请输入用户名"></el-input>
          <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
          <el-button type="info" @click="login">登录</el-button>
          <div class="register">
            <span>没有账号？请</span>
            <strong @click="toRegister">注册</strong>
          </div>
      </div>
    </div>
</template>
<script>
import urls from '@/axios/urls.js'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      let _this = this
      this.postRequestParam(urls.blogLogin, {
        username: _this.username,
        password: _this.password
      }).then(res => {
        if (res.data) {
          _this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
          })
          _this.$router.push('blogList')
        } else {
          _this.$message({
            showClose: true,
            message: '用户名或者密码错误',
            type: 'error'
          })
        }
      })
    },
    toRegister () {
      this.$router.push('/register')
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  // background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .register {
    margin-top: 60px;
    text-align: center;
    strong {
      cursor: pointer;
    }
  }
}

h3 {
  font-family: serif;
  font-size: 24px;
  letter-spacing: 2px;
  padding-top: 60px;
  margin: 0 auto;
  margin-bottom: 38px;
}

@media screen and (min-width: 768px) {
  .content {
    background-color: #fff;
    height: 480px;
    width: 480px;
    box-shadow: 1px 1px 10px rgb(235, 200, 200);
    display: flex;
    flex-direction: column;
    align-items: center;
    > div {
      width: 60%;
      margin-bottom: 15px;
    }
    > button {
      width: 60%;
    }
  }
}

@media screen and (max-width: 768px) {
  .content {
    background-color: #fff;
    height: 400px;
    width: 300px;
    box-shadow: 1px 1px 10px rgb(235, 200, 200);
    display: flex;
    flex-direction: column;
    align-items: center;
    > div {
      width: 60%;
      margin-bottom: 15px;
    }
    > button {
      width: 60%;
    }
  }
}
</style>
