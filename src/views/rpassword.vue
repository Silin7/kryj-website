<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import pageJump from '@/hooks/pageJump'
import {
  sendverificationcodeApi,
  // verifyverificationcodeApi,
  baseforgotdpwdApi,
  checkloinApi,
  currentuserApi,
} from '@/api/modules/login'


const phone: any = ref('')
const newpassword: any = ref('')
const newpassword2: any = ref('')
const code: any = ref('')

function getCode() {
  if (!phone.value) {
    ElMessage({
      type: 'error',
      message: '请输入手机号',
    })
    return
  }
  if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(phone.value)) {
    ElMessage({
      type: 'error',
      message: '手机号格式错误',
    })
    return
  }
  sendverificationcodeApi({
    phone: phone.value,
  }).then((res: any) => {
    if (res) {
      countdownChange()
    }
  })
}

// 验证码倒计时
const countdown: any = ref(60)
const verificationTimer: any = ref(null)

function countdownChange() {
  verificationTimer.value = setInterval(() => {
    countdown.value -= 1
    // 清除定时器
    if (countdown.value === 0) {
      clearInterval(verificationTimer.value)
      countdown.value = 60
    }
  }, 1000)
}

// 创建账号
function ceateAccount() {
  if (!phone.value) {
    ElMessage({
      type: 'error',
      message: '请输入手机号',
    })
    return
  }
  if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(phone.value)) {
    ElMessage({
      type: 'error',
      message: '手机号格式错误',
    })
    return
  }
  if (!code.value) {
    ElMessage({
      type: 'error',
      message: '请输入验证码',
    })
    return
  }
  if (!newpassword.value) {
    ElMessage({
      type: 'error',
      message: '请输入新密码',
    })
    return
  }
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(newpassword.value)) {
    ElMessage({
      type: 'error',
      message: '请输入8-20位密码（含字母和数字）',
    })
    return
  }
  if (!newpassword2.value) {
    ElMessage({
      type: 'error',
      message: '请再次输入新密码',
    })
    return
  }
  if (newpassword.value !== newpassword2.value) {
    ElMessage({
      type: 'error',
      message: '两次密码输入不一致',
    })
    return
  }
  getBaseforgotdpwd()
  // verifyverificationcodeApi({
  //   phone: phone.value,
  //   code: code.value,
  // }).then((res: any) => {
  //   if (res) {
  //     getBaseforgotdpwd()
  //   }
  // })
}

// 找回密码
function getBaseforgotdpwd() {
  baseforgotdpwdApi({
    phone: phone.value,
    new_password: newpassword.value,
    code: code.value,
  }).then((res: any) => {
    if (res) {
      ElMessage({
        type: 'success',
        message: '账号创建成功',
      })
      pageJump('login')
    }
  })
}

onUnmounted(() => {
  clearInterval(verificationTimer.value)
})
</script>

<template>
  <div class="registerPage">
    <div class="registerbox">
      <div class="hyzc">密码重置</div>
      <div class="fromitem frsc">
        <img src="@/assets/register/user.png" alt="" />
        <el-input v-model="phone" style="width: 100%" placeholder="请输入手机号" clearable />
      </div>
      <div class="fromitem frsc">
        <img src="@/assets/register/yzm.png" alt="" />
        <el-input v-model="code" style="width: calc(100% - 140px)" placeholder="短信验证码" clearable />
        <div v-if="countdown < 60 && countdown > 0" class="djsTimeStyle">
          已发送（{{ countdown }}）
        </div>
        <button v-else @click="getCode">获取验证码</button>
      </div>
      <div class="fromitem frsc">
        <img src="@/assets/register/pwd.png" alt="" />
        <el-input type="password" show-password v-model="newpassword" style="width: 100%"
          placeholder="请输入8-20位密码（含字母和数字）" clearable />
      </div>
      <div class="fromitem frsc">
        <img src="@/assets/register/pwd.png" alt="" />
        <el-input type="password" show-password v-model="newpassword2" style="width: 100%" placeholder="请再次输入新密码"
          clearable />
      </div>
      <button class="createAccount" @click="ceateAccount">
        重新设置密码
      </button>
      <div class="gologin">已记起密码？<span @click="pageJump('login')">立即登录</span></div>
    </div>
    <div class="copyright">
      Copyright ©2025 新材网 版权所有 浙ICP备123456789-1号浙公网安备37000000号
    </div>
  </div>
</template>

<style lang="scss">
.registerPage {
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

  .registerbox {
    margin-top: 4rem;
    padding: 2rem 1rem;
    background: rgba(255, 255, 255, 1);
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
      color: rgba(0, 0, 0, 1);
      text-align: left;
      vertical-align: top;
    }

    .typebox {
      margin-bottom: 20px;

      div {
        display: flex;
        align-items: center;

        img {
          margin-right: 10px;
          width: 18px;
          height: 18px;
        }

        span {
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 0px;
          line-height: 18px;
          color: rgba(0, 0, 0, 1);
          text-align: left;
        }
      }

      div:first-child {
        margin-right: 80px;
      }
    }

    .fromitem {
      margin-bottom: 40px;
      padding: 0 18px;
      height: 48px;
      background: rgba(255, 255, 255, 1);
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
        color: rgba(42, 130, 228, 1);
      }

      .djsTimeStyle {
        font-size: 0.85rem;
        color: rgba(128, 128, 128, 1);
      }
    }

    .statement {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 24px;
      color: rgba(128, 128, 128, 1);

      img {
        margin-right: 10px;
        width: 18px;
        height: 18px;
      }

      span {
        color: rgba(42, 130, 228, 1);
      }

      span:hover {
        @media (min-width: 768px) {
          cursor: pointer;
        }
      }
    }

    .createAccount {
      margin-top: 24px;
      width: 100%;
      height: 48px;
      border-radius: 111px;
      color: #fff;
      background:
        linear-gradient(117.41deg, rgba(2, 93, 244, 1) 0%, rgba(7, 91, 237, 1) 100%),
        rgba(204, 204, 204, 1);
      box-shadow: -1px 4px 6px rgba(4, 71, 177, 0.29);
    }

    .gologin {
      margin-top: 15px;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 24px;
      color: rgba(128, 128, 128, 1);

      span {
        color: rgba(42, 130, 228, 1);
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
    color: rgba(0, 0, 0, 1);
    text-align: center;

    @media (min-width: 768px) {
      position: absolute;
      bottom: 44px;
      width: 100%;
    }
  }
}
</style>
