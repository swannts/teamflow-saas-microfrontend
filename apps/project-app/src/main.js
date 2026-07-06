import { createApp } from 'vue';
import ProjectComponent from './ProjectComponent.vue';
import 'shared-ui/src/index.css';

const app = createApp(ProjectComponent);
app.mount('#app');
