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
  <NModal :show="showModal" :mask-closable="true" :show-icon="true" :unstableShowMask="false">
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
    </n-card>
  </NModal>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SearchContainer from './SearchContainer.vue'
import { NModal } from 'naive-ui'
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

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', stopDragging)
})
</script>

<style scoped>
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
</style>
