<script setup lang="ts">
import { ref, computed } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import koneLogo from '../assets/kone-logo.svg'
import heroBg from '../assets/login-bg.jpg'

const heroBgUrl = computed(() => `url(${heroBg})`)

const username = ref('')
const password = ref('')
const captchaInput = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const passwordFocused = ref(false)

const usernameError = ref('')
const passwordError = ref('')
const captchaError = ref('')

const VALID_USERNAME = 'Admin'
const VALID_PASSWORD = 'password123'

// 验证码：随机 4 位数字
const captchaCode = ref(generateCaptcha())

function generateCaptcha() {
  return String(Math.floor(1000 + Math.random() * 9000))
}

function refreshCaptcha() {
  captchaCode.value = generateCaptcha()
  captchaInput.value = ''
  captchaError.value = ''
}

// 验证码展示：数字之间加空格
const captchaDisplay = computed(() =>
  captchaCode.value.split('').join(' ')
)

const validateForm = () => {
  let valid = true
  usernameError.value = ''
  passwordError.value = ''
  captchaError.value = ''

  if (!username.value.trim()) {
    usernameError.value = 'Please enter your username'
    valid = false
  }
  if (!password.value.trim()) {
    passwordError.value = 'Please enter your password'
    valid = false
  }
  if (!captchaInput.value.trim()) {
    captchaError.value = 'Please enter the verification code'
    valid = false
  } else if (captchaInput.value.trim() !== captchaCode.value) {
    captchaError.value = 'Incorrect verification code'
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
    MessagePlugin.success('Login successful, welcome back!', 3000)
  } else {
    MessagePlugin.error('Incorrect username or password, please try again', 3000)
    refreshCaptcha()
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-bg" />

    <div class="login-card">
      <!-- Logo + 标题 -->
      <div class="login-header">
        <img
          :src="koneLogo"
          alt="KONE"
          class="kone-logo"
        />
        <h1 class="login-title">Welcome to myKONE!</h1>
      </div>

      <!-- 表单 -->
      <form class="login-form" @submit.prevent="handleLogin">
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
                <svg v-if="showPassword" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path d="M14.0354 7.21533C13.6214 6.51133 11.3861 3 8.04406 3C4.70939 3 2.50206 6.50467 2.09406 7.20667C1.95473 7.44467 1.97139 7.74467 2.13606 7.97067L3.21273 9.428C4.26273 10.6267 5.95606 12.0547 8.06206 12.0547C11.3201 12.0547 13.6034 8.62133 14.0274 7.932C14.1641 7.71067 14.1661 7.43533 14.0354 7.21533ZM8.06273 11.0547C6.33139 11.0547 4.87873 9.812 3.99139 8.80133L3.06073 7.53867C3.60339 6.65933 5.45873 3.99933 8.04406 3.99933C10.6514 3.99933 12.5354 6.69133 13.0781 7.56333C12.5234 8.41667 10.6041 11.0547 8.06273 11.0547ZM10.0834 7.52733C10.0834 8.632 9.18806 9.52733 8.08339 9.52733C6.97873 9.52733 6.08339 8.632 6.08339 7.52733C6.08339 6.42267 6.97873 5.52733 8.08339 5.52733C9.18806 5.52733 10.0834 6.42267 10.0834 7.52733Z" fill="currentColor"/>
                </svg>
                <svg v-else viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path d="M11.4534 7.47868L13.216 10.1227L12.384 10.6773L10.5687 7.95535C9.94895 8.23734 9.2575 8.44488 8.5 8.508V12H7.5V8.50477C6.74634 8.43711 6.05742 8.22699 5.43869 7.94401L3.61602 10.678L2.78402 10.1233L4.55402 7.46868C2.97669 6.47401 2.04669 5.12735 1.98602 5.03801L2.81336 4.47601C2.83402 4.50668 4.93069 7.52735 8.01869 7.52735C11.1167 7.52735 13.164 4.51068 13.184 4.48001L14.016 5.03468C13.9567 5.12401 13.0327 6.48268 11.4534 7.47868Z" fill="currentColor"/>
                </svg>
              </span>
            </div>
            <p v-if="passwordError" class="field-error">{{ passwordError }}</p>
          </div>

          <!-- 验证码 -->
          <div class="field-group">
            <div class="captcha-row">
              <div class="captcha-input-wrapper">
                <t-input
                  v-model="captchaInput"
                  placeholder="Verification code"
                  size="large"
                  :status="captchaError ? 'error' : 'default'"
                  @input="captchaError = ''"
                  class="custom-input captcha-input"
                />
              </div>
              <div class="captcha-img" @click="refreshCaptcha" title="Click to refresh">
                <span class="captcha-text">{{ captchaDisplay }}</span>
              </div>
            </div>
            <p v-if="captchaError" class="field-error">{{ captchaError }}</p>
          </div>

        </div>

        <!-- 操作区 -->
        <div class="actions-group">
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
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 24px;
}

.login-bg {
  position: fixed;
  inset: 0;
  background-image: v-bind(heroBgUrl);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.login-card {
  position: relative;
  z-index: 1;
  background: #ffffff;
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

.login-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  color: #141414;
  margin: 0;
  text-align: left;
  width: 100%;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.inputs-group {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

/* 用户名输入框 */
.custom-input :deep(.t-input) {
  border-radius: 8px !important;
  border-color: var(--component-border) !important;
  background: var(--bg-color-container) !important;
}
.custom-input :deep(.t-input:hover) {
  border-color: var(--brand-color) !important;
}
.custom-input :deep(.t-input.t-is-focused) {
  border-color: var(--brand-color) !important;
  box-shadow: 0 0 0 3px rgba(20, 80, 245, 0.1) !important;
}
.custom-input :deep(.t-input.t-is-error) {
  border-color: var(--error-color) !important;
}
.custom-input :deep(.t-input__inner) {
  color: var(--text-color-primary);
  font-size: 16px;
}
.custom-input :deep(.t-input__inner::placeholder) {
  color: var(--text-color-placeholder);
}

.field-error {
  font-size: 12px;
  line-height: 20px;
  color: var(--error-color);
  margin: 0;
  text-align: left;
}

/* 密码输入框 */
.password-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--component-border);
  border-radius: 8px;
  background: var(--bg-color-container);
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.password-wrapper:hover { border-color: var(--brand-color); }
.password-wrapper.is-focused {
  border-color: var(--brand-color);
  box-shadow: 0 0 0 3px rgba(20, 80, 245, 0.1);
}
.password-wrapper.is-error { border-color: var(--error-color); }

.password-input {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: var(--text-color-primary);
  min-width: 0;
}
.password-input::placeholder { color: var(--text-color-placeholder); }

.eye-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-color-placeholder);
  transition: color 0.2s;
  width: 18px;
  height: 18px;
}
.eye-btn:hover { color: var(--text-color-primary); }

/* ===== 验证码行 ===== */
.captcha-row {
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
}

.captcha-input-wrapper {
  flex: 1;
  min-width: 0;
}

.captcha-input {
  width: 100%;
}

.captcha-img {
  width: 120px;
  height: 40px;
  flex-shrink: 0;
  background: var(--bg-color-component-hover);  /* #dfe1e8 */
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s;
}
.captcha-img:hover { opacity: 0.85; }

.captcha-text {
  font-size: 28px;
  font-weight: 400;
  line-height: 36px;
  color: var(--text-color-placeholder);
  letter-spacing: 2px;
}

/* ===== 操作区 ===== */
.actions-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
}

.login-btn {
  width: 100%;
}
</style>
