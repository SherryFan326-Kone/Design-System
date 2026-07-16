<script setup lang="ts">
import { ref, computed } from 'vue'
import { icons } from '../assets/icons/iconPaths'
import koneLogo from '../assets/kone-logo.svg'
import type { PrimaryTableCol } from 'tdesign-vue-next'

// ── 导航状态（复用 NavigationPage 结构）────────────────
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

// ── 表格数据 ────────────────────────────────────────────
// ── 合同状态枚举（t-tag 样式）
type ContractStatus = 'fail' | 'audit' | 'pending' | 'executing' | 'finish'

const STATUS_MAP: Record<ContractStatus, { label: string; theme: 'danger' | 'warning' | 'success' }> = {
  fail:      { label: '已失效', theme: 'danger' },
  audit:     { label: '审核中', theme: 'warning' },
  pending:   { label: '待执行', theme: 'warning' },
  executing: { label: '执行中', theme: 'success' },
  finish:    { label: '已完成', theme: 'success' },
}
const STATUS_KEYS = Object.keys(STATUS_MAP) as ContractStatus[]

// ── 收付类型枚举（圆点指示器样式，对应设计稿 ItemContentState）
type PaymentType = 'receipt' | 'payment'

const PAYMENT_MAP: Record<PaymentType, { label: string; color: string }> = {
  receipt: { label: '收款', color: 'var(--error-color)' },    // 收款 → 红色
  payment: { label: '付款', color: 'var(--success-color)' },  // 付款 → 绿色
}
const PAYMENT_KEYS: PaymentType[] = ['receipt', 'payment']

interface RowData {
  id: number
  name: string
  status: ContractStatus
  count: number
  paymentType: PaymentType
  field1: string
  field2: string
  field3: string
  field4: string
  field5: string
}


const selectedRowKeys = ref<number[]>([])
const pagination = ref({ current: 1, pageSize: 10, total: 101 })

// 生成足够多的模拟数据（101条，覆盖所有翻页场景）
const CONTRACT_NAMES = [
  '2024年度电梯设备维保服务合同（北京区域）',
  '商业综合体电梯安装及调试项目合同',
  '智慧楼宇电梯物联网改造合同',
  '年度电梯安全检测与评估服务协议',
  '大型住宅小区扶梯采购及安装合同',
  '医院专用病床电梯采购合同',
  '轨道交通站台升降设备维保合同',
  '工厂货梯定期保养与紧急维修合同',
]

const allData: RowData[] = Array.from({ length: 101 }, (_, i) => ({
  id: i + 1,
  name: CONTRACT_NAMES[i % CONTRACT_NAMES.length],
  status: STATUS_KEYS[i % STATUS_KEYS.length],
  count: Math.floor(Math.random() * 9000 + 1000),
  paymentType: PAYMENT_KEYS[i % PAYMENT_KEYS.length],
  field1: '项目名称',
  field2: '项目名称',
  field3: '项目名称',
  field4: '项目名称',
  field5: '项目名称',
}))

// 根据分页计算当前页数据
const tableData = computed(() => {
  const { current, pageSize } = pagination.value
  const start = (current - 1) * pageSize
  return allData.slice(start, start + pageSize)
}) 

// ── 列定义
const columns: PrimaryTableCol<RowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 46, fixed: 'left' },
  { colKey: 'name',      title: '合同名称', width: 260, ellipsis: true, fixed: 'left' },
  { colKey: 'status',    title: '合同状态', width: 120 },
  { colKey: 'count',       title: '合同金额',   width: 140, align: 'right' },
  { colKey: 'paymentType', title: '合同收付类型', width: 140 },
  { colKey: 'field1',    title: '项目名称', width: 180, ellipsis: true },
  { colKey: 'field2',    title: '项目名称', width: 180, ellipsis: true },
  { colKey: 'field3',    title: '项目名称', width: 180, ellipsis: true },
  { colKey: 'field4',    title: '项目名称', width: 180, ellipsis: true },
  { colKey: 'field5',    title: '项目名称', width: 180, ellipsis: true },
  { colKey: 'operation', title: '操作',     width: 140, fixed: 'right' },
]

function handleManage(row: RowData) {
  console.log('管理', row.id)
}
function handleDelete(row: RowData) {
  console.log('删除', row.id)
}

// template slot 类型助手
function asRow(row: unknown): RowData { return row as RowData }

