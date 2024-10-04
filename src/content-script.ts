import { createApp } from 'vue'
import FloatingBall from './components/FloatingBall.vue'
import { create, NModal, NCard, NInput } from 'naive-ui'
// 创建一个 Vue 应用
const app = createApp(FloatingBall)

// 创建一个挂载点
const mountPoint = document.createElement('div')
mountPoint.id = 'vue-floating-ball'
document.body.appendChild(mountPoint)
mountPoint.style.display = 'none'
const naive = create({
  components: [NModal, NCard, NInput],
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.tabs) {
    const floatingBall = document.getElementById('floating-ball')
    if (floatingBall) {
      floatingBall.click() // 模拟点击悬浮球
    }
    // 将数据存储到window上
    window.postMessage({ type: 'SET_OPEN_TABS', data: request.tabs }, '*')
  }
})

app.use(naive)
// 挂载 Vue 应用
app.mount(mountPoint)
