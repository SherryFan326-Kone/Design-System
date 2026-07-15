<script setup lang="ts">
import { ref } from 'vue'
import { icons } from '../assets/icons/iconPaths'
import koneLogo from '../assets/kone-logo.svg'

const activeMenu = ref('m2')
const expanded = ref(['m2'])
</script>

<template>
  <div class="header-menu-page">

    <t-head-menu
      v-model="activeMenu"
      :expanded="expanded"
      expand-type="popup"
      class="header-menu"
    >
      <!-- ── Logo 插槽 ── -->
      <template #logo>
        <div class="brand-area">
          <img :src="koneLogo" alt="KONE" class="kone-logo" />
        </div>
      </template>

      <!-- ── 菜单项 ── -->
      <t-menu-item value="m1">
        <template #icon>
          <span class="menu-icon" v-html="icons.layers" aria-hidden="true" />
        </template>
        菜单
      </t-menu-item>

      <!-- 选中 + 展开的子菜单 -->
      <t-submenu value="m2">
        <template #icon>
          <span class="menu-icon" v-html="icons.layers" aria-hidden="true" />
        </template>
        <template #title>菜单</template>
        <t-menu-item value="m2-1">二级选项</t-menu-item>
        <t-menu-item value="m2-2">二级选项</t-menu-item>
        <t-menu-item value="m2-3">二级选项</t-menu-item>
      </t-submenu>

      <t-menu-item value="m3">
        <template #icon>
          <span class="menu-icon" v-html="icons.layers" aria-hidden="true" />
        </template>
        菜单
      </t-menu-item>

      <t-menu-item value="m4">
        <template #icon>
          <span class="menu-icon" v-html="icons.layers" aria-hidden="true" />
        </template>
        菜单
      </t-menu-item>

      <t-menu-item value="m5">
        <template #icon>
          <span class="menu-icon" v-html="icons.layers" aria-hidden="true" />
        </template>
        菜单
      </t-menu-item>

      <t-menu-item value="m6">
        <template #icon>
          <span class="menu-icon" v-html="icons.layers" aria-hidden="true" />
        </template>
        菜单
      </t-menu-item>

      <t-menu-item value="m7">
        <template #icon>
          <span class="menu-icon" v-html="icons.layers" aria-hidden="true" />
        </template>
        菜单
      </t-menu-item>

      <!-- ── 右侧操作图标 ── -->
      <template #operations>
        <div class="nav-operations">
          <button class="icon-btn" title="搜索"  v-html="icons.search"       aria-label="搜索" />
          <button class="icon-btn" title="语言"  v-html="icons.language"     aria-label="语言" />
          <button class="icon-btn" title="通知"  v-html="icons.notification" aria-label="通知" />
          <button class="icon-btn" title="个人"  v-html="icons.user"         aria-label="个人" />
        </div>
      </template>
    </t-head-menu>

    <!-- 内容区：纯白背景 -->
    <main class="page-content"></main>

  </div>
</template>

<style scoped>
/* ── 页面根 ────────────────────────────────────────── */
.header-menu-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-color-container);
}

/* ── t-head-menu 覆盖：高度、背景、边框 ────────────── */
.header-menu {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
}

/* 强制 head-menu 高度和背景匹配设计稿 */
:deep(.t-head-menu) {
  height: 56px !important;
  background: var(--bg-color-container) !important;
  border-bottom: 1px solid var(--component-stroke) !important;
  padding: 0 24px !important;
  box-sizing: border-box;
}

:deep(.t-head-menu__inner) {
  height: 56px !important;
  align-items: center;
}

/* Logo 区域 — 覆盖 TDesign 默认 margin-right(48px) 为设计稿的 24px */
:deep(.t-head-menu .t-menu__logo:not(:empty)) {
  height: 100%;
  margin-right: 24px !important;
}

/* 菜单区域：去除 TDesign 默认的 margin-left */
:deep(.t-head-menu__inner .t-menu:first-child) {
  margin-left: 0 !important;
}

/* 菜单项间距 */
:deep(.t-head-menu__inner li + li) {
  margin-left: 0 !important;
}
:deep(.t-head-menu .t-menu) {
  gap: 8px;
}

/* ── 菜单项基础样式 ────────────────────────────────── */
:deep(.t-head-menu .t-menu__item) {
  height: 32px;
  padding: 5px 12px;
  border-radius: var(--radius-default);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: var(--text-color-primary);
  gap: 8px;
}

:deep(.t-head-menu .t-menu__item:hover) {
  background: var(--bg-color-container-hover);
  color: var(--text-color-primary);
}

/* 选中态 */
:deep(.t-head-menu .t-menu__item.t-is-active),
:deep(.t-head-menu .t-submenu.t-is-active > .t-menu__item) {
  background: var(--brand-color-light) !important;
  color: var(--brand-color) !important;
  border-radius: var(--radius-medium) !important;
}

/* submenu 展开父项选中态 */
:deep(.t-head-menu .t-submenu.t-is-opened > .t-menu__item) {
  background: var(--brand-color-light);
  color: var(--brand-color);
  border-radius: var(--radius-medium);
}

/* ── 下拉弹出面板 ──────────────────────────────────── */
:deep(.t-head-menu .t-submenu__popup) {
  top: 44px !important;
}

:deep(.t-head-menu .t-submenu__popup .t-menu) {
  background: var(--bg-color-container);
  border: 0.5px solid var(--component-border);
  border-radius: var(--radius-medium);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 6px;
  min-width: 160px;
}

:deep(.t-head-menu .t-submenu__popup .t-menu__item) {
  height: 28px;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 14px;
  line-height: 22px;
  color: var(--text-color-primary);
}

:deep(.t-head-menu .t-submenu__popup .t-menu__item:hover) {
  background: var(--bg-color-container-hover);
}

:deep(.t-head-menu .t-submenu__popup .t-menu__item.t-is-active) {
  background: var(--brand-color-light);
  color: var(--brand-color);
}

/* ── Brand 区域 ────────────────────────────────────── */
.brand-area {
  display: flex;
  align-items: center;
}

.kone-logo {
  display: block;
  width: auto;
  height: 28px;
  object-fit: contain;
}

/* ── 菜单 prefix icon ──────────────────────────────── */
.menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: currentColor;
  flex-shrink: 0;
}

/* ── 右侧操作图标 ────────────────────────────────────── */
.nav-operations {
  display: flex;
  align-items: center;
  gap: 8px;
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

/* ── 内容区 ─────────────────────────────────────────── */
.page-content {
  margin-top: 56px;
  flex: 1;
}
</style>
