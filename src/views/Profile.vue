<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { api } from '@/services/api'


const activeTab = ref < 'profile' | 'password' > ('profile')

// Profile Form States
const email = ref('')
const role = ref('')
const firstName = ref('')
const lastName = ref('')
const phoneNumber = ref('')
const bio = ref('')


// Password Form States
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')



// System States
const loading = ref(true)
const submitting = ref(false)
const successMsg = ref < string | null > (null)
const errorMsg = ref < string | null > (null)



const fetchMyProfile = async () => {
    try {
        loading.value = true
        const res = await api.getProfile()
        const user = res.data

        email.value = user.email || ''
        role.value = user.role || ''
        firstName.value = user.firstName || ''
        lastName.value = user.lastName || ''
        phoneNumber.value = user.phoneNumber || ''
        bio.value = user.bio || ''
    } catch (err: any) {
        errorMsg.value = err?.response?.data?.message || 'Failed to load user profile'
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchMyProfile()
})

const switchTab = (tab: 'profile' | 'password') => {
    activeTab.value = tab
    successMsg.value = null
    errorMsg.value = null
}

const handleProfileSubmit = async () => {
    successMsg.value = null
    errorMsg.value = null
    submitting.value = true

    try {
        await api.updateProfile({
            firstName: firstName.value,
            lastName: lastName.value,
            phoneNumber: phoneNumber.value,
            bio: bio.value,
        })
        successMsg.value = 'Profile details updated successfully!'
    } catch (err: any) {
        errorMsg.value = err?.response?.data?.message || 'Failed to update profile'
    } finally {
        submitting.value = false
    }
}

const handlePasswordSubmit = async () => {
    successMsg.value = null
    errorMsg.value = null

    if (newPassword.value !== confirmPassword.value) {
        errorMsg.value = 'New passwords do not match.'
        return
    }

    submitting.value = true

    try {
        await api.changePassword({
            currentPassword: currentPassword.value,
            newPassword: newPassword.value,
        })
        successMsg.value = 'Password changed successfully!'
        currentPassword.value = ''
        newPassword.value = ''
        confirmPassword.value = ''
    } catch (err: any) {
        errorMsg.value = err?.response?.data?.message || 'Failed to change password'
    } finally {
        submitting.value = false
    }
}

</script>



<template>
    <div v-if="loading" class="container">
        Loading profile...
    </div>

    <div v-else class="container">
        <div class="header">
            <span class="badge">Account Management</span>
            <h1 class="title">User Profile</h1>
        </div>

        <div class="tabs">
            <button :class="['tabBtn', { active: activeTab === 'profile' }]" @click="switchTab('profile')">
                General Profile
            </button>
            <button :class="['tabBtn', { active: activeTab === 'password' }]" @click="switchTab('password')">
                Security & Password
            </button>
        </div>

        <div class="card">
            <div v-if="successMsg" class="alertSuccess">
                {{ successMsg }}
            </div>
            <div v-if="errorMsg" class="alertError">
                {{ errorMsg }}
            </div>

            <!-- PROFILE FORM -->
            <form v-if="activeTab === 'profile'" class="form" @submit.prevent="handleProfileSubmit">
                <div class="formGrid">
                    <div class="field">
                        <label class="label">Email Address</label>
                        <input type="email" :value="email" disabled class="input readOnlyInput">
                    </div>

                    <div class="field">
                        <label class="label">System Role</label>
                        <input type="text" :value="role" disabled class="input readOnlyInput">
                    </div>

                    <div class="field">
                        <label class="label">First Name</label>
                        <input v-model="firstName" type="text" placeholder="Enter first name" class="input">
                    </div>

                    <div class="field">
                        <label class="label">Last Name</label>
                        <input v-model="lastName" type="text" placeholder="Enter last name" class="input">
                    </div>

                    <div class="field">
                        <label class="label">Phone Number</label>
                        <input v-model="phoneNumber" type="tel" placeholder="+1 (555) 000-0000" class="input">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Bio / Notes</label>
                    <textarea v-model="bio" placeholder="Write a short summary about yourself..." class="textarea" />
                </div>

                <button type="submit" :disabled="submitting" class="submitBtn">
                    {{ submitting ? 'Saving...' : 'Save Profile' }}
                </button>
            </form>

            <!-- PASSWORD FORM -->
            <form v-else class="form" @submit.prevent="handlePasswordSubmit">
                <div class="field">
                    <label class="label">Current Password</label>
                    <input v-model="currentPassword" type="password" required placeholder="••••••••" class="input">
                </div>

                <div class="formGrid">
                    <div class="field">
                        <label class="label">New Password</label>
                        <input v-model="newPassword" type="password" required placeholder="••••••••" class="input">
                    </div>

                    <div class="field">
                        <label class="label">Confirm New Password</label>
                        <input v-model="confirmPassword" type="password" required placeholder="••••••••" class="input">
                    </div>
                </div>

                <button type="submit" :disabled="submitting" class="submitBtn">
                    {{ submitting ? 'Updating...' : 'Update Password' }}
                </button>
            </form>
        </div>
    </div>
</template>



<style scoped>
.container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 1.5rem 1rem;
}

.header {
    margin-bottom: 1.75rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(16, 185, 129, 0.2);
}

.badge {
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 0.85rem;
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    color: #047857;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    border-radius: 9999px;
    margin-bottom: 0.5rem;
    border: 1px solid #a7f3d0;
}

.title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #064e3b;
    letter-spacing: -0.02em;
}

/* Tabs */
.tabs {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #f1f5f9;
}

.tabBtn {
    padding: 0.75rem 1.25rem;
    font-weight: 700;
    font-size: 0.9rem;
    color: #64748b;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;
}

.tabBtn.active {
    color: #047857;
    border-bottom-color: #059669;
}

/* Card & Form */
.card {
    background: #ffffff;
    border: 1px solid rgba(16, 185, 129, 0.18);
    border-radius: 12px;
    padding: 1.5rem 1.25rem;
    box-shadow: 0 4px 16px -2px rgba(6, 78, 59, 0.06);
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.formGrid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.label {
    font-size: 0.85rem;
    font-weight: 700;
    color: #334155;
}

.input,
.textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1.5px solid #cbd5e1;
    border-radius: 8px;
    font-size: 0.95rem;
    color: #0f172a;
    background-color: #f8fafc;
    transition: all 0.2s ease;
    min-height: 44px;
}

.input:focus,
.textarea:focus {
    outline: none;
    border-color: #059669;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15);
}

.textarea {
    resize: vertical;
    min-height: 100px;
}

.readOnlyInput {
    background-color: #e2e8f0;
    color: #64748b;
    cursor: not-allowed;
}

/* Status Notifications */
.alertSuccess {
    padding: 0.85rem 1rem;
    background-color: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: #047857;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.875rem;
}

.alertError {
    padding: 0.85rem 1rem;
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.875rem;
}

.submitBtn {
    width: 100%;
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    color: #ffffff;
    padding: 0.85rem 1.5rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    border: none;
    min-height: 48px;
    transition: all 0.2s ease;
}

.submitBtn:hover:not(:disabled) {
    background: linear-gradient(135deg, #047857 0%, #064e3b 100%);
}

.submitBtn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Tablet & Desktop Layouts */
@media (min-width: 640px) {
    .container {
        padding: 3rem 1.5rem;
    }

    .title {
        font-size: 2.25rem;
    }

    .formGrid {
        grid-template-columns: 1fr 1fr;
    }

    .card {
        padding: 2.25rem;
    }

    .submitBtn {
        width: fit-content;
        align-self: flex-start;
    }
}
</style>