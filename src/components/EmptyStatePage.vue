<script setup lang="ts">
import { ref } from 'vue'
import type { PrimaryTableCol } from 'tdesign-vue-next'
import { icons } from '../assets/icons/iconPaths'
import koneLogo from '../assets/kone-logo.svg'
import emptyStateLight from '../assets/empty-state-light.svg'

// ── 表格：空数据 + 与 ListPage 相同的列定义
const emptyData = ref([])
const columns: PrimaryTableCol[] = [
  { colKey: 'row-select',  type: 'multiple', width: 46 },
  { colKey: 'name',        title: '合同名称',    ellipsis: true },
  { colKey: 'status',      title: '合同状态',    width: 120 },
  { colKey: 'paymentType', title: '合同收付类型', width: 140 },
  { colKey: 'field1',      title: '项目名称',    ellipsis: true },
  { colKey: 'count',       title: '合同金额',    width: 140, align: 'right' },
  { colKey: 'field2',      title: '项目名称',    ellipsis: true },
  { colKey: 'field3',      title: '项目名称',    ellipsis: true },
  { colKey: 'operation',   title: '操作',        width: 140 },
]

// ── 导航状态（同 NavigationPage）
const collapsed = ref(false)
const activeKey  = ref('5-3-1')
const expanded   = ref<string[]>(['5', '5-3'])

interface BaseItem { key: string; label: string }
interface SubItem  { key: string; label: string; children?: BaseItem[] }
interface MenuItem { key: string; label: string; children?: SubItem[] }

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
      { key: '5-3', label: '二级菜单', children: [
        { key: '5-3-1', label: '基础菜单' },
        { key: '5-3-2', label: '基础菜单' },
        { key: '5-3-3', label: '基础菜单' },
      ]},
    ],
  },
  { key: '6', label: '一级菜单' }, { key: '7', label: '一级菜单' },
  { key: '8', label: '一级菜单' }, { key: '9', label: '一级菜单' },
  { key: '10', label: '一级菜单' }, { key: '11', label: '一级菜单' },
  { key: '12', label: '一级菜单' },
]

function isExpanded(key: string) { return expanded.value.includes(key) }
function toggleExpand(key: string) {
  const idx = expanded.value.indexOf(key)
  idx >= 0 ? expanded.value.splice(idx, 1) : expanded.value.push(key)
}
function select(key: string) { activeKey.value = key }
function isActive(key: string) { return activeKey.value === key }
function isGroupActive(key: string) { return activeKey.value.startsWith(key) }
</script>

