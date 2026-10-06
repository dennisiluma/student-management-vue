<script setup lang="ts">
import { api } from '@/services/api';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';



const router = useRouter()

const isAuthenticated = ref(false)
const isTeacher = ref(false)
const isStudent = ref(false)
const isAdmin = ref(false)
const role = ref < string | null > (null)


const syncAuth = () => {
    isAuthenticated.value = api.isAuthenticated()
    isTeacher.value = api.isTeacher()
    isStudent.value = api.isStudent()
    isAdmin.value = api.isAdmin()
    role.value = api.getUserRole()
}


onMounted(() => {
    syncAuth()
    window.addEventListener('auth-change', syncAuth)
})

onUnmounted(() => {
    window.removeEventListener('auth-change', syncAuth)
})

const handleLogout = () => {
    api.logout()
    syncAuth()
    window.dispatchEvent(new Event('auth-change'))
    router.push('/')
}

</script>



<template>

    <header class="header">
        <div class="container">

            <RouterLink to="/" class="brand">
                <div class="brandIcon">U</div>
                <span>Academia School</span>
            </RouterLink>



            <nav class="navLinks">
                <RouterLink to="/" class="navItem" active-class="activeNavItem">
                    Home
                </RouterLink>

                <RouterLink to="/about" class="navItem" active-class="activeNavItem">
                    About Us
                </RouterLink>

                <RouterLink to="/timetable" class="navItem" active-class="activeNavItem">
                    Timetable
                </RouterLink>

                <!-- ROLE STUDENT LINKS -->
                <RouterLink v-if="isStudent" to="/student/dashboard" class="navItem" active-class="activeNavItem">
                    Student Dashboard
                </RouterLink>

                <!-- ROLE TEACHER LINKS -->
                <RouterLink v-if="isTeacher" to="/teacher/dashboard" class="navItem" active-class="activeNavItem">
                    Teacher Dashboard
                </RouterLink>

                <!-- ROLE ADMIN LINKS -->
                <RouterLink v-if="isAdmin" to="/admin/dashboard" class="navItem" active-class="activeNavItem">
                    Admin Dashboard
                </RouterLink>

                <!-- PROFILE LINK FOR ALL AUTHENTICATED USERS -->
                <RouterLink v-if="isAuthenticated" to="/profile" class="navItem" active-class="activeNavItem">
                    Profile
                </RouterLink>
            </nav>



            <div class="authSection">
                <template v-if="isAuthenticated">
                    <span class="roleBadge">{{ role?.toUpperCase() }}</span>
                    <button class="logoutBtn" @click="handleLogout">
                        <svg class="logoutIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Log Out
                    </button>
                </template>

                <RouterLink v-else to="/login" class="loginBtn">
                    Sign In
                </RouterLink>
            </div>

        </div>

    </header>
</template>




<style scoped>
.header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: #064e3b;
    border-bottom: 1px solid #047857;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.25rem;
    font-weight: 800;
    color: #ffffff;
    text-decoration: none;
}

.brandIcon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #10b981, #059669);
    color: #ffffff;
    border-radius: 8px;
    display: grid;
    place-items: center;
    font-weight: 800;
    font-size: 1.1rem;
}

.navLinks {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(4, 120, 87, 0.3);
    padding: 0.3rem;
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.navItem {
    padding: 0.45rem 1.1rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #a7f3d0;
    border-radius: 9999px;
    text-decoration: none;
    transition: all 0.2s ease;
}

.navItem:hover {
    color: #ffffff;
}

.activeNavItem {
    background-color: #10b981;
    color: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.authSection {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.roleBadge {
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.25rem 0.65rem;
    border-radius: 9999px;
    text-transform: uppercase;
    background-color: rgba(255, 255, 255, 0.15);
    color: #ecfdf5;
}

.loginBtn {
    padding: 0.5rem 1.1rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    text-decoration: none;
    transition: background-color 0.2s ease;
}

.loginBtn:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.logoutBtn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.9rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: #fca5a5;
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.logoutBtn:hover {
    background: #ef4444;
    color: #ffffff;
    border-color: #ef4444;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

.logoutIcon {
    width: 16px;
    height: 16px;
}
</style>