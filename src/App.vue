<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { CircleX } from 'lucide-vue-next'
const openedTabs = ref<any>([])
const searchValue = ref<string>('')

onMounted(() => {
  getAactivedTab()
})

const getAactivedTab = () => {
  chrome.tabs.query({ windowType: 'normal' }, function (tabs: any) {
    openedTabs.value = []
    openedTabs.value = tabs
  })
}

const goTab = (tab: any) => {
  chrome.tabs.update(tab.id, { active: true })
  chrome.windows.update(tab.windowId, { focused: true })
}

const resultTab = computed(() => {
  console.log(
    openedTabs.value.filter((tab) => tab.title.toLowerCase().includes(searchValue.value.toLowerCase())),
    11
  )
  return openedTabs.value.filter((tab) => tab.title.toLowerCase().includes(searchValue.value.toLowerCase()))
})
</script>

<template>
  <div class="w-full">
    <NInput autofocus v-model:value="searchValue" class="mb-4 rounded-[8px]" placeholder="输入URL或者标题搜索"
      >naive-ui</NInput
    >
    <div
      v-for="tab in resultTab"
      :key="tab.id"
      class="list-item bg-[#000212] p-4 mb-[12px] rounded-[10px] cursor-pointer"
      @click="goTab(tab)"
    >
      {{ tab.title }}
      <CircleX></CircleX>
    </div>
  </div>
</template>

<style scoped lang="less">
.list-item {
  display: flex;
  justify-content: space-between;
  border: 1px rgb(57, 55, 54) solid;
  &:hover {
    color: green;
    font-weight: 700;
    border-color: green;
  }
}
</style>
