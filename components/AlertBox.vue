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
.alert-box {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 20px;
  margin: 20px 0;
  border: 2px solid #e74c3c;
  border-radius: 8px;
  background-color: rgba(231, 76, 60, 0.06);
  transition: background-color 0.2s ease;
}

.alert-box:hover {
  background-color: rgba(231, 76, 60, 0.12);
}

/* ===== 左侧警告图标 ===== */
.alert-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin-top: 2px;
  color: #e74c3c;
}

.alert-icon svg {
  width: 100%;
  height: 100%;
  stroke: #e74c3c;
}

/* ===== 右侧文字内容 ===== */
.alert-content {
  flex: 1;
  min-width: 0;
  color: #333333;
  font-size: 1rem;
  line-height: 1.7;
}

/* ===== 暗色主题适配 ===== */
@media (prefers-color-scheme: dark) {
  .alert-box {
    background-color: rgba(231, 76, 60, 0.12);
    border-color: #e74c3c;
  }
  .alert-box:hover {
    background-color: rgba(231, 76, 60, 0.2);
  }
  .alert-content {
    color: #e0e0e0;
  }
  .alert-icon {
    color: #e74c3c;
  }
  .alert-icon svg {
    stroke: #e74c3c;
  }
}
</style>