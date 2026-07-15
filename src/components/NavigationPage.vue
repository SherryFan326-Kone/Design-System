<script setup lang="ts">
import { ref } from 'vue'
import { icons } from '../assets/icons/iconPaths'
import koneLogo from '../assets/kone-logo.svg'

// ── 状态 ───────────────────────────────────────────────
const collapsed = ref(false)
const activeKey  = ref('5-3-1')
const expanded   = ref<string[]>(['5', '5-3'])

// ── 数据结构 ────────────────────────────────────────────
interface BaseItem  { key: string; label: string }
interface SubItem   { key: string; label: string; children?: BaseItem[] }
interface MenuItem  { key: string; label: string; children?: SubItem[] }

const menuItems: MenuItem[] = [
  { key: '1',  label: '一级菜单', children: [{ key: '1-1', label: '二级菜单' }, { key: '1-2', label: '二级菜单' }] },
  { key: '2',  label: '一级菜单', children: [{ key: '2-1', label: '二级菜单' }, { key: '2-2', label: '二级菜单' }] },
  { key: '3',  label: '一级菜单', children: [{ key: '3-1', label: '二级菜单' }, { key: '3-2', label: '二级菜单' }] },
  { key: '4',  label: '一级菜单', children: [{ key: '4-1', label: '二级菜单' }, { key: '4-2', label: '二级菜单' }] },
  {
    key: '5', label: '一级菜单',
    children: [
      { key: '5-1', label: '二级菜单' },
      { key: '5-2', label: '二级菜单' },
      {
        key: '5-3', label: '二级菜单',
        children: [
          { key: '5-3-1', label: '基础菜单' },
          { key: '5-3-2', label: '基础菜单' },
          { key: '5-3-3', label: '基础菜单' },
        ],
      },
    ],
  },
  { key: '6',  label: '一级菜单' },
  { key: '7',  label: '一级菜单' },
  { key: '8',  label: '一级菜单' },
  { key: '9',  label: '一级菜单' },
  { key: '10', label: '一级菜单' },
  { key: '11', label: '一级菜单' },
  { key: '12', label: '一级菜单' },
]

// ── 工具函数 ────────────────────────────────────────────
function isExpanded(key: string) { return expanded.value.includes(key) }

function toggleExpand(key: string) {
  const idx = expanded.value.indexOf(key)
  idx >= 0 ? expanded.value.splice(idx, 1) : expanded.value.push(key)
}

function select(key: string) { activeKey.value = key }
function isActive(key: string) { return activeKey.value === key }

/** 收起侧边栏时，高亮当前激活项对应的一级 key */
function isGroupActive(key: string) { return activeKey.value.startsWith(key) }
</script>

