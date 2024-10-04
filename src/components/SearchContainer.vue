<template>
  <div class="w-full">
    <NInput
      autofocus
      v-model:value="searchValue"
      style="margin-bottom: 16px; border-radius: 8px"
      class="mb-4 rounded-[8px]"
      placeholder="输入URL或者标题搜索"
    ></NInput>
    <div class="tab-container h-[500px] overflow-auto">
      <div v-for="tab in resultTab" :key="tab.id" class="list-item" @click="goTab(tab)">
        <div><img style="width: 20px; height: 20px" :src="tab.favIconUrl" alt="" /></div>
        <div class="line-title flex-1 shrink-0 p-4">{{ tab.title }}</div>
        <div @click.prevent="closeTab(tab)" class="line-closeIcon">
          <X :size="30"></X>
        </div>
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
  chrome.runtime.sendMessage({ action: 'goTab', tabId: tab.id })
}

const closeTab = (tab: any) => {
  chrome.runtime.sendMessage({ action: 'closeTab', tabId: tab.id })
}

const resultTab = computed(() => {
  return openedTabs.value.filter((tab: { title: string }) =>
    tab.title.toLowerCase().includes(searchValue.value.toLowerCase())
  )
})
</script>

<style scoped lang="less">
.tab-container {
  height: 400px;
  overflow: auto;
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 100ms;
  background-color: #fef9ef;
  color: black;
  margin-bottom: 12px;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  &:hover {
    background: #02c39a;
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
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: none;
    background-color: #ea5455;
    color: #fff;
    justify-content: center;
    align-items: center;
  }
}
</style>
