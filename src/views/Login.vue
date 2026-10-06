<script setup lang="ts">
import { api } from '@/services/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const loading = ref(false)
const error = ref<string | null>(null)


const handleSubmit = async () => {
    loading.value = true
    error.value = null

    try {
        await api.login({
            email: email.value,
            password: password.value,
        })

        // 📢 Notify the rest of the app that auth state changed
        window.dispatchEvent(new ErrorEvent('auth-change'))

        router.push('/')

    } catch (err: any) {
        error.value = err?.response?.data?.message || 'Login failed'

    } finally {

        loading.value = false
    }
}


</script>


<template>

    <div class="container">
        <div class="card">
            <div class="header">
                <h2 class="title">Welcome Back</h2>
                <p class="subtitle">Sign in to access your dashboard</p>
            </div>

            <div v-if="error" class="errorAlert">
                {{ error }}
            </div>

            <form class="form" @submit.prevent="handleSubmit">
                <div class="field">
                    <label class="label">Email Address</label>
                    <input v-model="email" type="email" class="input" placeholder="user@school.edu" required>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <input v-model="password" type="password" class="input" placeholder="••••••••" required>
                </div>

                <button type="submit" :disabled="loading" class="submitBtn">
                    {{ loading ? 'Authenticating...' : 'Sign In' }}
                </button>
            </form>

            <p class="footer">
                Don't have an account?
                <RouterLink to="/register" class="link">
                    Register
                </RouterLink>
            </p>
        </div>
    </div>
</template>




<style scoped>
.container {
    min-height: calc(100vh - 160px);
    display: grid;
    place-items: center;
    padding: 2rem 1.5rem;
}

.card {
    background-color: var(--color-surface-solid);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 2.5rem;
    width: 100%;
    max-width: 420px;
    box-shadow: var(--shadow-md);
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.title {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--color-text-main);
    letter-spacing: -0.02em;
}

.subtitle {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    margin-top: 0.25rem;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--color-text-main);
}

.input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-size: 0.95rem;
    background-color: var(--color-bg);
    transition: var(--transition-fast);
}

.input:focus {
    outline: none;
    border-color: var(--color-primary);
    background-color: var(--color-surface-solid);
    box-shadow: 0 0 0 3px var(--color-primary-light);
}

.submitBtn {
    background-color: var(--button-bg-color);
    color: var(--color-text-inverse);
    padding: 0.8rem;
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.95rem;
    margin-top: 0.5rem;
    transition: var(--transition-fast);
}

.submitBtn:hover {
    background-color: var(--color-primary-hover);
}

.submitBtn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.errorAlert {
    background-color: var(--color-danger-bg);
    color: var(--color-danger);
    padding: 0.75rem;
    border-radius: var(--radius-sm);
    font-size: 0.85rem;
    font-weight: 500;
    text-align: center;
}

.footer {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.875rem;
    color: var(--color-text-muted);
}

.link {
    color: var(--button-bg-color);
    font-weight: 600;
}

.link:hover {
    text-decoration: underline;
}
</style>