<template>
  <div class="projects-container">
    <!-- Header -->
    <div class="projects-header">
      <div>
        <h1 class="page-title">Projects</h1>
        <p class="subtitle">Manage, filter, and track all active workspaces.</p>
      </div>
      <button class="tf-btn tf-btn-primary" @click="createNewProject">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        New Project
      </button>
    </div>

    <!-- Filters & Search Bar -->
    <div class="filters-bar">
      <div class="search-wrapper">
        <span class="search-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search projects..." 
          class="tf-input search-input"
        />
      </div>
      
      <div class="filter-buttons">
        <button 
          v-for="filter in filters" 
          :key="filter"
          :class="['tf-btn', activeFilter === filter ? 'tf-btn-primary' : 'tf-btn-secondary']"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>
    </div>

    <!-- Project List Grid -->
    <div class="projects-grid">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id" 
        class="tf-card project-card animate-fade-in"
      >
        <div class="card-header">
          <span 
            :class="['tf-badge', getStatusBadgeClass(project.status)]"
          >
            {{ project.status }}
          </span>
          <span class="due-date">Due: {{ formatDateHelper(project.dueDate) }}</span>
        </div>

        <div class="card-body">
          <h3 class="project-name">{{ project.name }}</h3>
          <p class="project-desc">{{ project.description }}</p>
        </div>

        <!-- Progress bar -->
        <div class="progress-section">
          <div class="progress-label">
            <span>Progress</span>
            <span class="progress-pct">{{ project.progress }}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-bar" :style="{ width: project.progress + '%' }"></div>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="card-footer">
          <div class="owner-info">
            <div 
              class="owner-avatar" 
              :style="{ backgroundColor: project.owner.color }"
            >
              {{ project.owner.initials }}
            </div>
            <div>
              <p class="owner-name">{{ project.owner.name }}</p>
              <p class="owner-role">{{ project.owner.role }}</p>
            </div>
          </div>
          <span class="tasks-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            {{ project.taskCount }} tasks
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { INITIAL_PROJECTS, STATUS_CONSTANTS, formatDate } from 'shared-utils';

export default {
  name: 'ProjectComponent',
  setup() {
    const projects = ref(INITIAL_PROJECTS);
    const searchQuery = ref('');
    const activeFilter = ref('All');
    const filters = ['All', 'Active', 'Completed', 'On Hold'];

    const filteredProjects = computed(() => {
      return projects.value.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.value.toLowerCase());
        
        const matchesFilter = activeFilter.value === 'All' || project.status === activeFilter.value;
        
        return matchesSearch && matchesFilter;
      });
    });

    const getStatusBadgeClass = (status) => {
      switch (status) {
        case STATUS_CONSTANTS.PROJECTS.COMPLETED:
          return 'tf-badge-success';
        case STATUS_CONSTANTS.PROJECTS.ON_HOLD:
          return 'tf-badge-warning';
        default:
          return 'tf-badge-info';
      }
    };

    const formatDateHelper = (dateStr) => {
      return formatDate(dateStr);
    };

    const createNewProject = () => {
      alert('This is a static demo app. Adding projects is disabled.');
    };

    return {
      searchQuery,
      activeFilter,
      filters,
      filteredProjects,
      getStatusBadgeClass,
      formatDateHelper,
      createNewProject
    };
  }
};
</script>

<style scoped>
.projects-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.projects-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #fff 60%, rgba(255,255,255,0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.filters-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: space-between;
  align-items: center;
}

.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 320px;
}

.search-icon {
  position: absolute;
  left: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  pointer-events: none;
}

.search-input {
  padding-left: 2.5rem;
}

.filter-buttons {
  display: flex;
  gap: 0.625rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.project-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  min-height: 260px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.due-date {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
}

.project-name {
  font-size: 1.15rem;
  color: #fff;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.project-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.progress-pct {
  color: #fff;
}

.progress-track {
  height: 6px;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-full);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.02);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
  border-radius: var(--radius-full);
  transition: width var(--transition-normal);
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.3);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
}

.owner-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.owner-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.owner-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.owner-role {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin: 0;
}

.tasks-badge {
  font-size: 0.75rem;
  color: var(--text-secondary);
  background-color: rgba(255, 255, 255, 0.03);
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-sm);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid rgba(255, 255, 255, 0.03);
}
</style>
