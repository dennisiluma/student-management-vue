<script setup lang="ts">

const schoolOfficials: any[] = [
  {
    id: 1,
    name: 'Dr. Elizabeth Vance',
    role: 'Principal & Head of School',
    bio: 'Over 20 years in educational leadership, driving academic excellence and technological innovation.',
    avatar: 'https://i.pravatar.cc/300?img=47',
  },
  {
    id: 2,
    name: 'Marcus Holloway',
    role: 'Vice Principal (Academic Affairs)',
    bio: 'Specializes in curriculum development, STEM initiatives, and student mentorship programs.',
    avatar: 'https://i.pravatar.cc/300?img=12',
  },
  {
    id: 3,
    name: 'Sophia Reynolds',
    role: 'Dean of Student Affairs',
    bio: 'Dedicated to fostering inclusive school culture, student wellbeing, and extracurricular growth.',
    avatar: 'https://i.pravatar.cc/300?img=32',
  },
]

const teachers: any[] = [
  {
    id: 4,
    name: 'David Chen',
    role: 'Senior Mathematics Instructor',
    department: 'Mathematics & Computing',
    bio: 'Passionate about making calculus and problem-solving accessible to all students.',
    avatar: 'https://i.pravatar.cc/300?img=60',
  },
  {
    id: 5,
    name: 'Amanda Brooks',
    role: 'Head of Sciences',
    department: 'Physics & Chemistry',
    bio: 'Encouraging hands-on lab experiments and inquiry-based scientific discovery.',
    avatar: 'https://i.pravatar.cc/300?img=49',
  },
  {
    id: 6,
    name: 'Robert Taylor',
    role: 'English Literature Educator',
    department: 'Humanities & Arts',
    bio: 'Guiding students through classical literature, analytical writing, and creative expression.',
    avatar: 'https://i.pravatar.cc/300?img=15',
  },
  {
    id: 7,
    name: 'Elena Rostova',
    role: 'Computer Science Lead',
    department: 'Information Technology',
    bio: 'Teaching web development, algorithm logic, and modern digital literacy skills.',
    avatar: 'https://i.pravatar.cc/300?img=5',
  },
]
</script>



<template>
  <div class="container">
    <!-- HERO / MISSION BANNER -->
    <section class="heroBanner">
      <span class="badge">About Academia School</span>
      <h1 class="title">Nurturing Minds, Shaping Tomorrow</h1>
      <p class="subtitle">
        At Academia School, we combine academic rigor with modern digital management
        to provide students, teachers, and administrators with an empowering learning environment.
      </p>
    </section>

    <!-- SCHOOL OFFICIALS SECTION -->
    <section class="section">
      <div class="sectionHeader">
        <h2 class="sectionTitle">School Administration & Officials</h2>
        <p class="sectionSubtitle">
          Meet the visionaries leading Academia School toward holistic educational standards.
        </p>
      </div>

      <div class="grid">
        <div v-for="official in schoolOfficials" :key="official.id" class="card">
          <div class="avatarWrapper">
            <img :src="official.avatar" :alt="official.name" class="avatar">
          </div>
          <h3 class="memberName">{{ official.name }}</h3>
          <span class="officialRole">{{ official.role }}</span>
          <p class="memberBio">{{ official.bio }}</p>
        </div>
      </div>
    </section>

    <!-- TEACHERS SECTION -->
    <section class="section">
      <div class="sectionHeader">
        <h2 class="sectionTitle">Faculty & Teaching Staff</h2>
        <p class="sectionSubtitle">
          Our dedicated educators inspiring curiosity and student success every day.
        </p>
      </div>

      <div class="grid">
        <div v-for="teacher in teachers" :key="teacher.id" class="card">
          <div class="avatarWrapper">
            <img :src="teacher.avatar" :alt="teacher.name" class="avatar">
          </div>
          <h3 class="memberName">{{ teacher.name }}</h3>
          <span class="teacherRole">{{ teacher.role }}</span>
          <span v-if="teacher.department" class="departmentTag">
            {{ teacher.department }}
          </span>
          <p class="memberBio">{{ teacher.bio }}</p>
        </div>
      </div>
    </section>
  </div>
</template>



<style scoped>
.container {
  max-width: 1150px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
}

/* HERO SECTION */
.heroBanner {
  text-align: center;
  max-width: 750px;
  margin: 0 auto 4rem;
}

.badge {
  display: inline-block;
  padding: 0.35rem 0.9rem;
  background-color: #ecfdf5;
  color: #047857;
  font-size: 0.775rem;
  font-weight: 800;
  border-radius: 9999px;
  border: 1px solid #a7f3d0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #064e3b;
  letter-spacing: -0.02em;
  line-height: 1.25;
}

.subtitle {
  color: #475569;
  font-size: 1.05rem;
  line-height: 1.6;
  margin-top: 0.75rem;
}

/* SECTION TITLES */
.section {
  margin-bottom: 4.5rem;
}

.sectionHeader {
  text-align: center;
  margin-bottom: 2.5rem;
}

.sectionTitle {
  font-size: 1.85rem;
  font-weight: 800;
  color: #0f172a;
}

.sectionSubtitle {
  font-size: 0.95rem;
  color: #64748b;
  margin-top: 0.35rem;
}

/* CARDS GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

.card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 16px -2px rgba(6, 78, 59, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -6px rgba(6, 78, 59, 0.1);
  border-color: #a7f3d0;
}

.avatarWrapper {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, #10b981, #059669);
  margin-bottom: 1.25rem;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ffffff;
}

.memberName {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.officialRole {
  font-size: 0.85rem;
  font-weight: 700;
  color: #059669;
  margin-bottom: 0.5rem;
}

.teacherRole {
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.35rem;
}

.departmentTag {
  font-size: 0.725rem;
  font-weight: 700;
  background: #f1f5f9;
  color: #334155;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
}

.memberBio {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin-top: 0.25rem;
}
</style>