function onPageChange(pageInfo: { current: number; pageSize: number }) {
  pagination.value.current = pageInfo.current
  pagination.value.pageSize = pageInfo.pageSize
}

// 表头吸顶：向上滚动页面时，表头固定在顶部导航栏下方
// container 指向 window，offsetTop = 顶栏 56px
const headerAffixedTop = computed(() => ({
  offsetTop: 56,
  container: () => window,
}))
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

          <!-- 展开态 -->
          <nav v-if="!collapsed" class="menu-expanded" aria-label="主导航">
            <template v-for="item in menuItems" :key="item.key">
              <template v-if="item.children">
                <button
                  class="menu-1st"
                  :class="{ 'menu-1st--active': isActive(item.key), 'menu-1st--expanded': isExpanded(item.key) }"
                  @click="toggleExpand(item.key)"
                  :aria-expanded="isExpanded(item.key)"
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
                        :aria-expanded="isExpanded(sub.key)"
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

          <!-- 收起态 -->
          <nav v-else class="menu-collapsed" aria-label="主导航（收起）">
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

        <!-- 底部折叠按钮 -->
        <div class="sidebar-footer">
          <button class="collapse-btn" @click="collapsed = !collapsed" :aria-label="collapsed ? '展开侧栏' : '收起侧栏'">
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

          <!-- 表格 -->
          <div class="table-wrap">
            <t-table
              :data="tableData"
              :columns="columns"
              v-model:selectedRowKeys="selectedRowKeys"
              row-key="id"
              size="medium"
              hover
              :header-affixed-top="headerAffixedTop"
              :scroll="{ x: 1900 }"
              class="kone-table"
            >
            <!-- 合同名称：超出省略 + hover tooltip 显示完整 -->
            <template #name="{ row }">
              <t-tooltip :content="asRow(row).name" placement="top-left">
                <div class="name-cell">{{ asRow(row).name }}</div>
              </t-tooltip>
            </template>

            <!-- 合同状态：t-tag 多色标签 -->
            <template #status="{ row }">
              <t-tag
                :theme="STATUS_MAP[asRow(row).status].theme"
                variant="light"
              >
                {{ STATUS_MAP[asRow(row).status].label }}
              </t-tag>
            </template>

            <!-- 合同收付类型：圆点指示器（对应设计稿 ItemContentState） -->
            <template #paymentType="{ row }">
              <div class="status-cell">
                <span
                  class="status-dot"
                  :style="{ background: PAYMENT_MAP[asRow(row).paymentType].color }"
                />
                <span
                  class="status-text"
                  :style="{ color: PAYMENT_MAP[asRow(row).paymentType].color }"
                >
                  {{ PAYMENT_MAP[asRow(row).paymentType].label }}
                </span>
              </div>
            </template>

            <!-- 操作列 -->            <template #operation="{ row }">
              <div class="op-cell">
                <a class="op-link" @click="handleManage(row)">管理</a>
                <a class="op-link op-link--danger" @click="handleDelete(row)">删除</a>
              </div>
            </template>
          </t-table>
          </div>

        </div><!-- /content-card -->

        <!-- 分页 -->
        <div class="pagination-bar">
          <t-pagination
            v-model="pagination.current"
            v-model:pageSize="pagination.pageSize"
            :total="pagination.total"
            show-jumper
            show-page-size
            :page-size-options="[10, 20, 50]"
            @change="onPageChange"
          />
        </div>

        <!-- 页脚 -->
        <footer class="page-footer">
          Copyright @ 2019–2022 KONE. All Rights Reserved
        </footer>
      </div><!-- /content-area -->
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
.top-nav-left { display: flex; align-items: center; gap: 24px; }
.kone-logo { display: block; height: 28px; width: auto; object-fit: contain; }
.app-name { font-size: 18px; font-weight: 600; line-height: 26px; color: var(--text-color-primary); white-space: nowrap; }
.top-nav-right { display: flex; align-items: center; gap: 8px; }
.icon-btn {
  width: 32px; height: 32px; padding: 0;
  border: none; border-radius: var(--radius-default);
  background: transparent;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--text-color-brand);
  transition: background 0.15s, color 0.15s;
}
.icon-btn:hover { background: var(--brand-color-light); color: var(--brand-color); }

/* ══ 主体布局 ══════════════════════════════════════════ */
.main-body {
  display: flex;
  margin-top: 56px;
  min-height: calc(100vh - 56px);
  overflow: hidden;
}