<template>
  <div class="nav-root">

    <!-- ─── 顶部导航栏 ──────────────────────────────── -->
    <header class="top-nav">
      <div class="top-nav-left">
        <img :src="koneLogo" alt="KONE" class="kone-logo" />
        <span class="app-name">App Name</span>
      </div>
      <div class="top-nav-right">
        <button class="icon-btn" v-html="icons.search"       aria-label="搜索" />
        <button class="icon-btn" v-html="icons.language"     aria-label="语言" />
        <button class="icon-btn" v-html="icons.notification" aria-label="通知" />
        <button class="icon-btn" v-html="icons.user"         aria-label="个人" />
      </div>
    </header>

    <!-- ─── 主体 ──────────────────────────────────────── -->
    <div class="main-body">

      <!-- 侧边栏 -->
      <aside class="sidebar" :class="{ 'sidebar--collapsed': collapsed }">
        <div class="sidebar-scroll">
          <nav v-if="!collapsed" class="menu-expanded">
            <template v-for="item in menuItems" :key="item.key">
              <template v-if="item.children">
                <button
                  class="menu-1st"
                  :class="{ 'menu-1st--active': isActive(item.key), 'menu-1st--expanded': isExpanded(item.key) }"
                  @click="toggleExpand(item.key)"
                >
                  <span class="menu-prefix-icon" v-html="icons.server" aria-hidden="true" />
                  <span class="menu-text">{{ item.label }}</span>
                  <span class="chevron" v-html="isExpanded(item.key) ? icons.chevronUp : icons.chevronDown" />
                </button>
                <div v-if="isExpanded(item.key)" class="submenu-2nd-wrap">
                  <template v-for="sub in item.children" :key="sub.key">
                    <template v-if="sub.children">
                      <button
                        class="menu-2nd"
                        :class="{ 'menu-2nd--active': isActive(sub.key), 'menu-2nd--expanded': isExpanded(sub.key) }"
                        @click="toggleExpand(sub.key)"
                      >
                        <span class="menu-text">{{ sub.label }}</span>
                        <span class="chevron" v-html="isExpanded(sub.key) ? icons.chevronUp : icons.chevronDown" />
                      </button>
                      <div v-if="isExpanded(sub.key)" class="submenu-3rd-wrap">
                        <button
                          v-for="base in sub.children" :key="base.key"
                          class="menu-3rd"
                          :class="{ 'menu-3rd--active': isActive(base.key) }"
                          @click="select(base.key)"
                        >{{ base.label }}</button>
                      </div>
                    </template>
                    <button
                      v-else class="menu-2nd"
                      :class="{ 'menu-2nd--active': isActive(sub.key) }"
                      @click="select(sub.key)"
                    >
                      <span class="menu-text">{{ sub.label }}</span>
                    </button>
                  </template>
                </div>
              </template>
              <button
                v-else class="menu-1st"
                :class="{ 'menu-1st--active': isActive(item.key) }"
                @click="select(item.key)"
              >
                <span class="menu-prefix-icon" v-html="icons.server" aria-hidden="true" />
                <span class="menu-text">{{ item.label }}</span>
              </button>
            </template>
          </nav>
          <nav v-else class="menu-collapsed">
            <button
              v-for="item in menuItems" :key="item.key"
              class="menu-icon-only"
              :class="{ 'menu-icon-only--active': isGroupActive(item.key) }"
              :title="item.label"
              @click="select(item.key)"
            >
              <span class="menu-prefix-icon" v-html="icons.server" aria-hidden="true" />
            </button>
          </nav>
        </div>
        <div class="sidebar-footer">
          <button class="collapse-btn" @click="collapsed = !collapsed">
            <span v-html="icons.viewList" />
          </button>
        </div>
      </aside>

      <!-- ─── 内容区 ─────────────────────────────────── -->
      <div class="content-area" :class="{ 'content-area--collapsed': collapsed }">
        <div class="content-card">

          <!-- 页面标题 -->
          <div class="page-title-bar">
            <h1 class="page-title">标题</h1>
          </div>

          <!-- 表格（空数据）：表头与 ListPage 一致，空状态使用插画 -->
          <div class="table-wrap">
            <t-table
              :data="emptyData"
              :columns="columns"
              row-key="id"
              size="medium"
              class="kone-table"
            >
              <!-- 自定义空状态 -->
              <template #empty>
                <div class="empty-body">
                  <img :src="emptyStateLight" alt="空状态" class="empty-illustration" />
                  <div class="empty-text-group">
                    <p class="empty-title">暂无数据</p>
                    <p class="empty-desc">暂无数据描述信息</p>
                  </div>
                </div>
              </template>
            </t-table>
          </div>

        </div>

        <!-- 页脚 -->
        <footer class="page-footer">
          Copyright @ 2019–2022 KONE. All Rights Reserved
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ══ 根容器 ════════════════════════════════════════════ */
.nav-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg-color-page);
}

/* ══ 顶部导航栏 ════════════════════════════════════════ */
.top-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  height: 56px; background: var(--bg-color-container);
  border-bottom: 1px solid var(--component-stroke);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px; box-sizing: border-box;
}
.top-nav-left { display: flex; align-items: center; gap: 24px; }
.kone-logo { display: block; height: 28px; width: auto; object-fit: contain; }
.app-name { font-size: 18px; font-weight: 600; line-height: 26px; color: var(--text-color-primary); white-space: nowrap; }
.top-nav-right { display: flex; align-items: center; gap: 8px; }
.icon-btn {
  width: 32px; height: 32px; padding: 0; border: none; border-radius: var(--radius-default);
  background: transparent; display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--text-color-brand); transition: background 0.15s, color 0.15s;
}
.icon-btn:hover { background: var(--brand-color-light); color: var(--brand-color); }

/* ══ 主体 ══════════════════════════════════════════════ */
.main-body { display: flex; margin-top: 56px; min-height: calc(100vh - 56px); overflow: hidden; }

