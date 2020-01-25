import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('./components/Login')

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})