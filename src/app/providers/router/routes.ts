import MainPage from "@/pages/MainPage/MainPage.vue"
import EditProjectPage from "@/pages/EditProjectPage/EditProjectPage.vue"
import EditEmployeesPage from "@/pages/EditEmployeesPage/EditEmployeesPage.vue"

export const routes = [
  { path: '/', component: MainPage },
  { path: '/edit/:id', component: EditProjectPage },
  { path: '/edit-employees', component: EditEmployeesPage },
]
