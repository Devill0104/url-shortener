import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './routeTree';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
 const logoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/logout',
    component: () => {
    const dispatch = useDispatch();

    useEffect(() => {
      const logoutUser = async () => {
        try {
          await axiosInstance.post('/api/auth/logout'); // Clear the HTTP-only cookie
          dispatch(logout());                           // Clear Redux auth state
          localStorage.removeItem('token');             // Optional: clear localStorage
        } catch (error) {
          console.error('Logout failed:', error);
        } finally {
          window.location.replace('/');                 // Redirect to home
        }
      };

      logoutUser();
    }, [dispatch]);

    return null;
  },
});

export default logoutRoute