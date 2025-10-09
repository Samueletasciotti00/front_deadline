import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import './style.css'
import App from './App.vue'

const routes = [
    { path: '/Home', component: () => import('./components/Home.vue') },
    { path: '/Login', component: () => import('./components/Login.vue') },
    { path: '/Deadlines', component: () => import('./components/Deadlines.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
const app = createApp(App)
app.use(router)
app.mount('#app')
