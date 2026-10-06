<script setup lang="ts">
import { api } from '@/services/api';
import { computed } from 'vue';


// Reactive auth & role checks
const isAuthenticated = computed(() => api.isAuthenticated())
const isTeacher = computed(() => api.isTeacher())
const isAdmin = computed(() => api.isAdmin())

const dashboardPath = computed(() => {
  if (isAdmin.value) return '/admin/dashboard'
  if (isTeacher.value) return '/admin/teacher'
  return '/student/dashboard'
})

</script>

<template>

  <div class="homeContainer">
    <!-- HERO SECTION -->
    <section class="heroSection">
      <div class="heroContent">
        <h1 class="heroTitle">
          Empowering Education Through Seamless Digital Tools
        </h1>
        <p class="heroSubtitle">
          Simplify classroom administration, streamline term report card generation,
          and track student performance with real-time accuracy.
        </p>

        <div class="heroCtaGroup">
          <template v-if="!isAuthenticated">
            <RouterLink to="/login" class="primaryBtn">
              Get Started →
            </RouterLink>
            <RouterLink to="/about" class="secondaryBtn">
              Learn More
            </RouterLink>
          </template>

          <template v-else>
            <RouterLink :to="dashboardPath" class="primaryBtn">
              Go to Dashboard →
            </RouterLink>
          </template>
        </div>
      </div>
    </section>



    <!-- STATS STRIP -->
    <section class="statsSection">
      <div class="statsGrid">
        <div class="statCard">
          <span class="statNumber">100%</span>
          <span class="statLabel">Automated Grading</span>
        </div>
        <div class="statCard">
          <span class="statNumber">Fast</span>
          <span class="statLabel">Async Performance</span>
        </div>
        <div class="statCard">
          <span class="statNumber">Secure</span>
          <span class="statLabel">Role-Based Control</span>
        </div>
      </div>
    </section>


    <!-- CORE FEATURES SECTION -->
    <section class="featuresSection">
      <div class="sectionHeader">
        <h2 class="sectionTitle">Everything You Need in One Place</h2>
        <p class="sectionSubtitle">
          Built specifically for modern educational institutions, teachers, and students.
        </p>
      </div>

      <div class="featuresGrid">
        <div class="featureCard">
          <div class="featureIcon">🏫</div>
          <h3 class="featureTitle">Classroom Operations</h3>
          <p class="featureDescription">
            Easily manage room allocations, assign lead teachers, and organize student enrollments.
          </p>
        </div>

        <div class="featureCard">
          <div class="featureIcon">📊</div>
          <h3 class="featureTitle">Instant Report Cards</h3>
          <p class="featureDescription">
            Input marks across terms and generate standardized, accurate performance reports effortlessly.
          </p>
        </div>

        <div class="featureCard">
          <div class="featureIcon">🛡️</div>
          <h3 class="featureTitle">Strict Access Controls</h3>
          <p class="featureDescription">
            Granular admin capabilities ensuring secure data privacy for students, staff, and grades.
          </p>
        </div>
      </div>
    </section>


    <!-- AUTH-BASED QUICK PORTAL SECTION -->
    <section v-if="!isAuthenticated" class="portalSection">
      <div class="portalCard">
        <div class="portalText">
          <h2>Ready to Access Your Portal?</h2>
          <p>Sign in with your credentials to view your assigned dashboard and tools.</p>
        </div>
        <div class="portalAction">
          <RouterLink to="/login" class="lightBtn">
            Login In Now
          </RouterLink>
        </div>
      </div>
    </section>


  </div>
</template>


<style scoped>
.homeContainer {
  width: 100%;
  background-color: #f8fafc;
  color: #0f172a;
}

.heroSection {
  background: linear-gradient(135deg, #064e3b 0%, #047857 60%, #10b981 100%);
  color: #ffffff;
  padding: 5rem 1.5rem 6rem;
  text-align: center;
}

.heroContent {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.heroBadge {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ecfdf5;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
}

.heroTitle {
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
}

.heroSubtitle {
  font-size: 1.15rem;
  color: #a7f3d0;
  line-height: 1.6;
  margin-bottom: 2.25rem;
  max-width: 650px;
}

.heroCtaGroup {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.primaryBtn {
  background-color: #ffffff;
  color: #064e3b;
  font-weight: 700;
  padding: 0.85rem 1.75rem;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.primaryBtn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.secondaryBtn {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-weight: 600;
  padding: 0.85rem 1.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.secondaryBtn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* STATS SECTION */
.statsSection {
  max-width: 1000px;
  margin: -3rem auto 4rem;
  padding: 0 1.5rem;
}

.statsGrid {
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  text-align: center;
}

.statCard {
  display: flex;
  flex-direction: column;
}

.statNumber {
  font-size: 2rem;
  font-weight: 800;
  color: #059669;
}

.statLabel {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 600;
  margin-top: 0.25rem;
}

/* FEATURES SECTION */
.featuresSection {
  max-width: 1100px;
  margin: 0 auto 5rem;
  padding: 0 1.5rem;
}

.sectionHeader {
  text-align: center;
  margin-bottom: 3rem;
}

.sectionTitle {
  font-size: 2rem;
  font-weight: 800;
  color: #064e3b;
}

.sectionSubtitle {
  color: #64748b;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.featuresGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.featureCard {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.featureCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px -5px rgba(6, 78, 59, 0.08);
  border-color: #a7f3d0;
}

.featureIcon {
  font-size: 2.25rem;
  margin-bottom: 1rem;
}

.featureTitle {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.featureDescription {
  font-size: 0.925rem;
  color: #64748b;
  line-height: 1.6;
}

/* PORTAL BANNER SECTION */
.portalSection {
  max-width: 1100px;
  margin: 0 auto 5rem;
  padding: 0 1.5rem;
}

.portalCard {
  background: linear-gradient(135deg, #0f172a, #1e293b);
  border-radius: 16px;
  padding: 3rem 2.5rem;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.portalText h2 {
  font-size: 1.75rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.portalText p {
  color: #94a3b8;
  font-size: 0.975rem;
}

.lightBtn {
  background-color: #10b981;
  color: #ffffff;
  font-weight: 700;
  padding: 0.85rem 1.75rem;
  border-radius: 8px;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.2s ease;
}

.lightBtn:hover {
  background-color: #059669;
}

.userBadge {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  border: 1px solid #059669;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.85rem;
}
</style>
