<template>
  <!-- 
    appear 属性让组件在初次渲染时就执行进入过渡
  -->
  <transition name="fade" appear>
    <div v-if="visible" class="splash-overlay">
      <!-- 图片容器：用于包裹图片和发光效果 -->
      <div class="image-wrapper">
        <img src="/pictures/校徽.png" alt="开场图片" class="splash-image" />
        <!-- 发光层：覆盖在图片上方，实现边缘高亮 -->
        <div class="glow-overlay"></div>
      </div>
      <!-- 小字区域 -->
      <p class="splash-text">{{ text }}</p>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 定义组件的属性
const props = defineProps({
  text: {
    type: String,
    default: '✨ 欢迎阅读 ✨'
  },
  duration: {
    type: Number,
    default: 4000 // 默认4秒后消失，给动画留足时间
  }
})

const visible = ref(true)

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, props.duration)
})
</script>

<style scoped>
/* ===== 1. 全屏遮罩层 ===== */
.splash-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* ===== 2. 图片容器（相对定位，用于放置发光层） ===== */
.image-wrapper {
  position: relative;
  max-width: 80%;
  max-height: 60vh;
  border-radius: 12px;
  /* 应用摇晃动画 */
  animation: wobble 1.6s ease-in-out 2 forwards;
  animation-delay: 0.1s;
  /* 初始透明，由动画控制显现 */
  opacity: 0;
}

/* ===== 3. 图片样式 ===== */
.splash-image {
  display: block;
  width: 100%;
  height: auto;
  max-height: 60vh;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 1;
}

/* ===== 4. 🌟 边缘高亮发光层 ===== */
.glow-overlay {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 16px; /* 比图片略大 */
  z-index: 0;
  pointer-events: none; /* 让点击穿透 */
  
  /* 核心：发光边框 + 光晕动画 */
  background: transparent;
  box-shadow: 
    0 0 20px 4px rgba(255, 215, 0, 0.6),    /* 金色内发光 */
    0 0 40px 12px rgba(255, 200, 50, 0.4),   /* 中间层光晕 */
    0 0 80px 24px rgba(255, 180, 0, 0.2);    /* 外层大光晕 */
  
  /* 光晕呼吸动画：亮度缓慢变化 */
  animation: glowPulse 1.8s ease-in-out infinite alternate;
  
  /* 初始透明，跟随图片一起显现 */
  opacity: 0;
  animation: glowPulse 1.8s ease-in-out infinite alternate, fadeInGlow 0.6s ease-out forwards;
  animation-delay: 0.1s, 0.1s;
}

/* ===== 5. 小字样式（带渐入） ===== */
.splash-text {
  color: #ffffff;
  font-size: 1.2rem;
  letter-spacing: 4px;
  opacity: 0;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  margin-top: 20px;
  animation: fadeInText 1.2s ease-out forwards;
  animation-delay: 0.5s;
}

/* ===== 6. Vue 过渡：控制整个遮罩层的渐入渐出 ===== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

/* ===== 7. 摇晃关键帧动画（包含图片自身渐入） ===== */
@keyframes wobble {
  0% {
    transform: rotate(0deg) scale(0.95) translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: rotate(0deg) scale(0.98) translateY(0);
  }
  20% {
    transform: rotate(5deg) scale(1.02) translateY(-6px);
  }
  35% {
    transform: rotate(-4deg) scale(1.01) translateY(4px);
  }
  50% {
    transform: rotate(3deg) scale(1.03) translateY(-3px);
  }
  65% {
    transform: rotate(-1deg) scale(1.01) translateY(1px);
  }
  80% {
    transform: rotate(0.5deg) scale(1) translateY(0);
    opacity: 1;
  }
  100% {
    transform: rotate(0deg) scale(1) translateY(0);
    opacity: 1;
  }
}

/* ===== 8. 发光呼吸动画（亮度波动） ===== */
@keyframes glowPulse {
  0% {
    box-shadow: 
      0 0 15px 3px rgba(255, 215, 0, 0.4),
      0 0 30px 8px rgba(255, 200, 50, 0.25),
      0 0 60px 16px rgba(255, 180, 0, 0.1);
  }
  50% {
    box-shadow: 
      0 0 25px 6px rgba(255, 215, 0, 0.8),
      0 0 50px 14px rgba(255, 200, 50, 0.5),
      0 0 90px 28px rgba(255, 180, 0, 0.25);
  }
  100% {
    box-shadow: 
      0 0 15px 3px rgba(255, 215, 0, 0.4),
      0 0 30px 8px rgba(255, 200, 50, 0.25),
      0 0 60px 16px rgba(255, 180, 0, 0.1);
  }
}

/* ===== 9. 发光层自身渐入 ===== */
@keyframes fadeInGlow {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* ===== 10. 小字渐入动画 ===== */
@keyframes fadeInText {
  0% {
    opacity: 0;
    transform: translateY(12px);
    letter-spacing: 6px;
  }
  100% {
    opacity: 0.9;
    transform: translateY(0);
    letter-spacing: 4px;
  }
}
</style>