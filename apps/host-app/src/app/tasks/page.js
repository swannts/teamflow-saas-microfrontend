import React from 'react';
import { RemoteReactLoader } from '../../components/RemoteLoader';

export default function TasksPage() {
  return (
    <RemoteReactLoader
      url="http://localhost:3003/assets/remoteEntry.js"
      scope="task_app"
      module="./TaskKanbanComponent"
    />
  );
}
