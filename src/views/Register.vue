<template>
    <div class="register">
      <div class="content">
          <h3>注册博客</h3>
          <el-input v-model="userInfo.username" placeholder="请输入用户名"></el-input>
          <el-input v-model="userInfo.password" placeholder="请输入密码" type="password"></el-input>
          <el-input v-model="userInfo.address" placeholder="请输入地址"></el-input>
          <el-input v-model="userInfo.email" placeholder="请输入邮箱"></el-input>
          <el-input placeholder="请输入个人主页" v-model="userInfo.space"></el-input>
          <el-input type="textarea" v-model="userInfo.signature" placeholder="请输入个人签名"></el-input>
          <el-button type="info" @click="register">注册</el-button>
      </div>
    </div>
</template>
<script>
import urls from '@/axios/urls.js'

export default {
  name: 'Register',
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
  methods: {
    register () {
      let _this = this

      if (!this.validateForm()) {
        _this.$message({
          showClose: true,
          message: '用户名密码不能为空！',
          type: 'error'
        })
        return
      }

      this.postRequestBody(urls.addUser, this.userInfo)
        .then(res => {
          _this.$message({
            showClose: true,
            message: '注册成功',
            type: 'success'
          })
          _this.$router.push('/login')
        })
        .catch(err => {
          console.log(err)
          _this.$message({
            showClose: true,
            message: '注册失败',
            type: 'error'
          })
        })
    },
    validateForm () {
      if (
        this.userInfo.username.trim().length === 0 ||
        this.userInfo.password.trim().length === 0
      ) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

h3 {
  font-family: serif;
  font-size: 24px;
  letter-spacing: 2px;
  padding-top: 30px;
  margin: 0 auto;
  margin-bottom: 30px;
}

@media screen and (min-width: 768px) {
  .content {
    background-color: #fff;
    height: 500px;
    width: 480px;
    box-shadow: 1px 1px 10px rgb(235, 200, 200);
    display: flex;
    flex-direction: column;
    align-items: center;
    > div {
      width: 60%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      i {
        width: 30px;
      }
    }
    > button {
      width: 60%;
    }
  }
}

@media screen and (max-width: 768px) {
  .content {
    background-color: #fff;
    height: 500px;
    width: 300px;
    box-shadow: 1px 1px 10px rgb(235, 200, 200);
    display: flex;
    flex-direction: column;
    align-items: center;
    > div {
      width: 60%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      i {
        width: 30px;
      }
    }
    > button {
      width: 60%;
    }
  }
}
</style>
