<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { authinfoApi } from '@/api/interface'

const nickname: any = ref('')
const userUnit: any = ref('')
const userPost: any = ref('')
const mobile: any = ref('')

// 用户信息
function getAuthinfo() {
  authinfoApi().then((res: any) => {
    nickname.value = res.data.nickname
    userUnit.value = res.data.userUnit
    userPost.value = res.data.userPost
    mobile.value = res.data.mobile
  }).catch(() => {
  })
}

onMounted(() => {
  getAuthinfo()
})
</script>

<template>
  <div class="registerPage">
    <div class="registerBox">
      <div class="hyzc">
        用户信息
      </div>
      <div class="frsc">
        <div class="fromTitle">昵称：</div>
        <div class="fromItem frsc">
          <img src="@/assets/register/nicheng.png" alt="" />
          <el-input v-model="nickname" placeholder="" readonly />
        </div>
      </div>
      <div class="frsc">
        <div class="fromTitle">公司：</div>
        <div class="fromItem frsc">
          <img src="@/assets/register/danwei.png" alt="" />
          <el-input v-model="userUnit" placeholder="" readonly />
        </div>
      </div>
      <div class="frsc">
        <div class="fromTitle">职务：</div>
        <div class="fromItem frsc">
          <img src="@/assets/register/zhiwu.png" alt="" />
          <el-input v-model="userPost" placeholder="" readonly />
        </div>
      </div>
      <div class="frsc">
        <div class="fromTitle">手机号：</div>
        <div class="fromItem frsc">
          <img src="@/assets/register/shoujihao.png" alt="" />
          <el-input type="tel" v-model="mobile" placeholder="请输入手机号" readonly />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.registerPage {
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
    padding-bottom: 2.75rem;
  }

  .registerBox {
    margin-top: 8rem;
    padding: 2rem 1rem;
    background: #fff;
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);

    @media (min-width: 768px) {
      margin: 10% 0 0 calc(80% - 480px);
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

    .fromTitle {
      width: 4rem;
      margin-bottom: 20px;
      height: 40px;
      line-height: 40px;
      color: #4b5563;
    }

    .fromItem {
      margin-bottom: 20px;
      padding: 0 1rem;
      width: calc(100% - 4rem);
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
