<script setup lang="ts">
import { ref, computed } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import koneLogo from '../assets/kone-logo.svg'
import heroBg from '../assets/login-bg.jpg'

const heroBgUrl = computed(() => `url(${heroBg})`)

// 登录方式：phone | email | kone
type LoginMode = 'phone' | 'email' | 'kone'
const loginMode = ref<LoginMode>('phone')

// 国家区号列表
const countryCodes = [
  { label: 'China', code: '+86', flag: '🇨🇳' },
  { label: 'Hong Kong', code: '+852', flag: '🇭🇰' },
  { label: 'Taiwan', code: '+886', flag: '🇹🇼' },
  { label: 'Macau', code: '+853', flag: '🇲🇴' },
  { label: 'United States', code: '+1', flag: '🇺🇸' },
  { label: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { label: 'Germany', code: '+49', flag: '🇩🇪' },
  { label: 'France', code: '+33', flag: '🇫🇷' },
  { label: 'Japan', code: '+81', flag: '🇯🇵' },
  { label: 'South Korea', code: '+82', flag: '🇰🇷' },
  { label: 'Singapore', code: '+65', flag: '🇸🇬' },
  { label: 'Australia', code: '+61', flag: '🇦🇺' },
  { label: 'Canada', code: '+1', flag: '🇨🇦' },
  { label: 'India', code: '+91', flag: '🇮🇳' },
  { label: 'Russia', code: '+7', flag: '🇷🇺' },
  { label: 'Finland', code: '+358', flag: '🇫🇮' },
  { label: 'Sweden', code: '+46', flag: '🇸🇪' },
  { label: 'Norway', code: '+47', flag: '🇳🇴' },
  { label: 'Denmark', code: '+45', flag: '🇩🇰' },
  { label: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { label: 'Spain', code: '+34', flag: '🇪🇸' },
  { label: 'Italy', code: '+39', flag: '🇮🇹' },
  { label: 'Brazil', code: '+55', flag: '🇧🇷' },
  { label: 'Mexico', code: '+52', flag: '🇲🇽' },
  { label: 'UAE', code: '+971', flag: '🇦🇪' },
]

const selectedCountry = ref(countryCodes[0])
const showDropdown = ref(false)

function selectCountry(country: typeof countryCodes[0]) {
  selectedCountry.value = country
  showDropdown.value = false
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function closeDropdown() {
  showDropdown.value = false
}

// 手机登录
const phoneNumber = ref('')
const phoneCaptcha = ref('')
const phoneSent = ref(false)
const phoneCountdown = ref(0)

// 邮箱登录
const email = ref('')
const emailCaptcha = ref('')
const emailSent = ref(false)
const emailCountdown = ref(0)

// KONE Account
const agreed = ref(false)
const isLoading = ref(false)
const agreed2 = ref(false)

// 错误提示
const phoneError = ref('')
const phoneCaptchaError = ref('')
const emailError = ref('')
const emailCaptchaError = ref('')

// 倒计时
function startCountdown(type: 'phone' | 'email') {
  const countdown = type === 'phone' ? phoneCountdown : emailCountdown
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)
}

function sendPhoneCode() {
  if (!phoneNumber.value.trim()) {
    phoneError.value = 'Please enter your phone number'
    return
  }
  phoneSent.value = true
  startCountdown('phone')
  MessagePlugin.success('Verification code sent', 3000)
}

function sendEmailCode() {
  if (!email.value.trim()) {
    emailError.value = 'Please enter your email'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
    return
  }
  emailSent.value = true
  startCountdown('email')
  MessagePlugin.success('Verification code sent', 3000)
}

function handlePhoneLogin() {
  phoneError.value = ''
  phoneCaptchaError.value = ''
  if (!phoneNumber.value.trim()) {
    phoneError.value = 'Please enter your phone number'
    return
  }
  if (!phoneCaptcha.value.trim()) {
    phoneCaptchaError.value = 'Please enter the verification code'
    return
  }
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    MessagePlugin.success('Login successful, welcome back!', 3000)
  }, 800)
}

