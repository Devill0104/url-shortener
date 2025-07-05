import {createRoute} from '@tanstack/react-router';
import { rootRoute } from './routeTree';
import SignupPage from '../pages/SignupPage.jsx';
const signupRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/signup',
    component: SignupPage,
});
export default signupRoute