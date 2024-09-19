<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { X } from 'lucide-vue-next'
const openedTabs = ref<any>([])
const searchValue = ref<string>('')

onMounted(() => {
  getAactivedTab()
})

const getAactivedTab = () => {
  //   chrome.tabs.query({ windowType: 'normal' }, function (tabs: any) {
  //     openedTabs.value = []
  //     openedTabs.value = tabs
  //   })
  window.addEventListener('message', (event) => {
    if (event.data.type === 'SET_OPEN_TABS') {
      openedTabs.value = event.data.data
    }
  })
}

const goTab = (tab: any) => {
  chrome.tabs.update(tab.id, { active: true })
  chrome.windows.update(tab.windowId, { focused: true })
}

const closeTab = (tab: any) => {
  chrome.runtime.sendMessage({ action: 'closeTab', tabId: tab.id })
}

const resultTab = computed(() => {
  console.log(openedTabs.value.filter((tab) => tab.title.toLowerCase().includes(searchValue.value.toLowerCase())))
  return openedTabs.value.filter((tab) => tab.title.toLowerCase().includes(searchValue.value.toLowerCase()))
})
</script>

<template>
  <div class="w-full">
    <NInput
      autofocus
      v-model:value="searchValue"
      style="margin-bottom: 16px; border-radius: 8px"
      class="mb-4 rounded-[8px]"
      placeholder="输入URL或者标题搜索"
      >naive-ui</NInput
    >
    <div class="tab-container h-[500px] overflow-auto">
      <div
        v-for="tab in resultTab"
        :key="tab.id"
        class="list-item bg-[#fef9ef] text-black mb-[12px] rounded-[10px] cursor-pointer overflow-hidden"
        @click="goTab(tab)"
      >
        <div class="line-title flex-1 shrink-0 p-4">{{ tab.title }}</div>
        <div @click.prevent="closeTab(tab)" class="line-closeIcon">
          <X :size="30"></X>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.tab-container {
  height: 400px;
  overflow: auto;
}
.list-item {
  display: flex;
  justify-content: space-between;
  transition: all 100ms;
  background-color: #fef9ef;
  color: black;
  margin-bottom: 12px;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;

  .line-title {
    padding: 16px;
    flex: 1;
  }
  .line-closeIcon {
    background-color: #ffcb77;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    background: #02c39a;
    color: #fff;
    font-weight: 700;
  }
}
</style>
