
//  Declare vue router

import { useUserStore } from '@/stores/user'
import { LayoutAdmin, LayoutDefault } from '@/views/layout'
import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  // GENERALES
  {
    path: '/',
    name: 'login',
    meta: {
      layout: LayoutDefault,
    },
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      layout: LayoutAdmin,
    },
    component: () => import('@/views/Home.vue')
  },
  // DOCTORES
  {
    path: '/doctor/list',
    name: 'doctor.list',
    meta: {
      layout: LayoutAdmin,
    },
    component: () => import('@/views/doctor/List.vue')
  },

  // PACIENTES
  {
    path: '/patient/list',
    name: 'patient.list',
    meta: {
      layout: LayoutAdmin,
    },
    component: () => import('@/views/patient/List.vue')
  },
  {
    path: '/patient/create',
    name: 'patient.create',
    meta: {
      layout: LayoutAdmin,
    },
    component: () => import('@/views/patient/Create.vue')
  },
  {
    path: '/patient/update/:id?',
    name: 'patient.update',
    meta: {
      layout: LayoutAdmin,
    },
    component: () => import('@/views/patient/Update.vue')
  },
  {
    path: '/patient/assign/:id?',
    name: 'patient.assign',
    meta: {
      layout: LayoutAdmin,
    },
    component: () => import('@/views/patient/AssignDevice.vue')
  },

  // DISPOSITIVOS
  {
    path: '/device/list',
    name: 'device.list',
    meta: {
      layout: LayoutAdmin,
    },
    component: () => import('@/views/device/List.vue')
  },

  // MEDICIONES 
  {
    path: '/measure/list/:id?',
    name: 'measure',
    meta: {
      layout: LayoutAdmin,
    },
    component: () => import('@/views/measurement/Measurement.vue')
  },


  // MAIL
  {
    path: '/sendmail',
    name: 'sendMail',
    meta: {
      layout: LayoutAdmin,
    },
    component: () => import('@/views/patient/SendMail.vue')
  },



]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  
  const useUser = useUserStore()

  if (to.name !== 'login' && !useUser.token) {
    next({ name: 'login' })
    return
  }
  
  next()
})

export { router }
