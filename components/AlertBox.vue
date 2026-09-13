<template>
  <div class="alert-box">
    <div class="alert-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      </svg>
    </div>
    <div class="alert-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* ===== 浅色主题（默认）：深色文字 ===== */
.alert-box {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 20px;
  margin: 20px 0;
  border: 2px solid #e74c3c;
  border-radius: 8px;
  background-color: rgba(231, 76, 60, 0.06);
}

.alert-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin-top: 2px;
}

.alert-icon svg {
  width: 100%;
  height: 100%;
  stroke: #e74c3c;
}

.alert-content {
  flex: 1;
  min-width: 0;
  font-size: 1rem;
  line-height: 1.7;
  color: #1a1a1a;
}

.alert-content :deep(*) {
  color: #1a1a1a;
}

/* ===== 暗色主题：html.dark 下用白色文字 ===== */
html.dark .alert-box {
  background-color: rgba(231, 76, 60, 0.15);
}

html.dark .alert-content,
html.dark .alert-content :deep(*) {
  color: #f0f0f0;
}
</style>