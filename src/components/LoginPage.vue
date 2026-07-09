<script setup lang="ts">
import { ref } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)
const passwordFocused = ref(false)

const usernameError = ref('')
const passwordError = ref('')

const VALID_USERNAME = 'Admin'
const VALID_PASSWORD = 'password123'

const validateForm = () => {
  let valid = true
  usernameError.value = ''
  passwordError.value = ''
  if (!username.value.trim()) {
    usernameError.value = 'Please enter your username'
    valid = false
  }
  if (!password.value.trim()) {
    passwordError.value = 'Please enter your password'
    valid = false
  }
  return valid
}

const handleLogin = async () => {
  if (!validateForm()) return
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  isLoading.value = false
  if (username.value === VALID_USERNAME && password.value === VALID_PASSWORD) {
    MessagePlugin.success('登录成功，欢迎回来！', 3000)
  } else {
    MessagePlugin.error('用户名或密码错误，请重试', 3000)
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-bg" />

    <div class="login-card">
      <!-- Logo + 标题：左对齐，gap 24px -->
      <div class="login-header">
        <img
          src="https://www.figma.com/api/mcp/asset/bf94dc33-4f67-4968-af63-5ab87d4bb7a7"
          alt="KONE"
          class="kone-logo"
        />
        <h1 class="login-title">Welcome to myKONE!</h1>
      </div>

      <!-- 表单区：gap 16px（输入框组 和 操作组之间） -->
      <form class="login-form" @submit.prevent="handleLogin">

        <!-- 输入框组：两者间距 24px -->
        <div class="inputs-group">
          <!-- 用户名 -->
          <div class="field-group">
            <t-input
              v-model="username"
              placeholder="Enter your username"
              size="large"
              :status="usernameError ? 'error' : 'default'"
              @input="usernameError = ''"
              class="custom-input"
            />
            <p v-if="usernameError" class="field-error">{{ usernameError }}</p>
          </div>

          <!-- 密码 -->
          <div class="field-group">
            <div class="password-wrapper" :class="{ 'is-error': passwordError, 'is-focused': passwordFocused }">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="password-input"
                @focus="passwordFocused = true"
                @blur="passwordFocused = false"
                @input="passwordError = ''"
              />
              <span class="eye-btn" @click="showPassword = !showPassword">
                <!-- show icon：来自 Design System，密码可见时显示 -->
                <svg v-if="showPassword" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path d="M14.0354 7.21533C13.6214 6.51133 11.3861 3 8.04406 3C4.70939 3 2.50206 6.50467 2.09406 7.20667C1.95473 7.44467 1.97139 7.74467 2.13606 7.97067L3.21273 9.428C4.26273 10.6267 5.95606 12.0547 8.06206 12.0547C11.3201 12.0547 13.6034 8.62133 14.0274 7.932C14.1641 7.71067 14.1661 7.43533 14.0354 7.21533ZM8.06273 11.0547C6.33139 11.0547 4.87873 9.812 3.99139 8.80133L3.06073 7.53867C3.60339 6.65933 5.45873 3.99933 8.04406 3.99933C10.6514 3.99933 12.5354 6.69133 13.0781 7.56333C12.5234 8.41667 10.6041 11.0547 8.06273 11.0547ZM10.0834 7.52733C10.0834 8.632 9.18806 9.52733 8.08339 9.52733C6.97873 9.52733 6.08339 8.632 6.08339 7.52733C6.08339 6.42267 6.97873 5.52733 8.08339 5.52733C9.18806 5.52733 10.0834 6.42267 10.0834 7.52733Z" fill="currentColor"/>
                </svg>
                <!-- hide icon：来自 Design System，密码隐藏时显示 -->
                <svg v-else viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path d="M11.4534 7.47868L13.216 10.1227L12.384 10.6773L10.5687 7.95535C9.94895 8.23734 9.2575 8.44488 8.5 8.508V12H7.5V8.50477C6.74634 8.43711 6.05742 8.22699 5.43869 7.94401L3.61602 10.678L2.78402 10.1233L4.55402 7.46868C2.97669 6.47401 2.04669 5.12735 1.98602 5.03801L2.81336 4.47601C2.83402 4.50668 4.93069 7.52735 8.01869 7.52735C11.1167 7.52735 13.164 4.51068 13.184 4.48001L14.016 5.03468C13.9567 5.12401 13.0327 6.48268 11.4534 7.47868Z" fill="currentColor"/>
                </svg>
              </span>
            </div>
            <p v-if="passwordError" class="field-error">{{ passwordError }}</p>
          </div>
        </div>

        <!-- 操作组：Remember me / 按钮 / 忘记密码，gap 24px -->
        <div class="actions-group">
          <t-checkbox v-model="rememberMe" class="remember-check">Remember me</t-checkbox>

          <t-button
            type="submit"
            theme="primary"
            size="large"
            shape="round"
            :loading="isLoading"
            class="login-btn"
          >
            <strong>Log In</strong>
          </t-button>

          <div class="forgot-row">
            <t-link theme="primary" href="#" class="forgot-link">Forgot password？</t-link>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<style scoped>
/* ===== 页面：居中布局 ===== */
.login-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'PingFang SC', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
  box-sizing: border-box;
  padding: 24px;
}

/* ===== 背景图 ===== */
.login-bg {
  position: fixed;
  inset: 0;
  background-image: url('https://www.figma.com/api/mcp/asset/c390996b-ad84-4a79-bbd6-711c0500002f');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

/* ===== 卡片：固定 440px，padding 40px，内部 gap 32px ===== */
.login-card {
  position: relative;
  z-index: 1;
  background: #ffffff;       /* bg-color-container */
  border-radius: 24px;
  padding: 40px;
  width: 440px;
  max-width: calc(100vw - 48px);
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
}

/* ===== Logo + 标题：左对齐，gap 24px ===== */
.login-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;   /* 左对齐 */
  gap: 24px;
  width: 100%;
}

.kone-logo {
  width: 72px;
  height: 28px;
  object-fit: contain;
  display: block;
}

.login-title {
  font-size: 28px;           /* H3 28/Semibold */
  font-weight: 600;
  line-height: 36px;
  color: #141414;            /* text-color-primary */
  margin: 0;
  letter-spacing: 0;
  text-align: left;          /* 左对齐 */
  width: 100%;
}

/* ===== 表单：输入框组和操作组之间 gap 16px ===== */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

/* ===== 输入框组：两个输入框间距 24px ===== */
.inputs-group {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

/* 每个输入框+报错 */
.field-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

/* 输入框圆角 8px + token 颜色 */
.custom-input :deep(.t-input) {
  border-radius: 8px !important;
  border-color: #c8cad0 !important;  /* component-border */
  background: #ffffff !important;    /* bg-color-container */
}

.custom-input :deep(.t-input:hover) {
  border-color: #1450f5 !important;  /* brand-color */
}

.custom-input :deep(.t-input.t-is-focused) {
  border-color: #1450f5 !important;
  box-shadow: 0 0 0 3px rgba(20, 80, 245, 0.1) !important;
}

.custom-input :deep(.t-input.t-is-error) {
  border-color: #f51414 !important;  /* error-color */
}

.custom-input :deep(.t-input__inner) {
  color: #141414;                    /* text-color-primary */
  font-family: 'PingFang SC', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
}

.custom-input :deep(.t-input__inner::placeholder) {
  color: #8f9195;                    /* text-color-placeholder */
}

/* ===== 报错文字：红色左对齐 ===== */
.field-error {
  font-size: 12px;
  line-height: 20px;
  color: #f51414;                    /* error-color */
  margin: 0;
  text-align: left;
}

/* ===== 自定义密码输入框（与 t-input 样式保持一致）===== */
.password-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;                      /* size="large" 的高度 */
  padding: 0 12px;
  border: 1px solid #c8cad0;         /* component-border */
  border-radius: 8px;
  background: #ffffff;               /* bg-color-container */
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.password-wrapper:hover {
  border-color: #1450f5;             /* brand-color */
}

.password-wrapper.is-focused {
  border-color: #1450f5;             /* brand-color */
  box-shadow: 0 0 0 3px rgba(20, 80, 245, 0.1);
}

.password-wrapper.is-error {
  border-color: #f51414;             /* error-color */
}

.password-input {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'PingFang SC', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;                   /* H7 16/Regular */
  color: #141414;                    /* text-color-primary */
  min-width: 0;
}

.password-input::placeholder {
  color: #8f9195;                    /* text-color-placeholder */
}

/* ===== 密码眼睛图标 ===== */
.eye-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #8f9195;        /* text-color-placeholder */
  transition: color 0.2s;
  width: 18px;
  height: 18px;
}

.eye-btn:hover {
  color: #141414;        /* text-color-primary */
}

/* ===== 操作组：Remember me / 按钮 / 忘记密码，gap 16px ===== */
.actions-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
}

