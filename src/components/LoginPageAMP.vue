<script setup lang="ts">
import { ref } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'

const agreed = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  if (!agreed.value) {
    MessagePlugin.warning('Please agree to the Privacy Policy first', 3000)
    return
  }
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  isLoading.value = false
  MessagePlugin.success('Login successful! Redirecting to KONE Account', 3000)
}
</script>

<template>
  <div class="login-page">
    <!-- 背景图 -->
    <div class="login-bg" />

    <!-- 登录卡片 -->
    <div class="login-card">

      <!-- Logo + 标题 -->
      <div class="login-header">
        <img
          src="https://www.figma.com/api/mcp/asset/197beb50-fe57-4966-a023-c5bab390ac21"
          alt="KONE"
          class="kone-logo"
        />
        <div class="login-title">
          <p>Welcome！</p>
          <p>Asset Management Plan</p>
        </div>
      </div>

      <!-- 操作区 -->
      <div class="login-actions">

        <!-- 主按钮 -->
        <t-button
          theme="primary"
          size="large"
          shape="round"
          :loading="isLoading"
          class="login-btn"
          @click="handleLogin"
        >
          <strong>Log in with KONE Account</strong>
        </t-button>

        <!-- Privacy Policy 勾选 -->
        <div class="policy-row">
          <t-checkbox v-model="agreed" class="policy-checkbox">
            <span class="policy-text">
              By continuing, you agree to our
              <t-link theme="primary" href="#" class="policy-link">Privacy Policy</t-link>
            </span>
          </t-checkbox>
        </div>

      </div>
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
  background-image: url('https://www.figma.com/api/mcp/asset/7040ad22-8734-4aa5-90d9-e8e1c7b62dfa');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

/* ===== 卡片 ===== */
.login-card {
  position: relative;
  z-index: 1;
  background: #ffffff;            /* bg-color-container */
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
  display: flex;
  flex-direction: column;
  gap: 0;
}

.login-title p {
  font-size: 28px;               /* H3 28/Semibold */
  font-weight: 600;
  line-height: 36px;
  color: #141414;                /* text-color-primary */
  margin: 0;
  text-align: left;
}

/* ===== 操作区：gap 24px ===== */
.login-actions {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

/* ===== 登录按钮 ===== */
.login-btn {
  width: 100%;
}

.login-btn :deep(.t-button),
.login-btn :deep(.t-button.t-button--primary),
.login-btn :deep(.t-button.t-size-l) {
  width: 100% !important;
  height: 40px !important;
  border-radius: 128px !important;        /* radius-circle */
  background-color: #1450f5 !important;   /* brand-color */
  border-color: #1450f5 !important;
  font-size: 16px !important;             /* H7 16/Semibold */
  font-weight: 600 !important;
  font-family: 'PingFang SC', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif !important;
  color: #ffffff !important;              /* text-color-white */
}

.login-btn :deep(.t-button:not(.t-is-loading):hover),
.login-btn :deep(.t-button.t-button--primary:not(.t-is-loading):hover) {
  background-color: #4373f7 !important;   /* brand-color-hover */
  border-color: #4373f7 !important;
}

.login-btn :deep(.t-button:not(.t-is-loading):active),
.login-btn :deep(.t-button.t-button--primary:not(.t-is-loading):active) {
  background-color: #1444c8 !important;   /* brand-color-active */
  border-color: #1444c8 !important;
}

.login-btn :deep(.t-button.t-is-disabled),
.login-btn :deep(.t-button.t-button--primary.t-is-disabled) {
  background-color: #a1b9fb !important;   /* brand-color-disabled */
  border-color: #a1b9fb !important;
  cursor: not-allowed !important;
}

/* ===== Privacy Policy 行 ===== */
.policy-row {
  width: 100%;
}

.policy-checkbox :deep(.t-checkbox__label) {
  font-size: 14px;                        /* Body 14/Regular */
  font-weight: 400;
  line-height: 22px;
  color: #141414;                         /* text-color-primary */
  white-space: normal;
}

.policy-text {
  font-size: 14px;
  line-height: 22px;
  color: #141414;                         /* text-color-primary */
}

.policy-link {
  font-size: 14px !important;
  font-weight: 400 !important;
  color: #1450f5 !important;              /* text-color-brand */
  text-decoration: none;
}

.policy-link:hover {
  text-decoration: underline;
}

/* ===== Checkbox 覆盖为品牌色 ===== */
.policy-checkbox :deep(.t-checkbox__input:checked) {
  background-color: #1450f5 !important;   /* brand-color */
  border-color: #1450f5 !important;
}

.policy-checkbox :deep(.t-checkbox__input:hover) {
  border-color: #1450f5 !important;       /* brand-color */
}

.policy-checkbox :deep(.t-checkbox.t-is-checked .t-checkbox__input) {
  background-color: #1450f5 !important;   /* brand-color */
  border-color: #1450f5 !important;
}
</style>
