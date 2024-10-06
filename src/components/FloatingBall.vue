<template>
  <div
    id="floating-ball"
    class="floating-ball"
    @mousedown="startDragging"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
    @click="showTab"
  >
    ⚙️
  </div>
  <!-- unstableShowMask 设置是否显示mask -->
  <NModal :close-on-esc="true" :show="showModal" :mask-closable="true" :show-icon="true" :unstableShowMask="false">
    <n-card
      style="width: 600px; background-color: #242424; border-radius: 20px"
      size="huge"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      <div>
        <div style="color: #fff; display: flex; justify-content: space-between; margin-bottom: 12px">
          <div><span>ESC：</span> <span>关闭</span></div>
          <div><span>CTRL+SHIFT+H：</span><span>打开</span></div>
        </div>
        <SearchContainer @goTab="showModal = false"></SearchContainer>
      </div>
      <div class="close-icon" @click="showModal = false"><X :size="30"></X></div>
    </n-card>
  </NModal>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SearchContainer from './SearchContainer.vue'
import { NModal } from 'naive-ui'
import { X } from 'lucide-vue-next'

const position = ref({ x: 100, y: 100 }) // 初始位置
const showModal = ref(false)
let isDragging = false
let offsetX, offsetY
const startDragging = (e) => {
  isDragging = true
  offsetX = e.clientX - position.value.x
  offsetY = e.clientY - position.value.y
}

const showTab = () => {
  showModal.value = true
  chrome.runtime.sendMessage({ action: 'sendTabs' })
}

const onMouseMove = (e) => {
  if (isDragging) {
    position.value.x = e.clientX - offsetX
    position.value.y = e.clientY - offsetY
  }
}

const stopDragging = () => {
  isDragging = false
}

onMounted(() => {
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', stopDragging)

  // 注册esc事件,关闭modal弹窗
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      showModal.value = false
    }
  })
})
</script>

<style scoped lang="less">
.n-card {
  &::before {
    content: '';
    position: absolute;
    pointer-events: none;
    background-image: linear-gradient(
      0deg,
      rgb(79, 207, 112),
      rgb(250, 214, 72),
      rgb(167, 103, 229),
      rgb(18, 188, 254),
      rgb(68, 206, 123)
    );
    animation-timeline: auto;
    animation-range-start: normal;
    animation-range-end: normal;
    will-change: filter;
    inset: -1px;
    border-radius: 20px;
    padding: 2px;
    mask: linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box exclude,
      linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px);
    animation: 3s linear 0s infinite normal none running borderAnimation;
  }
}
.floating-ball {
  position: fixed;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}
.floating-ball:hover {
  background-color: rgba(255, 255, 255, 1);
}
.close-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  background: #672bc7;
  position: absolute;
  top: -12px;
  right: -12px;
  color: #fff;
}

@keyframes borderAnimation {
  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
