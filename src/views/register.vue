<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import pageJump from '@/hooks/pageJump'
import { authcodeApi, authregisterApi } from '@/api/interface'

const isreadRuler: any = ref(false)
const userUnit: any = ref('')
const userPost: any = ref('')
const mobile: any = ref('')
const password: any = ref('')
const password2: any = ref('')
const captchaVerification: any = ref('')

// 获取验证码
const uuid: any = ref('')
const codeImg: any = ref('')
function getCode() {
  authcodeApi().then((res: any) => {
    if (res?.code === 0) {
      uuid.value = res.data.uuid
      codeImg.value = 'data:image/gif;base64,' + res.data.img
    }
  })
}

// 创建账号
function ceateAccount() {
  if (!userUnit.value) {
    ElMessage({
      type: 'error',
      message: '请输入单位',
    })
    return
  }
  if (!userPost.value) {
    ElMessage({
      type: 'error',
      message: '请输入职务',
    })
    return
  }
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
  if (!password.value) {
    ElMessage({
      type: 'error',
      message: '请输入密码',
    })
    return
  }
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(password.value)) {
    ElMessage({
      type: 'error',
      message: '请输入8-20位密码（含字母和数字）',
    })
    return
  }
  if (!password2.value) {
    ElMessage({
      type: 'error',
      message: '请再次输入密码',
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
  if (!captchaVerification.value) {
    ElMessage({
      type: 'error',
      message: '请输入验证码',
    })
    return
  }
  if (!isreadRuler.value) {
    ElMessage({
      type: 'error',
      message: '请勾选底部声明',
    })
    return
  }
  authregisterApi({
    uuid: uuid.value,
    userUnit: userUnit.value,
    userPost: userPost.value,
    mobile: mobile.value,
    password: password.value,
    captchaVerification: captchaVerification.value,
  }).then(() => {
    ElMessage({
      type: 'success',
      message: '账号创建成功',
    })
    pageJump('login')
  }).catch(() => {
    getCode()
  })
}

onMounted(() => {
  getCode()
})
</script>

<template>
  <div class="registerPage">
    <div class="registerBox">
      <div class="hyzc">
        欢迎注册
        <span>（新用户注册有3次免费机会）</span>
      </div>
      <div class="fromItem frsc">
        <img src="@/assets/register/danwei.png" alt="" />
        <el-input v-model="userUnit" placeholder="请输入单位" clearable />
      </div>
      <div class="fromItem frsc">
        <img src="@/assets/register/zhiwu.png" alt="" />
        <el-input v-model="userPost" placeholder="请输入职务" clearable />
      </div>
      <div class="fromItem frsc">
        <img src="@/assets/register/shoujihao.png" alt="" />
        <el-input v-model="mobile" placeholder="请输入手机号" clearable />
      </div>
      <div class="fromItem frsc">
        <img src="@/assets/register/pwd.png" alt="" />
        <el-input type="password" show-password v-model="password" placeholder="请输入8-20位密码（含字母和数字）" clearable />
      </div>
      <div class="fromItem frsc">
        <img src="@/assets/register/pwd2.png" alt="" />
        <el-input type="password" show-password v-model="password2" placeholder="请再次输入密码" clearable />
      </div>
      <div class="frsc">
        <div class="fromItem frsc" style="width: calc(100% - 130px)">
          <img src="@/assets/register/yzm.png" alt="" />
          <el-input v-model="captchaVerification" placeholder="请输入验证码" clearable />
        </div>
        <img :src="codeImg" alt="" class="yzmStyle" @click="getCode" />
      </div>
      <div class="stateMent">
        <img v-if="isreadRuler" src="@/assets/register/checked.png" alt="" @click="isreadRuler = !isreadRuler" />
        <img v-else src="@/assets/register/unchecked.png" alt="" @click="isreadRuler = !isreadRuler" />
        我已阅读并同意
        <span @click="
          pageJump('article_detail', {
            theurl: 'user-service-agreement',
          })
          ">《科睿易晶用户服务协议》</span>和
        <span @click="
          pageJump('article_detail', {
            theurl: 'privacy-policy-statement',
          })
          ">《科睿易晶隐私政策声明》</span>
      </div>
      <button class="createAccount" @click="ceateAccount">创建账号</button>
      <div class="gologin">已有账号？<span @click="pageJump('login')">立即登录</span></div>
    </div>
    <div class="copyright">
      Copyright ©2025 科睿易晶 版权所有 鲁ICP备123456789-1号鲁公网安备37000000号
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

  .registerBox {
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

      .djsTimeStyle {
        font-size: 0.85rem;
        color: #4b5563;
      }
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
