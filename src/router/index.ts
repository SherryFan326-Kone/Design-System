import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import LoginPageAMP from '../components/LoginPageAMP.vue'
import LoginPageVerify from '../components/LoginPageVerify.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/amp',
      name: 'login-amp',
      component: LoginPageAMP,
    },
    {
      path: '/verify',
      name: 'login-verify',
      component: LoginPageVerify,
    },
  ],
})

export default router
