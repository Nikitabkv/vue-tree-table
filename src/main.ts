import { createApp } from 'vue'
import './style.css'
import './assets/index.css'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'
import MainPage from './pages/MainPage/MainPage.vue'
import EditPage from "./pages/EditPage/EditPage.vue"
import { createPinia } from 'pinia'

const pinia = createPinia()
const routes = [
  { path: '/', component: MainPage },
  { path: '/edit/:id', component: EditPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
