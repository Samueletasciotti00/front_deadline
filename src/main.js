import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Deadlines from './components/Deadlines.vue'
import MyDeadlines from './components/MyDeadlines.vue'
import { store } from './store'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/deadlines', component: Deadlines },
  { path: '/my-deadlines', component: MyDeadlines },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)

// controllo per mantenere in memoria lo stato di login per pulsante logout anche dopo refresh
store.loggedIn = !!localStorage.getItem('token')

app.mount('#app')
