<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import pageJump from '@/hooks/pageJump'
import { authcodeApi, authloginApi, authinfoApi } from '@/api/interface'

const mobile: any = ref('')
const password: any = ref('')
const captchaVerification: any = ref('')

// 获取验证码
const uuid: any = ref('')
const codeImg: any = ref('')
function getCode() {
  authcodeApi().then((res: any) => {
    uuid.value = res.data.uuid
    codeImg.value = 'data:image/gif;base64,' + res.data.img
  })
}

// 登录
function loginByCoode() {
  if (!mobile.value) {
    ElMessage({
      type: 'error',
      message: '请输入手机号',
    })
    return
  }
  if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(mobile.value)) {
    ElMessage({
      type: 'error',
      message: '手机号格式错误',
    })
    return
  }
  // 密码登录
  if (!password.value) {
    ElMessage({
      type: 'error',
      message: '请输入密码',
    })
    return
  }
  if (!captchaVerification.value) {
    ElMessage({
      type: 'error',
      message: '请输入验证码',
    })
    return
  }
  authloginApi({
    uuid: uuid.value,
    mobile: mobile.value,
    password: password.value,
    captchaVerification: captchaVerification.value,
  }).then((res: any) => {
    window.localStorage.setItem('accessToken', res.data.accessToken)
    window.localStorage.setItem('refreshToken', res.data.refreshToken)
    window.localStorage.setItem('expiresTime', res.data.expiresTime)
    getAuthinfo()
  }).catch(() => {
    getCode()
  })
}

// 用户信息
function getAuthinfo() {
  authinfoApi().then((res: any) => {
    ElMessage({
      type: 'success',
      message: '登录成功',
    })
    window.localStorage.setItem('userInfo', JSON.stringify(res.data))
    pageJump('ai')
  })
}

onMounted(() => {
  getCode()
})
</script>

<template>
  <div class="loginPage">
    <div class="loginBox">
      <div class="hyzc">欢迎登录</div>
      <div class="fromBox">
        <div class="fromItem frsc">
          <img src="@/assets/register/shoujihao.png" alt="" />
          <el-input type="tel" v-model="mobile" style="width: 100%" placeholder="请输入手机号" clearable />
        </div>
        <div class="fromItem frsc">
          <img src="@/assets/register/pwd.png" alt="" />
          <el-input type="password" show-password v-model="password" style="width: 100%" placeholder="请输入密码"
            clearable />
        </div>
        <div class="frsc">
          <div class="fromItem frsc" style="width: calc(100% - 130px)">
            <img src="@/assets/register/yzm.png" alt="" />
            <el-input v-model="captchaVerification" placeholder="请输入验证码" clearable />
          </div>
          <img :src="codeImg" alt="" class="yzmStyle" @click="getCode" />
        </div>
        <div class="frec">
          <button class="forgotPassword" @click="pageJump('rpassword')">忘记密码</button>
        </div>
      </div>
      <button class="createAccount" @click="loginByCoode">登录</button>
      <div class="gologin">还没账户？<span @click="pageJump('register')">免费注册</span></div>
    </div>
    <!-- <div class="copyright">
      Copyright ©2025 科睿易晶 版权所有 鲁ICP备123456789-1号鲁公网安备37000000号
    </div> -->
  </div>
</template>

<style lang="scss">
.loginPage {
  padding: 1rem;
  width: 100vw;
  min-height: calc(100vh - 88px);
  background-image: url('../assets/register/login-banner.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  background-position: right;

  @media (max-width: 768px) {
    min-height: calc(100vh - 112px);
  }

  .loginBox {
    margin-top: 8rem;
    padding: 2rem 1rem;
    background: #fff;
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);

    @media (min-width: 768px) {
      position: absolute;
      z-index: 2;
      top: 10%;
      right: 20%;
      padding: 30px 50px 50px;
      width: 30rem;
    }

    .hyzc {
      margin-bottom: 25px;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 0px;
      line-height: 30px;
      color: #1f3e85;
      text-align: left;
      vertical-align: top;

      span {
        font-size: 14px;
        line-height: 30px;
        color: #4b5563;
      }
    }

    .fromItem {
      margin-bottom: 20px;
      padding: 0 1rem;
      height: 40px;
      background: #fff;
      border: 1px solid rgba(224, 224, 224, 1);

      img {
        margin-right: 1rem;
        width: 1rem;
        height: 1rem;
        object-fit: fill;
      }

      .el-input__wrapper {
        border: none !important;
        box-shadow: none !important;
        padding: 0px;
      }

      button {
        margin-left: 10px;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 1rem;
        color: #1f3e85;
      }
    }

    .forgotPassword {
      margin-top: 12px;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 24px;
      color: #1f3e85;
    }

    .yzmStyle {
      margin-bottom: 20px;
      margin-left: 10px;
      width: 120px;
      height: 40px;
    }

    .createAccount {
      margin-top: 24px;
      width: 100%;
      height: 40px;
      border-radius: 111px;
      color: #fff;
      background: #1f3e85;
      box-shadow: -1px 4px 6px rgba(31, 62, 133, 0.2);
    }

    .gologin {
      margin-top: 15px;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 24px;
      color: #4b5563;

      span {
        color: #1f3e85;
      }

      span:hover {
        @media (min-width: 768px) {
          cursor: pointer;
        }
      }
    }
  }

  .copyright {
    margin-top: calc(100vh - 47rem);
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 26px;
    color: #000;
    text-align: center;

    @media (min-width: 768px) {
      position: absolute;
      bottom: 44px;
      width: 100%;
    }
  }
}
</style>
