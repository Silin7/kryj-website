<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import pageJump from '@/hooks/pageJump'
import { authsmscodeApi, updatepasswordApi } from '@/api/interface'

const password: any = ref('')
const password2: any = ref('')
const code: any = ref('')

function getCode() {
  authsmscodeApi({
    scene: 3,
  }).then(() => {
    countdownChange()
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

// 密码重置
function ceateAccount() {
  if (!password.value) {
    ElMessage({
      type: 'error',
      message: '请输入新密码',
    })
    return
  }
  if (!/^(?![a-zA-Z]+$)(?![0-9]+$)(?![^a-zA-Z0-9]+$)[a-zA-Z0-9\W_]{8,16}$/.test(password.value)) {
    ElMessage({
      type: 'error',
      message: '请输入8到16位，包含字母、数字、字符（至少两种）',
    })
    return
  }
  if (!password2.value) {
    ElMessage({
      type: 'error',
      message: '请再次输入新密码',
    })
    return
  }
  if (password.value !== password2.value) {
    ElMessage({
      type: 'error',
      message: '两次密码输入不一致',
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
  updatepasswordApi({
    password: password.value,
    code: code.value,
  }).then(() => {
    ElMessage({
      type: 'success',
      message: '密码修改成功',
    })
    pageJump('login')
  })
}

onUnmounted(() => {
  clearInterval(verificationTimer.value)
})
</script>

<template>
  <div class="rpasswordPage">
    <div class="registerbox">
      <div class="hyzc">修改密码</div>
      <div class="fromItem frsc">
        <img src="@/assets/register/pwd.png" />
        <el-input type="password" show-password v-model="password" style="width: 100%" placeholder="请输入新密码"
          clearable />
      </div>
      <div class="pwdTips">8到16位，包含字母、数字、字符（至少两种）</div>
      <div class="fromItem frsc">
        <img src="@/assets/register/pwd.png" />
        <el-input type="password" show-password v-model="password2" style="width: 100%" placeholder="请再次输入新密码"
          clearable />
      </div>
      <div class="fromItem frsc">
        <img src="@/assets/register/yzm.png" />
        <el-input v-model="code" style="width: calc(100% - 140px)" placeholder="短信验证码" clearable />
        <div v-if="countdown < 60 && countdown > 0" class="djsTimeStyle">
          已发送（{{ countdown }}）
        </div>
        <button v-else @click="getCode">获取验证码</button>
      </div>
      <button class="createAccount" @click="ceateAccount">
        修改密码
      </button>
      <!-- <div class="gologin">已记起密码？<span @click="pageJump('login')">立即登录</span></div> -->
    </div>
  </div>
</template>

<style lang="scss">
.rpasswordPage {
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

  .registerbox {
    margin-top: 10rem;
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

    .fromItem {
      margin-top: 20px;
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

      .djsTimeStyle {
        font-size: 0.85rem;
        color: #4b5563;
      }
    }

    .pwdTips {
      margin-top: 0.25rem;
      padding-left: 3rem;
      font-size: 0.875rem;
      color: #a8abb2;
    }

    .yzmStyle {
      margin-bottom: 20px;
      margin-left: 10px;
      width: 120px;
      height: 40px;
    }

    .stateMent {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 0px;
      line-height: 24px;
      color: #4b5563;

      img {
        margin-right: 6px;
        width: 14px;
        height: 14px;
      }

      span {
        color: #1f3e85;
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
      height: 40px;
      border-radius: 999px;
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