function handleEmailLogin() {
  emailError.value = ''
  emailCaptchaError.value = ''
  if (!email.value.trim()) {
    emailError.value = 'Please enter your email'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
    return
  }
  if (!emailCaptcha.value.trim()) {
    emailCaptchaError.value = 'Please enter the verification code'
    return
  }
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    MessagePlugin.success('Login successful, welcome back!', 3000)
  }, 800)
}

function handleKoneLogin() {
  if (!agreed.value) {
    MessagePlugin.warning('Please agree to the Privacy Policy first', 3000)
    return
  }
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    MessagePlugin.success('Login successful! Redirecting to KONE SSO', 3000)
  }, 800)
}

const phoneSendLabel = computed(() =>
  phoneCountdown.value > 0 ? `${phoneCountdown.value}s` : 'Send'
)
const emailSendLabel = computed(() =>
  emailCountdown.value > 0 ? `${emailCountdown.value}s` : 'Send'
)
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

      <!-- ========== 手机 / 邮箱登录 ========== -->
      <div v-if="loginMode !== 'kone'" class="login-body">

        <!-- Radio 切换 -->
        <div class="radio-group">
          <button
            class="radio-btn"
            :class="{ active: loginMode === 'phone' }"
            @click="loginMode = 'phone'"
          >Phone Login</button>
          <button
            class="radio-btn"
            :class="{ active: loginMode === 'email' }"
            @click="loginMode = 'email'"
          >Email Login</button>
        </div>

        <!-- 手机登录表单 -->
        <form v-if="loginMode === 'phone'" class="login-form" @submit.prevent="handlePhoneLogin">
          <div class="inputs-group">

            <!-- 手机号：区号 + 输入框 -->
            <div class="field-group">
              <div class="phone-row">
                <!-- 区号下拉 -->
                <div class="country-selector" v-click-outside="closeDropdown">
                  <button type="button" class="country-code" @click="toggleDropdown">
                    <span class="country-flag">{{ selectedCountry.flag }}</span>
                    <span class="country-code-text">{{ selectedCountry.code }}</span>
                    <!-- chevron-down icon from Design System -->
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" class="chevron-icon" :class="{ open: showDropdown }">
                      <path d="M3.5 5.5L8 10.5L12.5 5.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <!-- 下拉列表 -->
                  <div v-if="showDropdown" class="dropdown-list">
                    <div
                      v-for="country in countryCodes"
                      :key="country.code + country.label"
                      class="dropdown-item"
                      :class="{ selected: selectedCountry.label === country.label }"
                      @click="selectCountry(country)"
                    >
                      <span class="item-flag">{{ country.flag }}</span>
                      <span class="item-label">{{ country.label }}</span>
                      <span class="item-code">{{ country.code }}</span>
                    </div>
                  </div>
                </div>
                <div class="phone-input-wrapper" :class="{ 'is-error': phoneError }">
                  <input
                    v-model="phoneNumber"
                    type="tel"
                    placeholder="Phone number"
                    class="base-input"
                    @input="phoneError = ''"
                  />
                </div>
              </div>
              <p v-if="phoneError" class="field-error">{{ phoneError }}</p>
            </div>

            <!-- 验证码 -->
            <div class="field-group">
              <div class="captcha-row">
                <div class="captcha-input-wrap" :class="{ 'is-error': phoneCaptchaError }">
                  <input
                    v-model="phoneCaptcha"
                    type="text"
                    placeholder="Verification code"
                    class="base-input"
                    @input="phoneCaptchaError = ''"
                  />
                </div>
                <button
                  type="button"
                  class="send-btn"
                  :disabled="phoneCountdown > 0"
                  @click="sendPhoneCode"
                >{{ phoneSendLabel }}</button>
              </div>
              <p v-if="phoneCaptchaError" class="field-error">{{ phoneCaptchaError }}</p>
            </div>

          </div>

          <!-- Log In 按钮 -->
          <t-button
            type="submit"
            theme="primary"
            size="large"
            shape="round"
            :loading="isLoading"
            class="login-btn"
          ><strong>Log In</strong></t-button>

          <!-- Privacy -->
          <div class="policy-row">
            <t-checkbox v-model="agreed2">
              <span class="policy-text">By continuing, you agree to our
                <t-link theme="primary" href="#" class="policy-link">Privacy Policy</t-link>
              </span>
            </t-checkbox>
          </div>

          <!-- Divider -->
          <div class="divider-row">
            <span class="divider-line" />
          </div>
        </form>

        <!-- 邮箱登录表单 -->
        <form v-if="loginMode === 'email'" class="login-form" @submit.prevent="handleEmailLogin">
          <div class="inputs-group">

            <!-- 邮箱 -->
            <div class="field-group">
              <div class="input-wrapper" :class="{ 'is-error': emailError }">
                <input
                  v-model="email"
                  type="text"
                  placeholder="Email address"
                  class="base-input"
                  @input="emailError = ''"
                />
              </div>
              <p v-if="emailError" class="field-error">{{ emailError }}</p>
            </div>

            <!-- 验证码 -->
            <div class="field-group">
              <div class="captcha-row">
                <div class="captcha-input-wrap" :class="{ 'is-error': emailCaptchaError }">
                  <input
                    v-model="emailCaptcha"
                    type="text"
                    placeholder="Verification code"
                    class="base-input"
                    @input="emailCaptchaError = ''"
                  />
                </div>
                <button
                  type="button"
                  class="send-btn"
                  :disabled="emailCountdown > 0"
                  @click="sendEmailCode"
                >{{ emailSendLabel }}</button>
              </div>
              <p v-if="emailCaptchaError" class="field-error">{{ emailCaptchaError }}</p>
            </div>

          </div>

          <!-- Log In 按钮 -->
          <t-button
            type="submit"
            theme="primary"
            size="large"
            shape="round"
            :loading="isLoading"
            class="login-btn"
          ><strong>Log In</strong></t-button>

          <!-- Privacy -->
          <div class="policy-row">
            <t-checkbox v-model="agreed2">
              <span class="policy-text">By continuing, you agree to our
                <t-link theme="primary" href="#" class="policy-link">Privacy Policy</t-link>
              </span>
            </t-checkbox>
          </div>

          <!-- Divider -->
          <div class="divider-row">
            <span class="divider-line" />
          </div>
        </form>

        <!-- Log In with KONE SSO 按钮 -->
        <button class="kone-account-btn" @click="loginMode = 'kone'">
          Log In with KONE SSO
        </button>

      </div>

      <!-- ========== KONE Account 登录 ========== -->
      <div v-else class="login-body">
        <t-button
          theme="primary"
          size="large"
          shape="round"
          :loading="isLoading"
          class="login-btn"
          @click="handleKoneLogin"
        ><strong>Log in with KONE SSO</strong></t-button>

        <div class="policy-row">
          <t-checkbox v-model="agreed">
            <span class="policy-text">By continuing, you agree to our
              <t-link theme="primary" href="#" class="policy-link">Privacy Policy</t-link>
            </span>
          </t-checkbox>
        </div>

        <!-- 返回 -->
        <div class="back-row">
          <t-link theme="primary" @click="loginMode = 'phone'" class="back-link">
            ← Back to login
          </t-link>
        </div>
      </div>

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
  background: var(--bg-color-container);
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

