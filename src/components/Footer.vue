<script setup lang="ts">
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear())

</script>


<template>

    <footer class="footer">
        <div class="container">
            <div class="brand">
                <span class="brandName">Academia</span>
                <span class="divider">•</span>
                <span class="tagline">School Management System</span>
            </div>

            <div class="links">
                <RouterLink to="/about" class="link">About</RouterLink>
                <RouterLink to="/" class="link">Home</RouterLink>
                <RouterLink to="/timetable" class="link">Timetable</RouterLink>
            </div>

            <div class="copyright">
                &copy; {{ currentYear }} Academia. All Rights Reserved

            </div>

        </div>

    </footer>

</template>




<style scoped>
.footer {
    background-color: #064e3b;
    color: #a7f3d0;
    border-top: 1px solid #047857;
    padding: 1.5rem 0;
    margin-top: auto;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
}

.brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
}

.brandName {
    font-weight: 700;
    color: #ffffff;
}

.divider {
    color: #10b981;
}

.tagline {
    color: #6ee7b7;
    font-size: 0.875rem;
}

.links {
    display: flex;
    align-items: center;
    gap: 1.25rem;
}

.link {
    color: #a7f3d0;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s ease;
}

.link:hover {
    color: #ffffff;
}

.copyright {
    font-size: 0.85rem;
    color: #6ee7b7;
}

@media (max-width: 640px) {
    .container {
        flex-direction: column;
        text-align: center;
    }

    .brand {
        flex-direction: column;
        gap: 0.25rem;
    }

    .divider {
        display: none;
    }
}
</style>