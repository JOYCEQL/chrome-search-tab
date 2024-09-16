// // 动态注入 CSS
// const style = document.createElement('style')
// style.textContent = `
//     #floating-ball {
//         width: 50px;
//         height: 50px;
//         background-color: rgba(255, 255, 255, 0.8);
//         border-radius: 50%;
//         box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
//         cursor: pointer;
//         z-index: 9999;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         transition: background-color 0.3s;
//         position: fixed; /* 确保悬浮球固定 */
//         left: 100px; /* 初始横坐标 */
//         top: 100px; /* 初始纵坐标 */
//     }

//     #floating-ball:hover {
//         background-color: rgba(255, 255, 255, 1);
//     }
// `
// document.head.appendChild(style)

// // 创建悬浮球的函数
// function createFloatingBall() {
//   // 检查是否已经存在
//   if (document.getElementById('floating-ball')) return

//   const floatingBall = document.createElement('div')
//   floatingBall.id = 'floating-ball'
//   floatingBall.innerHTML = '⚙️' // 可替换为图标或文字
//   document.body.appendChild(floatingBall)

//   // 添加拖动功能
//   let isDragging = false
//   let offsetX, offsetY

//   // 当鼠标按下时开始拖动
//   floatingBall.addEventListener('mousedown', (e) => {
//     isDragging = true
//     offsetX = e.clientX - floatingBall.getBoundingClientRect().left
//     offsetY = e.clientY - floatingBall.getBoundingClientRect().top
//     e.preventDefault() // 防止文本选中
//   })

//   // 当鼠标移动时更新悬浮球的位置
//   document.addEventListener('mousemove', (e) => {
//     if (isDragging) {
//       floatingBall.style.left = e.clientX - offsetX + 'px'
//       floatingBall.style.top = e.clientY - offsetY + 'px'
//     }
//   })

//   // 当鼠标松开时停止拖动
//   document.addEventListener('mouseup', () => {
//     isDragging = false
//   })
// }

// // 在页面加载时创建悬浮球
// window.addEventListener('load', () => {
//   createFloatingBall()
// })

import { createApp } from 'vue'
import FloatingBall from './components/FloatingBall.vue'
import { create, NModal, NCard } from 'naive-ui'
// 创建一个 Vue 应用
const app = createApp(FloatingBall)

// 创建一个挂载点
const mountPoint = document.createElement('div')
mountPoint.id = 'vue-floating-ball'
document.body.appendChild(mountPoint)
const naive = create({
  components: [NModal, NCard],
})

app.use(naive)
// 挂载 Vue 应用
app.mount(mountPoint)