/* ===== Header ===== */
.login-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
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
  color: var(--text-color-primary);
  margin: 0;
  text-align: left;
}

/* ===== Body ===== */
.login-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

/* ===== Radio Group ===== */
.radio-group {
  display: flex;
  gap: 4px;
  padding: 2px;
  background: var(--component-stroke);
  border-radius: var(--radius-default);
  width: 100%;
  box-sizing: border-box;
}

.radio-btn {
  flex: 1;
  height: 36px;
  border: none;
  border-radius: var(--radius-small);
  background: transparent;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: var(--text-color-secondary);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.radio-btn.active {
  background: var(--bg-color-container);
  color: var(--text-color-primary);
}

/* ===== Form ===== */
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

/* 基础输入框样式 */
.base-input {
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: var(--text-color-primary);
  min-width: 0;
}
.base-input::placeholder { color: var(--text-color-placeholder); }

/* 通用输入框外层 */
.input-wrapper {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--component-border);
  border-radius: 8px;
  background: var(--bg-color-container);
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input-wrapper:focus-within {
  border-color: var(--brand-color);
  box-shadow: 0 0 0 3px rgba(20, 80, 245, 0.1);
}
.input-wrapper.is-error { border-color: var(--error-color); }

/* 手机号行 */
.phone-row {
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
}

.country-selector {
  position: relative;
  flex-shrink: 0;
}

.country-code {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 40px;
  padding: 0 10px;
  border: 1px solid var(--component-border);
  border-radius: 8px;
  background: var(--bg-color-container);
  font-size: 14px;
  color: var(--text-color-primary);
  white-space: nowrap;
  cursor: pointer;
  box-sizing: border-box;
  transition: border-color 0.2s;
}
.country-code:hover {
  border-color: var(--brand-color);
}

.country-flag {
  font-size: 16px;
  line-height: 1;
}

.country-code-text {
  font-size: 14px;
}

.chevron-icon {
  color: var(--text-color-secondary);
  transition: transform 0.2s;
  flex-shrink: 0;
}
.chevron-icon.open {
  transform: rotate(180deg);
}

/* 下拉列表 */
.dropdown-list {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 100;
  background: var(--bg-color-container);
  border: 1px solid var(--component-border);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  min-width: 200px;
  max-height: 240px;
  overflow-y: auto;
  padding: 4px 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.15s;
  font-size: 14px;
  color: var(--text-color-primary);
}
.dropdown-item:hover {
  background: var(--bg-color-container-hover);
}
.dropdown-item.selected {
  background: var(--brand-color-light);
  color: var(--brand-color);
}

.item-flag {
  font-size: 16px;
  line-height: 1;
  flex-shrink: 0;
}
.item-label {
  flex: 1;
  font-size: 14px;
  line-height: 22px;
}
.item-code {
  font-size: 14px;
  color: var(--text-color-secondary);
  flex-shrink: 0;
}

.phone-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--component-border);
  border-radius: 8px;
  background: var(--bg-color-container);
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
  min-width: 0;
}
.phone-input-wrapper:focus-within {
  border-color: var(--brand-color);
  box-shadow: 0 0 0 3px rgba(20, 80, 245, 0.1);
}
.phone-input-wrapper.is-error { border-color: var(--error-color); }

