<template>
  <div class="flex flex-col gap-8 animate-fade-in">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-extrabold mb-1 tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Projects
        </h1>
        <p class="text-text-secondary text-sm">Manage, filter, and track all active workspaces.</p>
      </div>
      <button class="bg-primary text-white border border-primary/20 hover:bg-primary-hover hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(139,92,246,0.25)] px-5 py-2.5 rounded-sm text-sm font-semibold tracking-wide transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer outline-none" @click="createNewProject">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        New Project
      </button>
    </div>

    <!-- Filters & Search Bar -->
    <div class="flex flex-wrap gap-5 justify-between items-center">
      <div class="relative w-full max-w-[320px]">
        <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary flex items-center pointer-events-none">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search projects..." 
          class="pl-10 w-full bg-white/3 border border-border-color focus:border-primary/40 rounded-sm px-4 py-2.5 text-sm text-white placeholder-text-muted outline-none transition-all"
        />
      </div>
      
      <div class="flex gap-2.5">
        <button 
          v-for="filter in filters" 
          :key="filter"
          :class="[
            'px-5 py-2.5 rounded-sm text-sm font-semibold tracking-wide border transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer outline-none', 
            activeFilter === filter 
              ? 'bg-primary text-white border-primary/20 hover:bg-primary-hover hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(139,92,246,0.25)]' 
              : 'bg-white/5 text-text-primary border-white/10 hover:bg-white/10 hover:-translate-y-0.5'
          ]"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>
    </div>

    <!-- Project List Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id" 
        class="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-md p-6 flex flex-col justify-between gap-6 min-h-[260px] hover:border-primary/20 hover:scale-[1.01] transition-all duration-300 animate-fade-in"
      >
        <div class="flex justify-between items-center">
          <span 
            :class="[
              'text-[0.7rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider border inline-flex items-center gap-1.5 transition-all', 
              getStatusBadgeClass(project.status)
            ]"
          >
            {{ project.status }}
          </span>
          <span class="text-xs text-text-muted font-medium">Due: {{ formatDateHelper(project.dueDate) }}</span>
        </div>

        <div class="flex flex-col gap-2 grow">
          <h3 class="text-lg font-bold text-white tracking-tight">{{ project.name }}</h3>
          <p class="text-sm text-text-secondary leading-relaxed">{{ project.description }}</p>
        </div>

        <!-- Progress bar -->
        <div class="flex flex-col gap-2">
          <div class="flex justify-between text-xs text-text-secondary font-semibold">
            <span>Progress</span>
            <span class="text-white">{{ project.progress }}%</span>
          </div>
          <div class="h-1.5 bg-white/3 rounded-full overflow-hidden border border-white/2">
            <div class="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(139,92,246,0.3)]" :style="{ width: project.progress + '%' }"></div>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="flex justify-between items-center border-t border-border-color pt-4">
          <div class="flex items-center gap-3">
            <div 
              class="w-8 h-8 rounded-full text-white flex items-center justify-center text-[11px] font-bold border border-white/10" 
              :style="{ backgroundColor: project.owner.color }"
            >
              {{ project.owner.initials }}
            </div>
            <div>
              <p class="text-xs font-semibold text-white m-0">{{ project.owner.name }}</p>
              <p class="text-[10px] text-text-muted m-0">{{ project.owner.role }}</p>
            </div>
          </div>
          <span class="text-xs text-text-secondary bg-white/3 px-2.5 py-1.5 rounded-sm inline-flex items-center gap-1.5 border border-white/3">
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
          return 'bg-success/10 text-success border-success/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]';
        case STATUS_CONSTANTS.PROJECTS.ON_HOLD:
          return 'bg-warning/10 text-warning border-warning/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]';
        default:
          return 'bg-info/10 text-info border-info/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]';
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
