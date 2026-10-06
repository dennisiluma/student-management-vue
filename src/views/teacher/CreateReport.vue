<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { api } from '@/services/api'




interface GradeEntry {
    subject: string
    grade: string
}



const students = ref < any[] > ([])
const selectedStudentId = ref < number | '' > ('')
const term = ref('1st Term')
const academicYear = ref('2026')



const gradeEntries = ref < GradeEntry[] > ([
    { subject: 'Mathematics', grade: 'A' },
    { subject: 'English Language', grade: 'B+' },
])


const availableGrades = ['A+', 'A', 'B+', 'B', 'C', 'D', 'F']

const loading = ref(true)
const submitting = ref(false)
const message = ref < { type: 'success' | 'error'; text: string } | null > (null)



const loadMyStudents = async () => {
    try {
        const res = await api.getMyStudents()
        const list = res.data || []
        students.value = list
        if (list.length > 0) {
            selectedStudentId.value = list[0].id
        }
    } catch (err: any) {
        message.value = { type: 'error', text: 'Failed to load classroom students.' }
    } finally {
        loading.value = false
    }
}



onMounted(() => {
    loadMyStudents()
})

const addGradeRow = () => {
    gradeEntries.value.push({ subject: '', grade: 'A' })
}

const removeGradeRow = (index: number) => {
    gradeEntries.value.splice(index, 1)
}



const handleSubmit = async () => {
    if (!selectedStudentId.value) {
        message.value = { type: 'error', text: 'Please select a student.' }
        return
    }

    const gradesMap: Record<string, string> = {}
    for (const item of gradeEntries.value) {
        if (item.subject.trim()) {
            gradesMap[item.subject.trim()] = item.grade
        }
    }

    submitting.value = true
    message.value = null

    try {
        await api.createAcademicResult({
            studentId: Number(selectedStudentId.value),
            term: term.value,
            academicYear: academicYear.value,
            grades: gradesMap,
        })
        message.value = { type: 'success', text: 'Report card generated successfully!' }
    } catch (err: any) {
        message.value = {
            type: 'error',
            text: err?.response?.data?.message || 'Failed to create academic report.',
        }
    } finally {
        submitting.value = false
    }
}

</script>


<template>
    <div v-if="loading" class="container">
        Loading classroom data...
    </div>

    <div v-else class="container">
        <div class="header">
            <span class="badge">Academic Records</span>
            <h1 class="title">Create Student Report Card</h1>
        </div>

        <div class="card">
            <div v-if="message" :class="message.type === 'success' ? 'successAlert' : 'errorAlert'">
                {{ message.text }}
            </div>

            <form class="form" @submit.prevent="handleSubmit">
                <div class="formGroup">
                    <label class="label">Select Student</label>
                    <select v-model.number="selectedStudentId" class="select" required>
                        <option v-for="s in students" :key="s.id" :value="s.id">
                            {{ s.firstName }} {{ s.lastName }} ({{ s.email }})
                        </option>
                    </select>
                </div>

                <div class="rowGrid">
                    <div class="formGroup">
                        <label class="label">Academic Term</label>
                        <select v-model="term" class="select">
                            <option value="1st Term">1st Term</option>
                            <option value="2nd Term">2nd Term</option>
                            <option value="3rd Term">3rd Term</option>
                        </select>
                    </div>

                    <div class="formGroup">
                        <label class="label">Academic Year</label>
                        <input v-model="academicYear" type="text" class="input" required>
                    </div>
                </div>

                <div class="sectionHeader">
                    <h3 class="subTitle">Subject Grades</h3>
                    <button type="button" class="addBtn" @click="addGradeRow">
                        + Add Subject
                    </button>
                </div>

                <div v-for="(entry, index) in gradeEntries" :key="index" class="gradeRow">
                    <input v-model="entry.subject" type="text" placeholder="Subject (e.g. Chemistry)" class="input"
                        required>
                    <select v-model="entry.grade" class="select">
                        <option v-for="g in availableGrades" :key="g" :value="g">
                            {{ g }}
                        </option>
                    </select>

                    <button v-if="gradeEntries.length > 1" type="button" class="removeBtn"
                        @click="removeGradeRow(index)">
                        ✕
                    </button>
                </div>

                <button type="submit" :disabled="submitting" class="submitBtn">
                    {{ submitting ? 'Publishing...' : 'Publish Report Card' }}
                </button>
            </form>
        </div>
    </div>
</template>



<style scoped>
.container {
    width: 100%;
    max-width: 900px;
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

.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

.studentCard {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #ffffff;
    border: 1px solid rgba(16, 185, 129, 0.18);
    border-radius: 12px;
    padding: 1.25rem;
    box-shadow: 0 4px 16px -2px rgba(6, 78, 59, 0.06);
}

.studentAvatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #047857;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.2rem;
    flex-shrink: 0;
}

.studentName {
    font-size: 1.1rem;
    font-weight: 700;
    color: #0f172a;
}

.studentEmail,
.studentPhone {
    font-size: 0.875rem;
    color: #64748b;
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

.rowGrid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

.label {
    font-size: 0.85rem;
    font-weight: 700;
    color: #334155;
}

.input,
.select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1.5px solid #cbd5e1;
    border-radius: 8px;
    font-size: 0.95rem;
    min-height: 44px;
}

.sectionHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
}

.subTitle {
    font-size: 1.1rem;
    font-weight: 800;
    color: #064e3b;
}

.addBtn {
    background: #ecfdf5;
    color: #047857;
    border: 1px solid #a7f3d0;
    padding: 0.4rem 0.85rem;
    border-radius: 6px;
    font-weight: 700;
    cursor: pointer;
}

.gradeRow {
    display: grid;
    grid-template-columns: 1fr 90px 40px;
    gap: 0.5rem;
    align-items: center;
}

.removeBtn {
    background: #fef2f2;
    color: #dc2626;
    border: 1px solid #fecaca;
    border-radius: 6px;
    height: 44px;
    cursor: pointer;
    font-weight: bold;
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
}

.errorAlert {
    padding: 0.85rem;
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #dc2626;
    border-radius: 8px;
    font-weight: 600;
}

.stateCard {
    text-align: center;
    padding: 3rem;
    background: #ffffff;
    border: 2px dashed #cbd5e1;
    border-radius: 12px;
    color: #64748b;
}

@media (min-width: 640px) {
    .container {
        padding: 3rem 1.5rem;
    }

    .title {
        font-size: 2.25rem;
    }

    .grid {
        grid-template-columns: 1fr 1fr;
    }

    .rowGrid {
        grid-template-columns: 1fr 1fr;
    }
}
</style>