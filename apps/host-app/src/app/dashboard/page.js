import React from 'react';
import { RemoteReactLoader } from '../../components/RemoteLoader';

export default function DashboardPage() {
  return (
    <RemoteReactLoader
      url="http://localhost:3001/assets/remoteEntry.js"
      scope="dashboard_app"
      module="./DashboardComponent"
    />
  );
}
