<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { api } from '@/services/api'


const classmates = ref < any[] > ([])
const loading = ref(true)
const error = ref < string | null > (null)


const fetchClassmates = async () => {
    try {
        const res = await api.getMyClassmates()
        classmates.value = res.data || []

    } catch (err: any) {
        error.value = err?.response?.data?.message || 'Failed to load classmates'

    } finally {
        loading.value = false

    }
}

onMounted(() => {
    fetchClassmates()
})


const getInitials = (first?: string, last?: string) => {
    return `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase() || 'ST'
}

</script>

<template>
    <div class="container">
        <div class="header">
            <span class="badge">Classroom Community</span>
            <h1 class="title">My Classmates</h1>
        </div>

        <div v-if="loading" class="emptyState">
            Loading classmates...
        </div>

        <div v-else-if="error" class="emptyState">
            {{ error }}
        </div>

        <div v-else-if="classmates.length === 0" class="emptyState">
            No other students are currently assigned to your classroom.
        </div>

        <div v-else class="grid">
            <div v-for="student in classmates" :key="student.id" class="card">
                <div class="avatar">
                    {{ getInitials(student.firstName, student.lastName) }}
                </div>
                <div class="info">
                    <h3 class="name">
                        {{
                            student.firstName || student.lastName
                                ? `${student.firstName || ''} ${student.lastName || ''}`.trim()
                                : 'Anonymous Student'
                        }}
                    </h3>
                    <span class="email">{{ student.email }}</span>
                    <p v-if="student.bio" class="bio">
                        "{{ student.bio }}"
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>




<style scoped>
.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 1.5rem;
}

.header {
    text-align: center;
    margin-bottom: 2.5rem;
}

.badge {
    display: inline-block;
    padding: 0.35rem 1rem;
    background-color: #ecfdf5;
    color: #047857;
    font-size: 0.85rem;
    font-weight: 700;
    border-radius: var(--radius-full);
    margin-bottom: 0.75rem;
    border: 1px solid #a7f3d0;
}

.title {
    font-size: 2.25rem;
    font-weight: 800;
    color: var(--color-text-main);
    letter-spacing: -0.02em;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
}

.card {
    background-color: var(--color-surface-solid);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
    display: flex;
    align-items: center;
    gap: 1.25rem;
    transition: var(--transition-normal);
}

.card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: #6ee7b7;
}

.avatar {
    width: 52px;
    height: 52px;
    background: linear-gradient(135deg, #059669, #047857);
    color: #ffffff;
    border-radius: var(--radius-full);
    display: grid;
    place-items: center;
    font-size: 1.1rem;
    font-weight: 800;
    flex-shrink: 0;
}

.info {
    display: flex;
    flex-direction: column;
}

.name {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--color-text-main);
}

.email {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    margin-top: 0.15rem;
}

.bio {
    font-size: 0.8rem;
    color: #059669;
    margin-top: 0.4rem;
    font-style: italic;
}

.emptyState {
    text-align: center;
    padding: 4rem 1rem;
    background-color: var(--color-surface-solid);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-lg);
    color: var(--color-text-muted);
}
</style>