import type { ReactElement } from 'react';
import { AppointmentsScreen } from './screens/AppointmentsScreen';
import { HomeScreen } from './screens/HomeScreen';

export interface AppRoute {
  /** Hash path, e.g. '/appointments' is served at '#/appointments'. */
  path: string;
  /** Label for the navigation bar and the browser tab. */
  title: string;
  render: () => ReactElement;
}

// Every screen of the portal is registered here. The navigation bar is built from this list.
export const routes: AppRoute[] = [
  { path: '/', title: 'Home', render: () => <HomeScreen /> },
  { path: '/appointments', title: 'Appointments', render: () => <AppointmentsScreen /> },
];
