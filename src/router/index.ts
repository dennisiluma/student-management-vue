import AdminClassroom from '@/views/admin/AdminClassroom.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminManagement from '@/views/admin/AdminManagement.vue'
import AdminRegister from '@/views/admin/AdminRegister.vue'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Profile from '@/views/Profile.vue'
import Register from '@/views/Register.vue'
import Classmate from '@/views/student/Classmate.vue'
import MyReport from '@/views/student/MyReport.vue'
import StudentDashboard from '@/views/student/StudentDashboard.vue'
import CreateReport from '@/views/teacher/CreateReport.vue'
import MyStudents from '@/views/teacher/MyStudents.vue'
import TeacherDashboard from '@/views/teacher/TeacherDashboard.vue'
import Timetable from '@/views/Timetable.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupAuthGuard } from './guards.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },


    {
      path: '/timetable',
      name: 'timetable',
      component: Timetable,
    },

    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },



    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },

    // STUDENTS ROUTES
    {
      path: '/student/dashboard',
      name: 'student-dashboard',
      component: StudentDashboard,
      meta: { requiresAuth: true, requiredRole: 'student' }
    },
    {
      path: '/student/classmates',
      name: 'student-classmates',
      component: Classmate,
      meta: { requiresAuth: true, requiredRole: 'student' }
    },
    {
      path: '/student/my-results',
      name: 'student-my-results',
      component: MyReport,
      meta: { requiresAuth: true, requiredRole: 'student' }
    },

    // TEACHER ROUTES

    {
      path: '/teacher/dashboard',
      name: 'teacher-dashboard',
      component: TeacherDashboard,
      meta: { requiresAuth: true, requiredRole: 'teacher' }
    },
    {
      path: '/teacher/my-students',
      name: 'teacher-my-students',
      component: MyStudents,
      meta: { requiresAuth: true, requiredRole: 'teacher' }
    },
    {
      path: '/teacher/create-report',
      name: 'teacher-create-report',
      component: CreateReport,
      meta: { requiresAuth: true, requiredRole: 'teacher' }
    },


    // ADMIN ROUTES
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, requiredRole: 'admin' }
    },
    {
      path: '/admin/classroom',
      name: 'admin-classroom',
      component: AdminClassroom,
      meta: { requiresAuth: true, requiredRole: 'admin' }
    },
    {
      path: '/admin/management',
      name: 'admin-management',
      component: AdminManagement,
      meta: { requiresAuth: true, requiredRole: 'admin' }
    },
    {
      path: '/admin/register',
      name: 'admin-register',
      component: AdminRegister,
      meta: { requiresAuth: true, requiredRole: 'admin' }
    },


    // WILDCARD FALLBACK
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }


  ],
})

setupAuthGuard(router)
export default router
