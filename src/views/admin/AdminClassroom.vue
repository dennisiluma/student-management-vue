<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/services/api'


interface Classroom {
    id: number
    name: string
    teacherId?: number | null
}



const classrooms = ref<Classroom[]>([])

const loading = ref(true)
const submitting = ref(false)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)


const isEditing = ref(false)
const editingId = ref<number | null>(null)

const classroomName = ref('')



const fetchClassrooms = async () => {
    try {
        loading.value = true
        const res = await api.getAllClassrooms()
        classrooms.value = res.data || []
    } catch (err: any) {
        message.value = { type: 'error', text: 'Failed to fetch classrooms list.' }
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchClassrooms()
})



const resetForm = () => {
    classroomName.value = ''
    editingId.value = null
    isEditing.value = false
}

const handleEditClick = (cls: Classroom) => {
    isEditing.value = true
    editingId.value = cls.id
    classroomName.value = cls.name
    message.value = null
}

const handleSubmit = async () => {
    if (!classroomName.value.trim()) return

    submitting.value = true
    message.value = null

    try {
        if (isEditing.value && editingId.value) {
            await api.updateClassroom({ id: editingId.value, name: classroomName.value.trim() })
            message.value = { type: 'success', text: 'Classroom updated successfully!' }
        } else {
            await api.createClassroom({ name: classroomName.value.trim() })
            message.value = { type: 'success', text: 'Classroom created successfully!' }
        }
        resetForm()
        await fetchClassrooms()
    } catch (err: any) {
        message.value = {
            type: 'error',
            text: err?.response?.data?.message || 'Failed to save classroom.',
        }
    } finally {
        submitting.value = false
    }
}

</script>


<template>

    <div class="container">
        <div class="header">
            <span class="badge">System Admin</span>
            <h1 class="title">Manage Classrooms</h1>
        </div>



        <!-- CREATE / EDIT FORM -->
        <div class="card">
            <h2 class="subTitle">
                {{ isEditing ? 'Edit Classroom' : 'Create New Classroom' }}
            </h2>

            <div v-if="message" :class="message.type === 'success' ? 'successAlert' : 'errorAlert'">
                {{ message.text }}
            </div>

            <form class="form" @submit.prevent="handleSubmit">
                <div class="formGroup">
                    <label class="label">Classroom Name</label>
                    <input v-model="classroomName" type="text" class="input" placeholder="e.g., Grade 10 A, Maths 101"
                        required>
                </div>

                <div class="buttonGroup">
                    <button type="submit" :disabled="submitting" class="submitBtn">
                        {{ submitting ? 'Saving...' : isEditing ? 'Update Classroom' : 'Create Classroom' }}
                    </button>

                    <button v-if="isEditing" type="button" class="cancelBtn" @click="resetForm">
                        Cancel
                    </button>
                </div>
            </form>
        </div>




        <!-- CLASSROOMS LIST -->
        <div class="card" style="margin-top: 2rem;">
            <h2 class="subTitle">Existing Classrooms</h2>

            <p v-if="loading">Loading classrooms...</p>

            <p v-else-if="classrooms.length === 0" class="stateCard">
                No classrooms created yet.
            </p>

            <div v-else class="classList">
                <div v-for="cls in classrooms" :key="cls.id" class="classItem">
                    <div>
                        <h3 class="className">{{ cls.name }}</h3>
                        <span class="classMeta">
                            ID: {{ cls.id }} | Teacher Assigned?  {{ cls.teacherId ? 'Yes' : 'No' }}
                        </span>
                    </div>
                    <button class="editBtn" @click="handleEditClick(cls)">
                        Edit
                    </button>
                </div>
            </div>
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
    padding: 0.35rem 0.85rem;
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    color: #047857;
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    border-radius: 9999px;
    border: 1px solid #a7f3d0;
    margin-bottom: 0.5rem;
}

.title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #064e3b;
}

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
}

.tabBtn.active {
    color: #047857;
    border-bottom-color: #059669;
}

.card {
    background: #ffffff;
    border: 1px solid rgba(16, 185, 129, 0.18);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 16px -2px rgba(6, 78, 59, 0.06);
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.formGroup {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.label {
    font-size: 0.85rem;
    font-weight: 700;
    color: #334155;
}

.select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1.5px solid #cbd5e1;
    border-radius: 8px;
    font-size: 0.95rem;
    min-height: 44px;
}

.submitBtn {
    width: 100%;
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    color: #ffffff;
    padding: 0.85rem;
    border-radius: 8px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    min-height: 48px;
}

.successAlert {
    padding: 0.85rem;
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: #047857;
    border-radius: 8px;
    font-weight: 600;
    margin-bottom: 1rem;
}

.errorAlert {
    padding: 0.85rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    border-radius: 8px;
    font-weight: 600;
    margin-bottom: 1rem;
}

.subTitle {
    font-size: 1.25rem;
    font-weight: 700;
    color: #064e3b;
    margin-bottom: 1rem;
}

.input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1.5px solid #cbd5e1;
    border-radius: 8px;
    font-size: 0.95rem;
    min-height: 44px;
}

.buttonGroup {
    display: flex;
    gap: 0.75rem;
}

.cancelBtn {
    background: #f1f5f9;
    color: #475569;
    padding: 0.85rem 1.25rem;
    border-radius: 8px;
    font-weight: 700;
    border: 1px solid #cbd5e1;
    cursor: pointer;
}

.classList {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.classItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
}

.className {
    font-size: 1rem;
    font-weight: 700;
    color: #0f172a;
}

.classMeta {
    font-size: 0.8rem;
    color: #64748b;
}

.editBtn {
    background: #ecfdf5;
    color: #047857;
    border: 1px solid #a7f3d0;
    padding: 0.4rem 0.85rem;
    border-radius: 6px;
    font-weight: 700;
    cursor: pointer;
}

@media (min-width: 640px) {
    .container {
        padding: 3rem 1.5rem;
    }

    .title {
        font-size: 2.25rem;
    }

    .submitBtn {
        width: fit-content;
    }
}
</style>