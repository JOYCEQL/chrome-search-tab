<template>
  <div class="w-full">
    <NInput
      autofocus
      size="large"
      v-model:value="searchValue"
      style="margin-bottom: 16px; border-radius: 8px; background-color: #191919"
      placeholder="输入URL或者标题搜索"
    ></NInput>
    <div class="tab-container h-[500px] overflow-auto">
      <div
        v-for="tab in resultTab"
        :key="tab.id"
        :class="['list-item', { tabSelected: isActiveTab(tab) }]"
        @click="goTab(tab)"
      >
        <div style="display: flex; align-items: center">
          <img style="width: 20px; height: 20px" :src="tab.favIconUrl" alt="" />
        </div>
        <div class="line-title flex-1 shrink-0 p-4">{{ tab.title }}</div>
        <div @click.stop="closeTab(tab)" class="line-closeIcon">
          <X :size="30"></X>
        </div>
        <div
          v-if="isActiveTab(tab)"
          style="width: 8px; height: 8px; border-radius: 50%; background-color: #06b178"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { X } from 'lucide-vue-next'
const openedTabs = ref<any>([])
const searchValue = ref<string>('')

const emit = defineEmits()

onMounted(() => {
  getAactivedTab()
})

const getAactivedTab = () => {
  window.addEventListener('message', (event) => {
    if (event.data.type === 'SET_OPEN_TABS') {
      openedTabs.value = event.data.data
    }
  })
}

const goTab = (tab: any) => {
  emit('goTab')
  setTimeout(() => {
    chrome.runtime.sendMessage({ action: 'goTab', tabId: tab.id })
  }, 10)
}

const closeTab = (tab: any) => {
  chrome.runtime.sendMessage({ action: 'closeTab', tabId: tab.id })
}

const isActiveTab = (tab: any) => {
  // 获取当前网页url
  const url = window.location.href
  return tab.url === url
}

const resultTab = computed(() => {
  return openedTabs.value.filter((tab: { title: string }) =>
    tab.title.toLowerCase().includes(searchValue.value.toLowerCase())
  )
})
console.log(11)
</script>

<style scoped lang="less">
.tab-container {
  height: 480px;
  overflow: auto;
  background-image: linear-gradient(rgb(27, 27, 27), rgb(18, 18, 18));
  border-radius: 10px;
  padding: 12px;
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 100ms;
  color: #9c9c9c;
  background-color: #242424;
  margin-bottom: 12px;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  &:hover {
    transition: all 100ms;
    background-color: #672bc7;
    color: #fff;
    font-weight: 700;
    .line-closeIcon {
      display: flex;
    }
  }

  .line-title {
    padding: 16px;
    flex: 1;
  }
  .line-closeIcon {
    position: absolute;
    right: 12px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: none;
    background-color: #fff;
    color: #242424;
    justify-content: center;
    align-items: center;
  }
}
.tabSelected {
  // color: #fff;
}

/* 适用于 WebKit 浏览器（如 Chrome 和 Safari） */

:deep(::-webkit-scrollbar) {
  width: 16px; /* 设置滚动条的宽度 */
  height: 16px; /* 设置水平滚动条的高度 */
}

:deep(::-webkit-scrollbar-track) {
  background: #2c2c2c; /* 滚动条轨道的背景颜色 */
  border-radius: 10px; /* 轨道的圆角 */
}

:deep(::-webkit-scrollbar-thumb) {
  background: #888; /* 滚动条的颜色 */
  border-radius: 10px; /* 滚动条的圆角 */
}

* {
  scrollbar-color: #888 #2c2c2c; /* 滚动条颜色和轨道颜色 */
}
:deep(.n-input .n-input__input-el) {
  color: #fff;
}
</style>
