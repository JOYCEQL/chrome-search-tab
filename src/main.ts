import { createApp } from 'vue'
import 'virtual:uno.css'
import './style.css'
import App from './App.vue'
import {
    // create naive ui
    create,
    // component
    NButton,
    NInput,
  } from 'naive-ui'
  
  const naive = create({
    components: [NButton,NInput]
  })
const app=createApp(App)
app.use(naive)
app.mount('#app')
