<script setup lang="ts">
import { ref } from 'vue'
import { icons } from '../assets/icons/iconPaths'
import koneLogo from '../assets/kone-logo.svg'

// ── 当前选中的导航项
const activeNav = ref('nav2')

// ── 导航项数据
interface NavItem {
  key: string
  label: string
  hasDropdown?: boolean
}

const navItems: NavItem[] = [
  { key: 'nav1', label: 'Navi item' },
  { key: 'nav2', label: 'Navi item' },
  { key: 'nav3', label: 'Navi item' },
  { key: 'nav4', label: 'Navi item', hasDropdown: true },
]
</script>

<template>
  <div class="top-nav-page">

    <!-- ─── 顶部导航栏 ──────────────────────────────── -->
    <header class="top-nav">

      <!-- 左侧：Brand（Logo + App Name） -->
      <div class="brand-area">
        <img :src="koneLogo" alt="KONE" class="kone-logo" />
        <span class="app-name">App Name</span>
      </div>

      <!-- 中间：水平导航 tabs -->
      <nav class="nav-tabs" aria-label="主导航">
        <button
          v-for="item in navItems"
          :key="item.key"
          class="nav-tab"
          :class="{ 'nav-tab--active': activeNav === item.key }"
          @click="activeNav = item.key"
        >
          <span class="nav-tab-label">{{ item.label }}</span>
          <span
            v-if="item.hasDropdown"
            class="nav-tab-chevron"
            v-html="icons.chevronDown"
            aria-hidden="true"
          />
        </button>
      </nav>

      <!-- 右侧：操作图标 -->
      <div class="top-nav-right">
        <button class="icon-btn" title="搜索"  v-html="icons.search"       aria-label="搜索" />
        <button class="icon-btn" title="语言"  v-html="icons.language"     aria-label="语言" />
        <button class="icon-btn" title="通知"  v-html="icons.notification" aria-label="通知" />
        <button class="icon-btn" title="个人"  v-html="icons.user"         aria-label="个人" />
      </div>
    </header>

    <!-- 内容区：纯白背景，无内边距 -->
    <main class="page-content"></main>

  </div>
</template>

<style scoped>
/* ── 页面根 ────────────────────────────────────────── */
.top-nav-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-color-container);
}

/* ── 顶部导航栏：三栏布局（左/中/右） ──────────────── */
.top-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  height: 56px;
  background: var(--bg-color-container);
  border-bottom: 1px solid var(--component-stroke);
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
}

/* ── 左侧：Brand ────────────────────────────────────── */
.brand-area {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
}

.kone-logo {
  display: block;
  width: auto;
  height: 28px;
  flex-shrink: 0;
  object-fit: contain;
}

.app-name {
  font-size: 18px;
  font-weight: 600;
  line-height: 26px;
  color: var(--text-color-primary);
  white-space: nowrap;
}

/* ── 中间：水平导航 tabs ─────────────────────────────── */
.nav-tabs {
  display: flex;
  align-items: stretch;
  height: 100%;
  gap: 48px;
  /* 绝对居中 */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 100%;
  padding: 0;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  font-size: 16px;
  font-weight: 400;           /* 默认 Regular */
  line-height: 24px;
  color: var(--text-color-primary);
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
  transition: color 0.15s, border-color 0.15s;
}

/* Hover：底部描边 brand-color-hover，文字保持 primary，字重不变 */
.nav-tab:hover {
  border-bottom-color: var(--brand-color-hover);
}

/* 选中：底部描边 brand-color，文字 brand-color，字重 Semibold */
.nav-tab--active {
  color: var(--brand-color);
  border-bottom-color: var(--brand-color);
  font-weight: 600;
}

/* chevron 图标 */
.nav-tab-chevron {
  display: flex;
  align-items: center;
  color: currentColor;
  flex-shrink: 0;
  transform: scale(1.125);
  transform-origin: center;
}

/* ── 右侧操作图标 ────────────────────────────────────── */
.top-nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.icon-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: var(--radius-default);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-color-brand);
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}
.icon-btn:hover  { background: var(--brand-color-light); color: var(--brand-color); }
.icon-btn:active { background: var(--brand-color-focus); }

/* ── 内容区：纯白，无 padding ────────────────────────── */
.page-content {
  margin-top: 56px;
  flex: 1;
}
</style>
