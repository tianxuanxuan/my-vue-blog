<template>
  <div class="section">
    <div class="container">
      <div class="row full-height justify-content-center">
        <div class="col-12 text-center align-self-center py-5">
          <div class="section pb-5 pt-5 pt-sm-2 text-center">
            <h6 class="mb-0 pb-3"><span>登录</span><span>注册</span></h6>
            <input class="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
            <label for="reg-log"></label>
            <div class="card-3d-wrap mx-auto">
              <div class="card-3d-wrapper">
                <div class="card-front">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <h4 class="mb-4 pb-3">登录</h4>
                      <div class="form-group">
                        <input type="text" name="username" v-model="loginData.username" class="form-style"
                               placeholder="用户名" id="logname" autocomplete="off">
                        <i class="input-icon uil uil-user"></i>
                      </div>
                      <div class="form-group mt-2">
                        <input type="password" name="logpass" v-model="loginData.password" class="form-style"
                               placeholder="密码" id="logpass" autocomplete="off">
                        <i class="input-icon uil uil-lock-alt"></i>
                      </div>
                      <a href="#" class="btn mt-4" @click.stop.self="login()">登陆</a>
                      <p class="mb-0 mt-4 text-center"><a href="#0" class="link">忘记密码?</a></p>
                    </div>
                  </div>
                </div>
                <div class="card-back">
                  <div class="center-wrap">
                    <div class="section text-center">
                      <h4 class="mb-4 pb-3">注册</h4>
                      <div class="form-group">
                        <input type="text" name="logname" v-model="registerData.username" class="form-style"
                               placeholder="用户名" id="logname" autocomplete="off">
                        <i class="input-icon uil uil-user"></i>
                      </div>
                      <div class="form-group mt-2">
                        <input type="email" name="logemail" v-model="registerData.email" class="form-style"
                               placeholder="邮箱" id="logemail" autocomplete="off">
                        <i class="input-icon uil uil-at"></i>
                      </div>
                      <div class="form-group mt-2">
                        <input type="password" name="logpass" v-model="registerData.password" class="form-style"
                               placeholder="密码" id="logpass" autocomplete="off">
                        <i class="input-icon uil uil-lock-alt"></i>
                      </div>
                      <a href="#" class="btn mt-4" @click.stop.self="register()">注册</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import login from '@/api/login.js'

export default {
  data () {
    return {
      loginData: {
        username: '',
        password: ''
      },
      registerData: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    login () {
      login.login(this.loginData).then(response => {
        // console.log('測試' + this.loginData.username + ':' + this.loginData.password)
        if (response.data.code === 20000) {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          const jwt = response.headers.authorization // 获取响应头中token
          const userInfo = response.data.data.loginMD // 获取响应中用户信息
          this.$store.commit('SET_TOKEN', jwt)
          this.$store.commit('SET_USERINFO', userInfo)
          this.$store.commit('SET_LOGIN_FLAG', true)
          this.$router.push({ name: 'Blog' }) // 跳转到博客界面
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(error => {
        this.$message.error(error.data.message)
      })
    },
    register () {
      login.register(this.registerData).then(response => {
        if (response.data.code === 20000) {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          this.loginData.username = this.registerData.username
          this.loginData.password = this.registerData.password
          this.login()
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(error => {
        this.$message.error(error.data.message)
      })
    }
  }
}
</script>

<style scoped src="@/assets/css/style.css">
#handler {
  position: relative;
}
</style>
