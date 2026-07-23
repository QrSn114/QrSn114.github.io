<template>
  <div v-if="showSplash" id="splash" class="splash-screen" :class="{ 'fade-out': isFadingOut }">
    <!-- 倾斜矩形背景层 -->
    <div class="bg-slanted">
      <div class="slanted-rect rect-1"></div>
      <div class="slanted-rect rect-2"></div>
      <div class="slanted-rect rect-3"></div>
      <div class="slanted-rect rect-4"></div>
      <div class="slanted-rect rect-5"></div>
      <div class="slanted-rect rect-6"></div>
    </div>

    <div class="glow"></div>

    <!-- 内容 -->
    <div class="content-wrapper">
      <h1 class="main-title">
        <span 
          v-for="(char, index) in titleChars" 
          :key="index"
          class="char"
          :style="{ animationDelay: (0.1 + index * 0.18) + 's' }"
        >{{ char }}</span>
      </h1>
      <div class="sub-title">✦ 边界探索 · 无限可能 ✦</div>
    </div>

    <div class="footer-text">// 社团 · 科技 · 创意 //</div>
  </div>

  <slot />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showSplash = ref(true)
const isFadingOut = ref(false)
const titleChars = 'TGX'.split('')

onMounted(() => {
  setTimeout(() => {
    isFadingOut.value = true
    setTimeout(() => {
      showSplash.value = false
    }, 800)
  }, 3800)
})
</script>

<style scoped>
/* ===== 特效容器 ===== */
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #0a0a0a;
  z-index: 9999;
  overflow: hidden;
  pointer-events: none;
  transition: opacity 0.8s ease;
  padding: 0 2vw;
}

.splash-screen.fade-out {
  opacity: 0;
}

/* ===== 倾斜矩形背景层 ===== */
.bg-slanted {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

/* ===== 所有倾斜矩形的共同样式 ===== */
.slanted-rect {
  position: absolute;
  width: 200%;
  left: -50%;
  transform-origin: center center;
  transform: rotate(45deg);
  animation: slideDiagonal linear infinite;
}

/* ===== 各矩形：更亮、更快 ===== */
.rect-1 {
  top: 5%;
  animation-duration: 5s;
  background: #666666;
  opacity: 0.7;
  height: 2px;
}

.rect-2 {
  top: 18%;
  animation-duration: 7s;
  background: #888888;
  opacity: 0.5;
  height: 3px;
}

.rect-3 {
  top: 32%;
  animation-duration: 4.5s;
  background: #555555;
  opacity: 0.8;
  height: 2px;
}

.rect-4 {
  top: 48%;
  animation-duration: 6s;
  background: #777777;
  opacity: 0.6;
  height: 2.5px;
}

.rect-5 {
  top: 62%;
  animation-duration: 5.5s;
  background: #666666;
  opacity: 0.7;
  height: 2px;
}

.rect-6 {
  top: 78%;
  animation-duration: 8s;
  background: #999999;
  opacity: 0.4;
  height: 3px;
}

/* ===== 关键帧：沿45°方向快速平移 ===== */
@keyframes slideDiagonal {
  0% {
    transform: rotate(45deg) translateX(-150%) translateY(-150%);
  }
  100% {
    transform: rotate(45deg) translateX(150%) translateY(150%);
  }
}

/* ===== 光晕 ===== */
.glow {
  position: absolute;
  width: 50vw;
  height: 50vw;
  background: radial-gradient(circle at center, rgba(30, 120, 255, 0.06), transparent 70%);
  border-radius: 50%;
  filter: blur(80px);
  animation: glowPulse 4s ease-in-out infinite alternate;
  z-index: 1;
}

@keyframes glowPulse {
  0% { opacity: 0.3; transform: scale(0.8); }
  100% { opacity: 0.6; transform: scale(1.2); }
}

/* ===== 内容包装器（最上层） ===== */
.content-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

/* ===== 主标题 ===== */
.main-title {
  display: flex;
  gap: 0.04em;
  font-size: 14vw;
  font-weight: 300;
  letter-spacing: 0.08em;
  color: #ffffff;
  text-shadow: 0 0 60px rgba(30, 120, 255, 0.06);
  margin: 0;
  padding: 0;
}

/* ===== 字母浮现动画 ===== */
.char {
  display: inline-block;
  opacity: 0;
  transform: translateY(40px) scale(0.92);
  filter: blur(10px);
  animation: appear 1.6s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.92);
    filter: blur(10px);
  }
  40% {
    opacity: 0.7;
    transform: translateY(5px) scale(1.02);
    filter: blur(2px);
  }
  70% {
    opacity: 0.9;
    transform: translateY(-2px) scale(0.98);
    filter: blur(0px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0px);
  }
}

/* ===== 副标题 ===== */
.sub-title {
  position: relative;
  z-index: 2;
  font-size: 1.4vw;
  font-weight: 200;
  letter-spacing: 0.6em;
  color: rgba(136, 153, 187, 0.7);
  opacity: 0;
  animation: fadeIn 1.2s ease 2s forwards;
  margin-top: 4rem !important;
  padding: 0 !important;
  text-align: center;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(12px); filter: blur(2px); }
  100% { opacity: 1; transform: translateY(0); filter: blur(0px); }
}

/* ===== 底部文字 ===== */
.footer-text {
  position: absolute;
  bottom: 10%;
  z-index: 2;
  font-size: 0.8vw;
  color: rgba(255, 255, 255, 0.05);
  letter-spacing: 0.5em;
  text-transform: uppercase;
  opacity: 0;
  animation: fadeIn 1s ease 2.8s forwards;
}

/* ===== 移动端适配 ===== */
@media (max-width: 768px) {
  .splash-screen {
    padding: 0 4vw;
  }
  .main-title {
    font-size: 22vw;
  }
  .sub-title {
    font-size: 2.8vw;
    letter-spacing: 0.3em;
    margin-top: 3rem !important;
  }
  .footer-text {
    font-size: 1.8vw;
  }
}
</style>