<template>
  <div class="nav-root">

    <!-- ─── 顶部导航栏 ──────────────────────────────── -->
    <header class="top-nav">
      <!-- 左侧：Logo + 应用名 -->
      <div class="top-nav-left">
        <img :src="koneLogo" alt="KONE" class="kone-logo" />
        <span class="app-name">App Name</span>
      </div>

      <!-- 右侧：4 个操作图标（来自 Design System） -->
      <div class="top-nav-right">
        <button class="icon-btn" title="搜索"    v-html="icons.search"       aria-label="搜索" />
        <button class="icon-btn" title="语言"    v-html="icons.language"     aria-label="语言" />
        <button class="icon-btn" title="通知"    v-html="icons.notification" aria-label="通知" />
        <button class="icon-btn" title="个人"    v-html="icons.user"         aria-label="个人" />
      </div>
    </header>

    <!-- ─── 主体（侧边栏 + 内容区） ──────────────────── -->
    <div class="main-body">

      <!-- ── 侧边导航栏 ── -->
      <aside class="sidebar" :class="{ 'sidebar--collapsed': collapsed }">

        <!-- 菜单区域（可滚动） -->
        <div class="sidebar-scroll">

          <!-- 展开状态：显示文字 + 图标 + 子菜单 -->
          <nav v-if="!collapsed" class="menu-expanded" aria-label="主导航">
            <template v-for="item in menuItems" :key="item.key">

              <!-- 有子菜单的一级项 -->
              <template v-if="item.children">
                <button
                  class="menu-1st"
                  :class="{ 'menu-1st--active': isActive(item.key), 'menu-1st--expanded': isExpanded(item.key) }"
                  @click="toggleExpand(item.key)"
                  :aria-expanded="isExpanded(item.key)"
                >
                  <!-- TDesign 原生图标（server）作为菜单 prefix icon -->
                  <span class="menu-prefix-icon" v-html="icons.server" aria-hidden="true" />
                  <span class="menu-text">{{ item.label }}</span>
                  <!-- chevron: 使用 Design System SVG -->
                  <span class="chevron" v-html="isExpanded(item.key) ? icons.chevronUp : icons.chevronDown" />
                </button>

                <!-- 二级菜单 -->
                <div v-if="isExpanded(item.key)" class="submenu-2nd-wrap">
                  <template v-for="sub in item.children" :key="sub.key">

                    <!-- 二级项有三级子菜单 -->
                    <template v-if="sub.children">
                      <button
                        class="menu-2nd"
                        :class="{ 'menu-2nd--active': isActive(sub.key), 'menu-2nd--expanded': isExpanded(sub.key) }"
                        @click="toggleExpand(sub.key)"
                        :aria-expanded="isExpanded(sub.key)"
                      >
                        <span class="menu-text">{{ sub.label }}</span>
                        <span class="chevron" v-html="isExpanded(sub.key) ? icons.chevronUp : icons.chevronDown" />
                      </button>

                      <!-- 三级菜单 -->
                      <div v-if="isExpanded(sub.key)" class="submenu-3rd-wrap">
                        <button
                          v-for="base in sub.children"
                          :key="base.key"
                          class="menu-3rd"
                          :class="{ 'menu-3rd--active': isActive(base.key) }"
                          @click="select(base.key)"
                        >
                          {{ base.label }}
                        </button>
                      </div>
                    </template>

                    <!-- 普通二级项 -->
                    <button
                      v-else
                      class="menu-2nd"
                      :class="{ 'menu-2nd--active': isActive(sub.key) }"
                      @click="select(sub.key)"
                    >
                      <span class="menu-text">{{ sub.label }}</span>
                    </button>

                  </template>
                </div>
              </template>

              <!-- 无子菜单的一级项 -->
              <button
                v-else
                class="menu-1st"
                :class="{ 'menu-1st--active': isActive(item.key) }"
                @click="select(item.key)"
              >
                <span class="menu-prefix-icon" v-html="icons.server" aria-hidden="true" />
                <span class="menu-text">{{ item.label }}</span>
              </button>

            </template>
          </nav>

          <!-- 收起状态：只显示图标 -->
          <nav v-else class="menu-collapsed" aria-label="主导航（收起）">
            <button
              v-for="item in menuItems"
              :key="item.key"
              class="menu-icon-only"
              :class="{ 'menu-icon-only--active': isGroupActive(item.key) }"
              :title="item.label"
              @click="select(item.key)"
            >
              <!-- TDesign 原生图标 -->
              <span class="menu-prefix-icon" v-html="icons.server" aria-hidden="true" />
            </button>
          </nav>
        </div>

        <!-- 底部折叠/展开按钮 -->
        <div class="sidebar-footer">
          <button
            class="collapse-btn"
            :title="collapsed ? '展开侧栏' : '收起侧栏'"
            @click="collapsed = !collapsed"
            :aria-label="collapsed ? '展开侧栏' : '收起侧栏'"
          >
            <!-- view-list icon from Design System -->
            <span v-html="icons.viewList" />
          </button>
        </div>
      </aside>

      <!-- ── 内容区 ── -->
      <div class="content-area" :class="{ 'content-area--collapsed': collapsed }">
        <!-- 内容卡片（实际页面在这里渲染） -->
        <div class="content-card" />

        <!-- 页脚 -->
        <footer class="page-footer">
          Copyright @ 2019–2022 KONE. All Rights Reserved
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── 根容器 ─────────────────────────────────────────── */
.nav-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-color-page);
  font-family: inherit;
}

/* ── 顶部导航栏 ─────────────────────────────────────── */
.top-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  height: 56px;
  background: var(--bg-color-container);
  border-bottom: 1px solid var(--component-stroke);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
}

