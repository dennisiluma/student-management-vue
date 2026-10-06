<template>
    <div class="container">
        <header class="header">
            <h1>Student Portal</h1>
            <p>Access your class details, connected peers, and academic performance.</p>
        </header>

        <div class="grid">
            <!-- CLASSMATES CARD -->
            <div class="card">
                <div class="iconWrapper">👥</div>
                <h3>My Classmates</h3>
                <p>View students enrolled in your current class and connect with peers.</p>
                <RouterLink to="/student/classmates" class="actionBtn">
                    View Classmates →
                </RouterLink>
            </div>

            <!-- MY REPORT / RESULTS CARD -->
            <div class="card">
                <div class="iconWrapper">📜</div>
                <h3>My Report Cards</h3>
                <p>Check term academic results, subject grades, and overall performance history.</p>
                <RouterLink to="/student/my-results" class="actionBtn">
                    View My Report →
                </RouterLink>
            </div>
        </div>
    </div>
</template>




<style scoped>
.container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2.5rem 1.5rem 4rem;
}

.header {
    margin-bottom: 2.5rem;
}

.header h1 {
    font-size: 2rem;
    font-weight: 800;
    color: #064e3b;
}

.header p {
    color: #64748b;
    font-size: 1rem;
    margin-top: 0.25rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.card {
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px -5px rgba(6, 78, 59, 0.08);
    border-color: #a7f3d0;
}

.iconWrapper {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.card h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
}

.card p {
    font-size: 0.925rem;
    color: #64748b;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    flex-grow: 1;
}

.actionBtn {
    display: inline-block;
    background-color: #059669;
    color: #ffffff;
    font-weight: 600;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    text-decoration: none;
    text-align: center;
    transition: background-color 0.2s ease;
}

.actionBtn:hover {
    background-color: #047857;
}
</style>