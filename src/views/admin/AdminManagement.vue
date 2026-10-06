<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { api } from '@/services/api'



const activeTab = ref<'teacher' | 'student'>('teacher')

const classrooms = ref<any[]>([])
const teachers = ref<any[]>([])
const students = ref<any[]>([])



// Selection states
const selectedClassroom = ref<number | ''>('')
const selectedTeacher = ref<number | ''>('')
const selectedStudent = ref<number | ''>('')


const loading = ref(true)
const submitting = ref(false)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)


const loadAdminData = async () => {
    try {
        loading.value = true
        const [classRes, teacherRes, studentRes] = await Promise.all([
            api.getAllClassrooms(),
            api.getAllUsersByRole('teacher'),
            api.getAllUsersByRole('student'),
        ])

        const classData = classRes.data || []
        const teacherData = teacherRes.data || []
        const studentData = studentRes.data || []

        classrooms.value = classData
        teachers.value = teacherData
        students.value = studentData

        if (classData.length > 0) selectedClassroom.value = classData[0].id
        if (teacherData.length > 0) selectedTeacher.value = teacherData[0].id
        if (studentData.length > 0) selectedStudent.value = studentData[0].id
    } catch (err: any) {
        message.value = { type: 'error', text: 'Failed to load administrative resources.' }
    } finally {
        loading.value = false
    }
}


onMounted(() => {
    loadAdminData()
})


const handleAssignTeacher = async () => {
    if (!selectedClassroom.value || !selectedTeacher.value) return

    submitting.value = true
    message.value = null

    try {
        await api.assignTeacherToClassroom({
            classroomId: Number(selectedClassroom.value),
            teacherId: Number(selectedTeacher.value),
        })
        message.value = {
            type: 'success',
            text: 'Teacher assigned to classroom successfully. Unassigned from prior classrooms.',
        }
    } catch (err: any) {
        message.value = {
            type: 'error',
            text: err?.response?.data?.message || 'Failed to assign teacher.',
        }
    } finally {
        submitting.value = false
    }
}


const handleAssignStudent = async () => {
    if (!selectedClassroom.value || !selectedStudent.value) return

    submitting.value = true
    message.value = null

    try {
        await api.assignStudentToClassroom({
            classroomId: Number(selectedClassroom.value),
            userId: Number(selectedStudent.value),
        })
        message.value = { type: 'success', text: 'Student enrolled into classroom successfully.' }
    } catch (err: any) {
        message.value = {
            type: 'error',
            text: err?.response?.data?.message || 'Failed to assign student.',
        }
    } finally {
        submitting.value = false
    }
}



const switchTab = (tab: 'teacher' | 'student') => {
    activeTab.value = tab
    message.value = null
}

</script>






<template>
    <div v-if="loading" class="container">
        Loading administration tools...
    </div>

    <div v-else class="container">
        <div class="header">
            <span class="badge">System Admin</span>
            <h1 class="title">Teacher Assignment & Student Enrollment</h1>
        </div>

        <div class="tabs">
            <button :class="['tabBtn', { active: activeTab === 'teacher' }]" @click="switchTab('teacher')">
                Assign Teacher
            </button>
            <button :class="['tabBtn', { active: activeTab === 'student' }]" @click="switchTab('student')">
                Assign Student
            </button>
        </div>

        <div class="card">
            <div v-if="message" :class="message.type === 'success' ? 'successAlert' : 'errorAlert'">
                {{ message.text }}
            </div>

            <!-- TEACHER FORM -->
            <form v-if="activeTab === 'teacher'" class="form" @submit.prevent="handleAssignTeacher">
                <div class="formGroup">
                    <label class="label">Select Classroom</label>
                    <select v-model.number="selectedClassroom" class="select" required>
                        <option v-for="c in classrooms" :key="c.id" :value="c.id">
                            {{ c.name }}
                        </option>
                    </select>
                </div>

                <div class="formGroup">
                    <label class="label">Select Teacher</label>
                    <select v-model.number="selectedTeacher" class="select" required>
                        <option v-for="t in teachers" :key="t.id" :value="t.id">
                            {{ t.firstName }} {{ t.lastName }} ({{ t.email }})
                        </option>
                    </select>
                </div>

                <button type="submit" :disabled="submitting" class="submitBtn">
                    {{ submitting ? 'Assigning...' : 'Assign Managing Teacher' }}
                </button>
            </form>

            <!-- STUDENT FORM -->
            <form v-else class="form" @submit.prevent="handleAssignStudent">
                <div class="formGroup">
                    <label class="label">Select Target Classroom</label>
                    <select v-model.number="selectedClassroom" class="select" required>
                        <option v-for="c in classrooms" :key="c.id" :value="c.id">
                            {{ c.name }}
                        </option>
                    </select>
                </div>

                <div class="formGroup">
                    <label class="label">Select Student</label>
                    <select v-model.number="selectedStudent" class="select" required>
                        <option v-for="s in students" :key="s.id" :value="s.id">
                            {{ s.firstName }} {{ s.lastName }} ({{ s.email }})
                        </option>
                    </select>
                </div>

                <button type="submit" :disabled="submitting" class="submitBtn">
                    {{ submitting ? 'Enrolling...' : 'Enroll Student to Class' }}
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