.top-nav-left {
  display: flex;
  align-items: center;
  gap: 24px;
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

.top-nav-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 顶栏图标按钮 */
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

/* ── 主体布局 ────────────────────────────────────────── */
.main-body {
  display: flex;
  margin-top: 56px;
  min-height: calc(100vh - 56px);
}

/* ── 侧边导航栏 ─────────────────────────────────────── */
.sidebar {
  position: fixed;
  top: 56px; left: 0; bottom: 0;
  width: 232px;
  background: var(--bg-color-container);
  display: flex;
  flex-direction: column;
  z-index: 100;
  transition: width 0.2s ease;
  overflow: hidden;
}
.sidebar--collapsed { width: 64px; }

/* 可滚动菜单区 */
.sidebar-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: var(--component-stroke) transparent;
}

/* ── 展开状态菜单 ─────────────────────────────────────── */
.menu-expanded {
  padding: 16px 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* 一级菜单项 */
.menu-1st {
  width: 100%;
  min-height: 36px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  border: none;
  border-radius: var(--radius-medium);
  background: transparent;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: var(--text-color-secondary);
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  transition: background 0.15s, color 0.15s;
  flex-shrink: 0;
}
.menu-1st:hover   { background: var(--bg-color-container-hover); color: var(--text-color-primary); }
.menu-1st--expanded { color: var(--text-color-primary); }
.menu-1st--active { background: var(--brand-color-light); color: var(--brand-color); }

/* prefix icon (Design System inline SVG) */
.menu-prefix-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: currentColor;
}

.menu-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.chevron {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  color: var(--text-color-placeholder);
}

/* 二级菜单容器 */
.submenu-2nd-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 2px;
}

/* 二级菜单项 */
.menu-2nd {
  width: 100%;
  min-height: 36px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px 7px 44px;
  border: none;
  border-radius: var(--radius-medium);
  background: transparent;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: var(--text-color-secondary);
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  transition: background 0.15s, color 0.15s;
}
.menu-2nd:hover   { background: var(--bg-color-container-hover); color: var(--text-color-primary); }
.menu-2nd--expanded { color: var(--text-color-primary); }
.menu-2nd--active { background: var(--brand-color-light); color: var(--brand-color); }

/* 三级菜单容器 */
.submenu-3rd-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 2px;
}

/* 三级菜单项 */
.menu-3rd {
  width: 100%;
  min-height: 36px;
  display: flex;
  align-items: center;
  padding: 7px 16px 7px 72px;
  border: none;
  border-radius: var(--radius-medium);
  background: transparent;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: var(--text-color-secondary);
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s;
}
.menu-3rd:hover   { background: var(--bg-color-container-hover); color: var(--text-color-primary); }
.menu-3rd--active { background: var(--brand-color-light); color: var(--brand-color); }

/* ── 收起状态菜单 ─────────────────────────────────────── */
.menu-collapsed {
  padding: 16px 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.menu-icon-only {
  width: 48px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius-medium);
  background: transparent;
  cursor: pointer;
  color: var(--text-color-secondary);
  font-size: 20px;
  transition: background 0.15s, color 0.15s;
}
.menu-icon-only:hover      { background: var(--bg-color-container-hover); color: var(--text-color-primary); }
.menu-icon-only--active    { background: var(--brand-color-light); color: var(--brand-color); }

/* ── 侧边栏底部 ─────────────────────────────────────── */
.sidebar-footer {
  height: 56px;
  flex-shrink: 0;
  border-top: 1px solid var(--component-stroke);
  background: var(--bg-color-container);
  display: flex;
  align-items: center;
  padding: 0 16px;
}
.sidebar--collapsed .sidebar-footer {
  justify-content: center;
  padding: 0;
}

.collapse-btn {
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
  color: var(--text-color-secondary);
  transition: background 0.15s, color 0.15s;
}
.collapse-btn:hover { background: var(--bg-color-component); color: var(--text-color-primary); }

/* ── 内容区 ─────────────────────────────────────────── */
.content-area {
  margin-left: 232px;
  flex: 1;
  padding: 24px 24px 0 24px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 56px);
  box-sizing: border-box;
  transition: margin-left 0.2s ease;
  overflow-y: auto;
}
.content-area--collapsed {
  margin-left: 64px;
}

.content-card {
  flex: 1;
  background: var(--bg-color-container);
  border-radius: var(--radius-medium);
  min-height: 400px;
}

.page-footer {
  padding: 16px;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: var(--text-color-placeholder);
  flex-shrink: 0;
  margin-top: auto;
}
</style>