/* 验证码行 */
.captcha-row {
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
}

.captcha-input-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--component-border);
  border-radius: 8px;
  background: var(--bg-color-container);
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
  min-width: 0;
}
.captcha-input-wrap:focus-within {
  border-color: var(--brand-color);
  box-shadow: 0 0 0 3px rgba(20, 80, 245, 0.1);
}
.captcha-input-wrap.is-error { border-color: var(--error-color); }

/* Send 按钮 */
.send-btn {
  width: 120px;
  height: 40px;
  flex-shrink: 0;
  border: 1px solid var(--brand-color);
  border-radius: 8px;
  background: var(--bg-color-container);
  font-size: 16px;
  font-weight: 400;
  color: var(--text-color-brand);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-sizing: border-box;
}
.send-btn:hover:not(:disabled) {
  background: var(--brand-color-light);
}
.send-btn:disabled {
  border-color: var(--component-border);
  color: var(--text-color-disabled);
  cursor: not-allowed;
}

.field-error {
  font-size: 12px;
  line-height: 20px;
  color: var(--error-color);
  margin: 0;
}

/* Log In 主按钮 */
.login-btn {
  width: 100%;
}

/* Privacy Policy */
.policy-row {
  width: 100%;
}
.policy-text {
  font-size: 14px;
  line-height: 22px;
  color: var(--text-color-primary);
}
.policy-link {
  font-size: 14px !important;
  color: var(--text-color-brand) !important;
}

/* Divider */
.divider-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}
.divider-line {
  flex: 1;
  height: 1px;
  background: var(--component-stroke);
}
.divider-text {
  font-size: 14px;
  line-height: 22px;
  color: var(--text-color-primary);
  white-space: nowrap;
}

/* Log In with KONE SSO 次要按钮 */
.kone-account-btn {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 128px;
  background: var(--brand-color-light);
  font-size: 16px;
  font-weight: 600;
  color: var(--brand-color);
  cursor: pointer;
  transition: background 0.2s;
  box-sizing: border-box;
}
.kone-account-btn:hover {
  background: var(--brand-color-light-hover);
}

/* 返回链接 */
.back-row {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}
.back-link {
  font-size: 14px;
  cursor: pointer;
}
</style>
