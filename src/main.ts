import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import axios, { type AxiosInstance } from 'axios'

const app = createApp(App)

app.use(router)

app.provide<AxiosInstance>('apiBase', axios.create({
    baseURL: 'http://127.0.0.1:8000',
    withCredentials: true,
    headers:{
        Accept:'applications/json'
    }
}));

app.mount('#app')
