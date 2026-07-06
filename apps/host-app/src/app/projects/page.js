'use client';

import React from 'react';
import { RemoteVueLoader } from '../../components/RemoteLoader';

export default function ProjectsPage() {
  return (
    <RemoteVueLoader
      url="http://localhost:3002/assets/remoteEntry.js"
      scope="project_app"
      module="./mount"
    />
  );
}
