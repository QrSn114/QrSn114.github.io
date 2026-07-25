<template>
  <div v-if="showSplash" id="splash" class="splash-screen" :class="{ 'fade-out': isFadingOut }">
    <div class="bg-slanted">
      <div class="slanted-rect rect-1"></div>
      <div class="slanted-rect rect-2"></div>
      <div class="slanted-rect rect-3"></div>
      <div class="slanted-rect rect-4"></div>
      <div class="slanted-rect rect-5"></div>
      <div class="slanted-rect rect-6"></div>
    </div>
    <div class="glow"></div>

    <div class="content-wrapper">
      <div class="title-wrapper">
        <h1 class="main-title" id="main-title">
          <span class="char">T</span>
          <span class="char">G</span>
          <span class="char">X</span>
        </h1>
      </div>
      <div class="sub-title">✦ 边界探索 · 无限可能 ✦</div>
    </div>

    <div class="footer-text">// 社团 · 科技 · 创意 //</div>
  </div>

  <slot />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const showSplash = ref(true)
const isFadingOut = ref(false)

// 设置字体大小，让字母总宽度 = 屏幕宽度 × 70%
const setFontSize = () => {
  const title = document.getElementById('main-title')
  if (!title) return
  
  const screenWidth = window.innerWidth
  const targetWidth = screenWidth * 0.7
  
  // 先用一个基础大小
  let fontSize = screenWidth * 0.22
  title.style.fontSize = fontSize + 'px'
  
  // 微调直到接近目标宽度
  let currentWidth = title.scrollWidth
  let attempts = 0
  while (Math.abs(currentWidth - targetWidth) > 2 && attempts < 15) {
    const ratio = targetWidth / currentWidth
    fontSize = fontSize * ratio
    title.style.fontSize = fontSize + 'px'
    currentWidth = title.scrollWidth
    attempts++
  }
}

onMounted(async () => {
  await nextTick()
  await new Promise(resolve => requestAnimationFrame(resolve))
  await new Promise(resolve => requestAnimationFrame(resolve))
  
  setFontSize()
  
  setTimeout(() => {
    isFadingOut.value = true
    setTimeout(() => {
      showSplash.value = false
    }, 800)
  }, 4000)
})

window.addEventListener('resize', () => {
  if (!isFadingOut.value) setFontSize()
})
</script>

<style scoped>
/* ===== 容器 ===== */
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
  padding: 0;
}

.splash-screen.fade-out { opacity: 0; }

/* ===== 背景矩形 ===== */
.bg-slanted {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}
.slanted-rect {
  position: absolute;
  width: 200%;
  left: -50%;
  transform-origin: center center;
  transform: rotate(45deg);
  animation: slideDiagonal linear infinite;
}
.rect-1 { top: 5%; animation-duration: 5s; background: #666; opacity: .7; height: 2px; }
.rect-2 { top: 18%; animation-duration: 7s; background: #888; opacity: .5; height: 3px; }
.rect-3 { top: 32%; animation-duration: 4.5s; background: #555; opacity: .8; height: 2px; }
.rect-4 { top: 48%; animation-duration: 6s; background: #777; opacity: .6; height: 2.5px; }
.rect-5 { top: 62%; animation-duration: 5.5s; background: #666; opacity: .7; height: 2px; }
.rect-6 { top: 78%; animation-duration: 8s; background: #999; opacity: .4; height: 3px; }

@keyframes slideDiagonal {
  0% { transform: rotate(45deg) translateX(-150%) translateY(-150%); }
  100% { transform: rotate(45deg) translateX(150%) translateY(150%); }
}

/* ===== 光晕 ===== */
.glow {
  position: absolute;
  width: 50vw; height: 50vw;
  background: radial-gradient(circle at center, rgba(30, 120, 255, .06), transparent 70%);
  border-radius: 50%;
  filter: blur(80px);
  animation: glowPulse 4s ease-in-out infinite alternate;
  z-index: 1;
}
@keyframes glowPulse {
  0% { opacity: .3; transform: scale(.8); }
  100% { opacity: .6; transform: scale(1.2); }
}

/* ===== 内容 ===== */
.content-wrapper {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.title-wrapper {
  display: flex;
  justify-content: center;
  width: 70%;
}

/* ===== 主标题 ===== */
.main-title {
  display: flex;
  justify-content: center;
  gap: 0.05em;
  font-weight: 400;
  color: #fff;
  text-shadow: 0 0 80px rgba(30, 120, 255, .1);
  margin: 0;
  padding: 0;
  width: 100%;
  white-space: nowrap;
  line-height: 1;
}

/* ===== 每个字母的动画 ===== */
.char {
  display: inline-block;
  opacity: 0;
  transform: translateY(40px) scale(0.92);
  filter: blur(10px);
  animation: appear 1.6s cubic-bezier(.22, .61, .36, 1) 0.3s forwards;
}
.char:nth-child(1) { animation-delay: 0.3s; }
.char:nth-child(2) { animation-delay: 0.48s; }
.char:nth-child(3) { animation-delay: 0.66s; }

@keyframes appear {
  0% { opacity: 0; transform: translateY(40px) scale(.92); filter: blur(10px); }
  40% { opacity: .7; transform: translateY(5px) scale(1.02); filter: blur(2px); }
  70% { opacity: .9; transform: translateY(-2px) scale(.98); filter: blur(0); }
  100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

/* ===== 副标题 ===== */
.sub-title {
  position: relative;
  z-index: 2;
  font-size: 1.4vw;
  font-weight: 200;
  letter-spacing: .6em;
  color: rgba(136, 153, 187, .7);
  margin-top: 3rem;
  opacity: 0;
  animation: fadeIn 1.2s ease 1.0s forwards;
}
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(12px); filter: blur(2px); }
  100% { opacity: 1; transform: translateY(0); filter: blur(0); }
}

/* ===== 底部文字（已调亮） ===== */
.footer-text {
  position: absolute;
  bottom: 8%;
  z-index: 2;
  font-size: .8vw;
  color: #aaaaaa;          /* 亮灰色，与黑色背景明显区分 */
  letter-spacing: .5em;
  text-transform: uppercase;
  opacity: 0;
  animation: fadeIn 1s ease 1.8s forwards;
}

/* ===== 移动端 ===== */
@media (max-width: 768px) {
  .title-wrapper { width: 85%; }
  .sub-title { font-size: 2.8vw; letter-spacing: .3em; margin-top: 2rem; }
  .footer-text { font-size: 1.8vw; }
}
</style>