.remember-check :deep(.t-checkbox__label) {
  font-size: 14px;                   /* Body 14/Regular */
  color: #141414;                    /* text-color-primary */
  line-height: 22px;
}

/* ===== 登录按钮：宽 360px，高 40px，圆角长方形 8px，品牌主色 ===== */
.login-btn {
  width: 360px;
  max-width: 100%;
  --td-brand-color: #1450f5;           /* brand-color */
  --td-brand-color-hover: #4373f7;     /* brand-color-hover */
  --td-brand-color-active: #1444c8;    /* brand-color-active */
  --td-brand-color-disabled: #a1b9fb;  /* brand-color-disabled */
}

.login-btn :deep(.t-button) {
  width: 100% !important;
  height: 40px !important;
  border-radius: 128px !important;       /* radius-circle，大圆角 pill 形 */
  background-color: #1450f5 !important;  /* brand-color */
  border-color: #1450f5 !important;
  font-size: 16px !important;            /* H7 16/Semibold */
  font-weight: 600 !important;
  font-family: 'PingFang SC', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif !important;
  color: #ffffff !important;             /* text-color-white */
  padding: 8px 24px !important;
}

.login-btn :deep(.t-button:not(.t-is-loading):hover) {
  background-color: #4373f7 !important;  /* brand-color-hover */
  border-color: #4373f7 !important;
}

.login-btn :deep(.t-button:not(.t-is-loading):active) {
  background-color: #1444c8 !important;  /* brand-color-active */
  border-color: #1444c8 !important;
}

.login-btn :deep(.t-button.t-is-disabled) {
  background-color: #a1b9fb !important;  /* brand-color-disabled */
  border-color: #a1b9fb !important;
  cursor: not-allowed !important;
}

/* ===== 忘记密码：居中 ===== */
.forgot-row {
  width: 360px;
  max-width: 100%;
  display: flex;
  justify-content: center;
}

.forgot-link {
  font-size: 14px;                   /* Body 14/Semibold */
  font-weight: 600;
  color: #1450f5 !important;         /* text-color-brand */
}
</style>
