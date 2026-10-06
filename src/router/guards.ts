import { api } from "@/services/api";
import type { Router } from "vue-router";


export function setupAuthGuard(router: Router) {

    router.beforeEach((to, _from, next) => {

        const isAuth = api.isAuthenticated()
        const userRole = api.getUserRole()?.toLowerCase()

        // 1. Redirect unauthenticated users
        if (to.meta.requiresAuth && !isAuth) {
            return next({ path: '/login', replace: true })
        }

        // 2. Redirect users if their single role doesn't match the route's required role
        const requiredRole = to.meta.requiredRole as string | undefined
        if (requiredRole) {
            if (!userRole || userRole !== requiredRole.toLowerCase()) {
                return next({ path: '/login', replace: true })
            }
        }

        next()  //Allows access and renders the target page.
    })


}