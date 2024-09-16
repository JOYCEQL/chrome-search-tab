<template>
  <div
    class="floating-ball"
    @mousedown="startDragging"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
    @click="showTab"
  >
    ⚙️
  </div>
  <n-modal :show="showModal">
    <n-card style="width: 600px" title="模态框" size="huge" :bordered="false" role="dialog" aria-modal="true">
      <div><SearchContainer></SearchContainer></div>
    </n-card>
  </n-modal>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SearchContainer from './SearchContainer.vue'
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
