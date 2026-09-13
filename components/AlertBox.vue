<template>
  <div class="alert-box">
    <!-- 左侧红色警告标识 -->
    <div class="alert-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      </svg>
    </div>

    <!-- 右侧文字内容（自适应） -->
    <div class="alert-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* ===== 警告框容器 ===== */
.alert-box {
  display: flex !important;
  align-items: flex-start !important;
  gap: 14px !important;
  padding: 16px 20px !important;
  margin: 20px 0 !important;
  border: 2px solid #e74c3c !important;
  border-radius: 8px !important;
  background-color: rgba(231, 76, 60, 0.06) !important;
  transition: background-color 0.2s ease;
}

.alert-box:hover {
  background-color: rgba(231, 76, 60, 0.12) !important;
}

/* ===== 左侧警告图标 ===== */
.alert-icon {
  flex-shrink: 0 !important;
  width: 24px !important;
  height: 24px !important;
  margin-top: 2px !important;
  color: #e74c3c !important;
}

.alert-icon svg {
  width: 100% !important;
  height: 100% !important;
  stroke: #e74c3c !important;
}

/* ===== 右侧文字内容：最高优先级，强制深色 ===== */
.alert-content,
.alert-content * {
  flex: 1;
  min-width: 0;
  color: #000000 !important;   /* 强制纯黑，最高对比度 */
  font-size: 1rem;
  line-height: 1.7;
}

/* ===== 暗色主题适配：系统偏好 ===== */
@media (prefers-color-scheme: dark) {
  .alert-box {
    background-color: rgba(231, 76, 60, 0.15) !important;
  }
  .alert-box:hover {
    background-color: rgba(231, 76, 60, 0.25) !important;
  }
  .alert-content,
  .alert-content * {
    color: #ffffff !important;   /* 暗色下强制纯白 */
  }
}

/* ===== 暗色主题适配：网站手动切换（Valaxy 常用 .dark 类） ===== */
:global(.dark) .alert-box {
  background-color: rgba(231, 76, 60, 0.15) !important;
}
:global(.dark) .alert-box:hover {
  background-color: rgba(231, 76, 60, 0.25) !important;
}
:global(.dark) .alert-content,
:global(.dark) .alert-content * {
  color: #ffffff !important;
}
</style>