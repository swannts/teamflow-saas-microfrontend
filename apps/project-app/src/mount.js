import { createApp } from 'vue';
import ProjectComponent from './ProjectComponent.vue';
import 'shared-ui/src/index.css';

export function mount(el) {
  const app = createApp(ProjectComponent);
  app.mount(el);
  return () => {
    app.unmount();
  };
}