/* ══ 侧边栏 ════════════════════════════════════════════ */
.sidebar {
  position: fixed; top: 56px; left: 0; bottom: 0;
  width: 232px; background: var(--bg-color-container);
  display: flex; flex-direction: column;
  z-index: 100; transition: width 0.2s ease; overflow: hidden;
}
.sidebar--collapsed { width: 64px; }
.sidebar-scroll { flex: 1; overflow-y: auto; overflow-x: hidden; scrollbar-width: thin; scrollbar-color: var(--component-stroke) transparent; }
.menu-expanded { padding: 16px 8px 8px; display: flex; flex-direction: column; gap: 2px; }
.menu-1st {
  width: 100%; min-height: 36px; display: flex; align-items: center; gap: 8px;
  padding: 7px 16px; border: none; border-radius: var(--radius-medium);
  background: transparent; font-size: 14px; font-weight: 400; line-height: 22px;
  color: var(--text-color-secondary); font-family: inherit; cursor: pointer;
  text-align: left; box-sizing: border-box; transition: background 0.15s, color 0.15s; flex-shrink: 0;
}
.menu-1st:hover { background: var(--bg-color-container-hover); color: var(--text-color-primary); }
.menu-1st--expanded { color: var(--text-color-primary); }
.menu-1st--active { background: var(--brand-color-light); color: var(--brand-color); }
.menu-prefix-icon { width: 20px; height: 20px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: currentColor; }
.menu-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.chevron { flex-shrink: 0; display: flex; align-items: center; color: var(--text-color-placeholder); }
.submenu-2nd-wrap { display: flex; flex-direction: column; gap: 2px; margin-top: 2px; }
.menu-2nd {
  width: 100%; min-height: 36px; display: flex; align-items: center; gap: 8px;
  padding: 7px 16px 7px 44px; border: none; border-radius: var(--radius-medium);
  background: transparent; font-size: 14px; font-weight: 400; line-height: 22px;
  color: var(--text-color-secondary); font-family: inherit; cursor: pointer;
  text-align: left; box-sizing: border-box; transition: background 0.15s, color 0.15s;
}
.menu-2nd:hover { background: var(--bg-color-container-hover); color: var(--text-color-primary); }
.menu-2nd--expanded { color: var(--text-color-primary); }
.menu-2nd--active { background: var(--brand-color-light); color: var(--brand-color); }
.submenu-3rd-wrap { display: flex; flex-direction: column; gap: 2px; margin-top: 2px; }
.menu-3rd {
  width: 100%; min-height: 36px; display: flex; align-items: center;
  padding: 7px 16px 7px 72px; border: none; border-radius: var(--radius-medium);
  background: transparent; font-size: 14px; font-weight: 400; line-height: 22px;
  color: var(--text-color-secondary); font-family: inherit; cursor: pointer;
  text-align: left; box-sizing: border-box; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  transition: background 0.15s, color 0.15s;
}
.menu-3rd:hover { background: var(--bg-color-container-hover); color: var(--text-color-primary); }
.menu-3rd--active { background: var(--brand-color-light); color: var(--brand-color); }
.menu-collapsed { padding: 16px 8px 8px; display: flex; flex-direction: column; gap: 2px; }
.menu-icon-only {
  width: 48px; height: 36px; display: flex; align-items: center; justify-content: center;
  border: none; border-radius: var(--radius-medium); background: transparent;
  cursor: pointer; color: var(--text-color-secondary); transition: background 0.15s, color 0.15s;
}
.menu-icon-only:hover { background: var(--bg-color-container-hover); color: var(--text-color-primary); }
.menu-icon-only--active { background: var(--brand-color-light); color: var(--brand-color); }
.sidebar-footer {
  height: 56px; flex-shrink: 0; border-top: 1px solid var(--component-stroke);
  background: var(--bg-color-container); display: flex; align-items: center; padding: 0 16px;
}
.sidebar--collapsed .sidebar-footer { justify-content: center; padding: 0; }
.collapse-btn {
  width: 32px; height: 32px; padding: 0; border: none; border-radius: var(--radius-default);
  background: transparent; display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--text-color-secondary); transition: background 0.15s, color 0.15s;
}
.collapse-btn:hover { background: var(--bg-color-component); color: var(--text-color-primary); }

/* ══ 内容区 ════════════════════════════════════════════ */
.content-area {
  margin-left: 232px; flex: 1; min-width: 0;
  padding: 24px 24px 0 24px;
  display: flex; flex-direction: column;
  min-height: calc(100vh - 56px); box-sizing: border-box;
  transition: margin-left 0.2s ease;
}
.content-area--collapsed { margin-left: 64px; }

.content-card {
  background: var(--bg-color-container);
  border-radius: var(--radius-medium);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: visible;
}

/* 页面标题区 */
.page-title-bar {
  padding: 22px 32px;
  flex-shrink: 0;
}
.page-title {
  font-size: 20px; font-weight: 600; line-height: 28px;
  color: var(--text-color-primary); margin: 0;
}
/* ══ 表格（与 ListPage 一致）══════════════════════════ */
.table-wrap {
  flex: 1;
  padding: 0 32px;
}

.kone-table { width: 100%; }

:deep(.t-table__header) { background: var(--bg-color-secondarycontainer); }
:deep(.t-table__header th) {
  background: var(--bg-color-secondarycontainer) !important;
  font-size: 14px; font-weight: 400;
  color: var(--text-color-placeholder);
  border-bottom: 1px solid var(--component-stroke);
}
:deep(.t-table) { border: none; }

/* ══ 空状态主体 ═══════════════════════════════════════ */
.empty-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  /* 设计稿空状态块 top: 342px，distance from card top ≈ 178px */
  padding: 80px 0;
}

.empty-illustration {
  width: 200px;
  height: 200px;
  object-fit: contain;
  /* 设计稿插画和文字有 -8px 的上移，用 margin-bottom 实现 */
  margin-bottom: -8px;
}

.empty-text-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.empty-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: var(--text-color-primary);
  margin: 0;
  white-space: nowrap;
}

.empty-desc {
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: var(--text-color-secondary);
  margin: 0;
  white-space: nowrap;
}

/* ══ 页脚 ══════════════════════════════════════════════ */
.page-footer {
  padding: 16px;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  color: var(--text-color-placeholder);
  flex-shrink: 0;
}
</style>
