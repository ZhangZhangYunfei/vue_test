import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Schedule from '@/components/schedule/Schedule'
import Students from '@/components/students/Students'
import Subjects from '@/components/subjects/Subjects'

import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {path: 'schedule', component: Schedule},
        {path: 'students', component: Students},
        {path: 'subjects', component: Subjects}
      ]
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
