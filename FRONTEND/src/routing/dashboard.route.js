import {createRoute} from '@tanstack/react-router';
import { rootRoute } from './routeTree.js';
import Dashboard from '../pages/DashboardPage.jsx';
import checkAuth from '../utils/helper.js';
export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
  beforeLoad: checkAuth,
});
