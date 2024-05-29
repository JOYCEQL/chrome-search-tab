<script setup lang="ts">
import { onMounted, ref } from 'vue'
const openedTabs = ref<any>([])
onMounted(() => {
  chrome.tabs.query({ windowType: 'normal' }, function (tabs: any) {
    console.log(tabs, 'tabs')
    openedTabs.value = tabs
  })
})

const goTab = (tab:any) =>{
  chrome.tabs.update(tab.id, {active: true})
  chrome.windows.update(tab.windowId, {focused: true})
}
</script>

<template>
  <div>
    <input autofocus />
    <div v-for="tab in openedTabs" :key="tab.id">
      {{ tab.title }}
      <Button @click="goTab(tab)">跳转</Button>
    </div>
  </div>
</template>

<style scoped>

</style>
