
<template>
    <div class="container">
        <div class="header">
            <span class="badge">System Administration</span>
            <h1 class="title">Admin Control Center</h1>
            <p class="subtitle">
                Manage school structure, configure classroom assignments, and handle account privileges.
            </p>
        </div>

        <div class="grid">
            <div class="card">
                <div class="cardIcon">🏫</div>
                <h2 class="cardTitle">Manage Classrooms</h2>
                <p class="cardDescription">
                    Create new academic classrooms or modify existing room names in the system.
                </p>
                <RouterLink to="/admin/classroom" class="cardAction">
                    Classroom Portal →
                </RouterLink>
            </div>

            <div class="card">
                <div class="cardIcon">🔁</div>
                <h2 class="cardTitle">Teacher & Students Enrollment</h2>
                <p class="cardDescription">
                    Assign managing teachers to classrooms and enroll students into target classes.
                </p>
                <RouterLink to="/admin/management" class="cardAction">
                    Assignment Portal →
                </RouterLink>
            </div>

            <div class="card">
                <div class="cardIcon">👤</div>
                <h2 class="cardTitle">Custom Registration </h2>
                <p class="cardDescription">
                    Create new administrative privileges and register staff members.
                </p>
                <RouterLink to="/admin/register" class="cardAction">
                    Register Custom Account →
                </RouterLink>
            </div>
        </div>
    </div>
</template>


<style scoped>
.container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem;
}

.header {
    margin-bottom: 2.5rem;
}

.badge {
    display: inline-block;
    padding: 0.35rem 0.85rem;
    background: #fef3c7;
    color: #b45309;
    font-size: 0.75rem;
    font-weight: 800;
    border-radius: 9999px;
    border: 1px solid #fde68a;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
}

.title {
    font-size: 2rem;
    font-weight: 800;
    color: #064e3b;
}

.subtitle {
    color: #475569;
    font-size: 1rem;
    margin-top: 0.25rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
}

.card {
    background: #ffffff;
    border: 1px solid rgba(16, 185, 129, 0.2);
    border-radius: 12px;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 16px -2px rgba(6, 78, 59, 0.05);
}

.cardIcon {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.cardTitle {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
}

.cardDescription {
    font-size: 0.9rem;
    color: #64748b;
    margin-bottom: 1.5rem;
    flex-grow: 1;
}

.cardAction {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.25rem;
    background: #064e3b;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.9rem;
    border-radius: 8px;
    text-decoration: none;
    transition: background 0.2s ease;
}

.cardAction:hover {
    background: #047857;
}
</style>