/* ══ 侧边栏 ════════════════════════════════════════════ */
.sidebar {
  position: fixed; top: 56px; left: 0; bottom: 0;
  width: 232px; background: var(--bg-color-container);
  display: flex; flex-direction: column;
  z-index: 100; transition: width 0.2s ease; overflow: hidden;
}
.sidebar--collapsed { width: 64px; }
.sidebar-scroll { flex: 1; overflow-y: auto; overflow-x: hidden; scrollbar-width: thin; scrollbar-color: var(--component-stroke) transparent; }

/* 菜单 */
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
  text-align: left; box-sizing: border-box; overflow: hidden; text-overflow: ellipsis;
  white-space: nowrap; transition: background 0.15s, color 0.15s;
}
.menu-3rd:hover { background: var(--bg-color-container-hover); color: var(--text-color-primary); }
.menu-3rd--active { background: var(--brand-color-light); color: var(--brand-color); }
.menu-collapsed { padding: 16px 8px 8px; display: flex; flex-direction: column; gap: 2px; }
.menu-icon-only {
  width: 48px; height: 36px; display: flex; align-items: center; justify-content: center;
  border: none; border-radius: var(--radius-medium); background: transparent;
  cursor: pointer; color: var(--text-color-secondary); font-size: 20px; transition: background 0.15s, color 0.15s;
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
  margin-left: 232px;
  flex: 1;
  min-width: 0;
  padding: 24px 24px 0 24px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 56px);
  box-sizing: border-box;
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
  border-radius: var(--radius-medium) var(--radius-medium) 0 0;
  background: var(--bg-color-container);
}
.page-title {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: var(--text-color-primary);
  margin: 0;
}

/* ══ 表格容器 ══════════════════════════════════════════ */
.table-wrap {
  flex: 1;
}

/* ══ 表格 ══════════════════════════════════════════════ */
.kone-table {
  width: calc(100% - 64px);
  margin: 0 32px;
}

/* 表头背景 */
:deep(.t-table__header) {
  background: var(--bg-color-secondarycontainer);
}
:deep(.t-table__header th) {
  background: var(--bg-color-secondarycontainer) !important;
  font-size: 14px;
  font-weight: 400;
  color: var(--text-color-placeholder);
  border-bottom: 1px solid var(--component-stroke);
}

/* 表格行 */
:deep(.t-table__body td) {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-color-primary);
  border-bottom: 1px solid var(--component-stroke);
  padding: 12px 16px;
}

/* 去除表格外边框 */
:deep(.t-table) {
  border: none;
}

/* ── 合同名称：单行省略 */
.name-cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  cursor: default;
}

/* ── 合同状态 tag 颜色（覆盖 TDesign light variant）*/
:deep(.t-tag--danger.t-tag--light) {
  background: var(--error-color-light);
  border-color: var(--error-color);
  color: var(--error-color);
}
:deep(.t-tag--warning.t-tag--light) {
  background: var(--warning-color-light);
  border-color: var(--warning-color);
  color: var(--warning-color);
}
:deep(.t-tag--success.t-tag--light) {
  background: var(--success-color-light);
  border-color: var(--success-color);
  color: var(--success-color);
}

/* ── 合同收付类型：圆点指示器（对应设计稿 ItemContentState）*/
.status-cell {
  display: flex;
  align-items: center;
  gap: 4px;
}
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
.status-text {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  white-space: nowrap;
}
.op-cell {
  display: flex;
  align-items: center;
  gap: 24px;
}
.op-link {
  font-size: 14px;
  line-height: 22px;
  color: var(--brand-color);
  cursor: pointer;
  text-decoration: none;
  transition: color 0.15s;
}
.op-link:hover { color: var(--brand-color-hover); }
.op-link--danger { color: var(--brand-color); }
.op-link--danger:hover { color: var(--error-color); }

/* ══ 分页区 ════════════════════════════════════════════ */
.pagination-bar {
  padding: 0 32px;
  height: 64px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  background: var(--bg-color-container);
  border-radius: 0 0 var(--radius-medium) var(--radius-medium);
}

:deep(.t-pagination) {
  justify-content: flex-end;
  width: 100%;
}

/* 当前页按钮 */
:deep(.t-pagination__btn.t-is-current) {
  background: var(--brand-color) !important;
  color: #fff !important;
  border-color: var(--brand-color) !important;
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
