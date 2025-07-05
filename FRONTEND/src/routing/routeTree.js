import {createRootRoute} from '@tanstack/react-router';
import {dashboardRoute} from './dashboard.route.js'
import { authRoute } from '../routing/auth.route.js';
import {homePageRoute} from './homepage.route.js';
import signupRoute from '../routing/signup.route.js'
import RootLayout from '../RootLayout';
import logoutRoute from './logout.route.js';

export const rootRoute = createRootRoute({
  component: RootLayout,
})
export const routeTree = rootRoute.addChildren([
    homePageRoute,
    authRoute,
    dashboardRoute,
    signupRoute,
    logoutRoute,
]);