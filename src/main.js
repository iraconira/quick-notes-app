import { createApp } from 'vue'
import App from '@/App.vue'
import { makeServer } from '@/server'
import './assets/base.scss'

// mock fake server
if (import.meta.env.MODE === 'development') {
    makeServer()
}

createApp(App).mount('#app')
