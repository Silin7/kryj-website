<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import pageJump from '@/hooks/pageJump'
import {
  sendverificationcodeApi,
  // verifyverificationcodeApi,
  baselogincodeApi,
  baseloginpwdApi,
} from '@/api/modules/login'

const mobile: any = ref('')
const password: any = ref('')
const code: any = ref('')
const captchaVerification: any = ref('')

function getCode() {
}

// 验证码登录
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
  baseloginpwdApi({
    mobile: mobile.value,
    password: password.value,
    captchaVerification: captchaVerification.value,
  }).then((res: any) => {
    if (res) {
      ElMessage({
        type: 'success',
        message: '登录成功',
      })
      window.localStorage.setItem('token', res.token)
      window.localStorage.setItem('userinfo', JSON.stringify(res.user_info))
      window.localStorage.setItem('permission', JSON.stringify(res.permission))
      pageJump('home')
    }
  })
}

// 验证码登录
function getBaselogincode() {
  baselogincodeApi({
    mobile: mobile.value,
    code: code.value,
  }).then((res: any) => {
    if (res) {
      ElMessage({
        type: 'success',
        message: '登录成功',
      })
      window.localStorage.setItem('token', res.token)
      window.localStorage.setItem('userinfo', JSON.stringify(res.user_info))
      window.localStorage.setItem('permission', JSON.stringify(res.permission))
      pageJump('home')
    }
  })
}
</script>

<template>
  <div class="loginPage">
    <div class="loginBox">
      <div class="hyzc">
        欢迎登录
      </div>
      <div class="fromBox">
        <div class="fromItem frsc">
          <img src="@/assets/register/shoujihao.png" alt="" />
          <el-input v-model="mobile" style="width: 100%" placeholder="请输入手机号" clearable />
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
          <img src="@/assets/register/yzmdemo.png" alt="验证码" class="yzmStyle">
        </div>
        <div class="frec">
          <button class="forgotPassword" @click="pageJump('rpassword')">忘记密码</button>
        </div>
      </div>
      <button class="createAccount" @click="loginByCoode">登录</button>
      <div class="gologin">
        还没账户？<span @click="pageJump('register')">免费注册</span>
      </div>
    </div>
    <div class="copyright">
      Copyright ©2025 科睿易晶 版权所有 鲁ICP备123456789-1号鲁公网安备37000000号
    </div>
  </div>
</template>

<style lang="scss">
.loginPage {
  overflow-y: auto;
  position: fixed;
  padding: 1rem;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/login-banner.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  background-position: right;

  .loginBox {
    margin-top: 4rem;
    padding: 2rem 1rem;
    background: #fff;
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);

    @media (min-width: 768px) {
      position: absolute;
      top: 20%;
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
      padding: 0 18px;
      height: 40px;
      background: #fff;
      border: 1px solid rgba(224, 224, 224, 1);

      img {
        margin-right: 20px;
        width: 16px;
        height: 16px;
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
        line-height: 16px;
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
