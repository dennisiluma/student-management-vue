<template>
    <div class="container">
        <div class="header">
            <span class="badge">Academic Schedule</span>
            <h1 class="title">Master Daily Timetable</h1>
            <p class="subtitle">
                General daily schedule for standard academic sessions.
            </p>
        </div>

        <div class="tableWrapper">
            <table class="table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>08:00 AM - 08:30 AM</td>
                        <td colspan="5" class="breakRow">
                            Assembly & Devotion
                        </td>
                    </tr>
                    <tr>
                        <td>08:30 AM - 10:00 AM</td>
                        <td>Mathematics</td>
                        <td>Physics</td>
                        <td>Chemistry</td>
                        <td>Biology</td>
                        <td>Computer Science</td>
                    </tr>
                    <tr>
                        <td>10:00 AM - 11:30 AM</td>
                        <td>English Literature</td>
                        <td>Mathematics</td>
                        <td>Economics</td>
                        <td>Physics</td>
                        <td>Civic Education</td>
                    </tr>
                    <tr>
                        <td>11:30 AM - 12:15 PM</td>
                        <td colspan="5" class="breakRow">
                            Lunch & Recreation Break
                        </td>
                    </tr>
                    <tr>
                        <td>12:15 PM - 01:45 PM</td>
                        <td>Biology</td>
                        <td>Chemistry</td>
                        <td>Computer Science</td>
                        <td>Mathematics</td>
                        <td>Geography</td>
                    </tr>
                    <tr>
                        <td>01:45 PM - 03:00 PM</td>
                        <td>Sports / Clubs</td>
                        <td>Library & Study</td>
                        <td>Practical Labs</td>
                        <td>Art & Music</td>
                        <td>Staff-Student Check-in</td>
                    </tr>
                </tbody>
            </table>
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
    margin-bottom: 3rem;
}

.badge {
    display: inline-block;
    padding: 0.35rem 1rem;
    background-color: #ecfdf5;
    color: #047857;
    font-size: 0.85rem;
    font-weight: 700;
    border-radius: var(--radius-full);
    margin-bottom: 1rem;
    border: 1px solid #a7f3d0;
}

.title {
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--color-text-main);
    letter-spacing: -0.02em;
    margin-bottom: 0.75rem;
}

.subtitle {
    font-size: 1.1rem;
    color: var(--color-text-muted);
    max-width: 600px;
    margin: 0 auto;
}

/* Grid & Staff Layouts */
.staffGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.75rem;
    margin-top: 2.5rem;
}

.card {
    background-color: var(--color-surface-solid);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: 1.75rem;
    box-shadow: var(--shadow-sm);
    transition: var(--transition-normal);
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: #6ee7b7;
}

.avatar {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #059669, #047857);
    color: #ffffff;
    border-radius: var(--radius-full);
    display: grid;
    place-items: center;
    font-size: 1.25rem;
    font-weight: 800;
    margin-bottom: 1rem;
}

.staffName {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--color-text-main);
}

.staffRole {
    font-size: 0.85rem;
    font-weight: 600;
    color: #059669;
    margin-bottom: 0.75rem;
}

.staffBio {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    line-height: 1.5;
}

/* Timetable Styles */
.tableWrapper {
    overflow-x: auto;
    background-color: var(--color-surface-solid);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
}

.table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.9rem;
}

.table th {
    background-color: #064e3b;
    color: #ffffff;
    padding: 1rem;
    font-weight: 700;
}

.table td {
    padding: 1rem;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text-main);
}

.table tr:last-child td {
    border-bottom: none;
}

.breakRow {
    background-color: #f0fdf4;
    font-weight: 700;
    color: #047857;
    text-align: center;
}
</style>