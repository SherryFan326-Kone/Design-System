import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import LoginPageAMP from '../components/LoginPageAMP.vue'
import LoginPageVerify from '../components/LoginPageVerify.vue'
import LoginPageMulti from '../components/LoginPageMulti.vue'
import NavigationPage from '../components/NavigationPage.vue'
import TopNavPage from '../components/TopNavPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'login', component: LoginPage },
    { path: '/amp', name: 'login-amp', component: LoginPageAMP },
    { path: '/verify', name: 'login-verify', component: LoginPageVerify },
    { path: '/multi', name: 'login-multi', component: LoginPageMulti },
    { path: '/nav', name: 'navigation', component: NavigationPage },
    { path: '/nav-top', name: 'navigation-top', component: TopNavPage },
  ],
})

export default router
