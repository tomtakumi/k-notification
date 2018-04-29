import VueRouter from 'vue-router'
import Auth from './components/Auth.vue'
import AuthSuccess from './components/AuthSuccess.vue'
import Welcome from './components/Welcome.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Welcome },
    { path: '/auth', component: Auth },
    { path: '/success', component: AuthSuccess }
  ]
})

export default router