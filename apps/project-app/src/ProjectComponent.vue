<template>
  <div class="projects-container">
    <!-- Header -->
    <div class="projects-header">
      <div>
        <h1 class="page-title">Projects</h1>
        <p class="subtitle">Manage, filter, and track all active workspaces.</p>
      </div>
      <button class="tf-btn tf-btn-primary" @click="createNewProject">
        <span>+</span> New Project
      </button>
    </div>

    <!-- Filters & Search Bar -->
    <div class="filters-bar">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
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
        class="tf-card project-card"
      >
        <div class="card-header">
          <span 
            :class="['tf-badge', getStatusBadgeClass(project.status)]"
          >
            {{ project.status }}
          </span>
          <span class="due-date">Due: {{ formatDateHelper(project.dueDate) }}</span>
        </div>

        <h3 class="project-name">{{ project.name }}</h3>
        <p class="project-desc">{{ project.description }}</p>

        <!-- Progress bar -->
        <div class="progress-section">
          <div class="progress-label">
            <span>Progress</span>
            <span>{{ project.progress }}%</span>
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
            📋 {{ project.taskCount }} tasks
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
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #fff;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.filters-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
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
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 0.875rem;
}

.search-input {
  padding-left: 2.25rem;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.due-date {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.project-name {
  font-size: 1.125rem;
  color: #fff;
  font-weight: 600;
}

.project-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
  flex-grow: 1;
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
}

.progress-track {
  height: 6px;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: var(--primary);
  border-radius: var(--radius-full);
  transition: width var(--transition-normal);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 0.75rem;
}

.owner-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.owner-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
}

.owner-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}

.owner-role {
  font-size: 0.65rem;
  color: var(--text-muted);
  margin: 0;
}

.tasks-badge {
  font-size: 0.75rem;
  color: var(--text-muted);
}
</style>
